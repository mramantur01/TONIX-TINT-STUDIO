// WhatsApp AI assistant (WhatsApp Business Cloud API webhook + Claude).
// GET  — Meta's webhook verification (hub.challenge).
// POST — incoming messages: answer with Claude using the studio's real prices, promotions,
//        masters and free booking slots; hand over to a person when the client asks.
// Turned off (answers 200 and does nothing) until every WHATSAPP_* key and ANTHROPIC_API_KEY is set.
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import Anthropic from '@anthropic-ai/sdk';
import { getJson, notifyTelegram, redis, storageConfigured } from './_lib.js';

const catalog = createRequire(import.meta.url)('../src/data/catalog.json');

const env = (name) => process.env[name] || '';
const MODEL = env('WHATSAPP_BOT_MODEL') || 'claude-opus-5-5';
const GRAPH = `https://graph.facebook.com/${env('WHATSAPP_API_VERSION') || 'v23.0'}`;
const SITE_URL = (env('SITE_URL') || 'https://tonix-tint-studio.vercel.app').replace(/\/$/, '');

const HISTORY_TURNS = 16; // messages kept per client (user + assistant)
const HISTORY_TTL = 3 * 24 * 60 * 60; // forget a conversation after 3 quiet days
const MAX_PER_HOUR = 20; // replies per client per hour (spam / cost guard)
const MAX_TOOL_ROUNDS = 4;

const configured = () =>
  Boolean(env('WHATSAPP_TOKEN') && env('WHATSAPP_PHONE_NUMBER_ID') && env('WHATSAPP_APP_SECRET') && env('ANTHROPIC_API_KEY')) &&
  storageConfigured();

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// ---- Meta webhook verification ------------------------------------------------------------

export function GET(request) {
  const url = new URL(request.url);
  const ok =
    url.searchParams.get('hub.mode') === 'subscribe' &&
    env('WHATSAPP_VERIFY_TOKEN') &&
    url.searchParams.get('hub.verify_token') === env('WHATSAPP_VERIFY_TOKEN');
  return ok ? new Response(url.searchParams.get('hub.challenge') || '', { status: 200 }) : new Response('forbidden', { status: 403 });
}

function signatureValid(raw, header) {
  const secret = env('WHATSAPP_APP_SECRET');
  if (!secret || !header?.startsWith('sha256=')) return false;
  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  const got = header.slice(7);
  return got.length === expected.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

// ---- Studio knowledge for the system prompt ----------------------------------------------

const CLASS_NAMES = { sedan: 'седан/хэтчбек', crossover: 'кроссовер', suv: 'внедорожник/пикап', premium: 'премиум/представительский' };

async function studioData() {
  const values = await redis(['MGET', 'content:services', 'content:promotions', 'content:masters', 'content:settings']);
  const parse = (raw, fallback) => {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  return {
    services: parse(values[0], catalog.services),
    promotions: parse(values[1], catalog.promotions),
    masters: parse(values[2], []),
    settings: parse(values[3], {}),
  };
}

function systemPrompt({ services, promotions, masters, settings }) {
  const lines = (arr) => arr.filter(Boolean).join('\n');
  const serviceText = services
    .map((s) =>
      lines([
        `- ${s.titleKey} (id ${s.id}, категория ${s.category}): седан ${s.priceSedan} KGS, кроссовер ${s.priceCrossover} KGS, внедорожник ${s.priceSuv} KGS, премиум ${s.pricePremium} KGS; около ${s.durationHours} ч; гарантия ${s.warrantyYears} лет.`,
        `  ${s.descriptionKey}`,
        s.filmBrands?.length ? `  Плёнки: ${s.filmBrands.join(', ')}.` : '',
      ])
    )
    .join('\n');
  const promoText = promotions.length
    ? promotions
        .map((p) => `- ${p.title}: скидка ${p.discountPercent}%${p.serviceCategory ? ` на категорию ${p.serviceCategory}` : ''}, промокод ${p.code}, действует до ${p.validUntil}. ${p.description}`)
        .join('\n')
    : '- сейчас акций нет';
  const masterText = masters.length
    ? masters.map((m) => `- ${m.name} (id ${m.id}): ${m.role}, стаж ${m.experienceYears} лет, ${m.completedCars}+ авто, ${m.specialty}`).join('\n')
    : '- список мастеров уточняйте у менеджера';
  const faqText = catalog.faqs.map((f) => `- ${f.question} — ${f.answer}`).join('\n');

  return lines([
    `Ты — вежливый помощник студии ${settings.studioName || 'TONIX TINT STUDIO'} в WhatsApp: тонировка, бронеплёнка PPF, винил, полировка и керамика в Бишкеке.`,
    'Отвечай на языке клиента (русский, кыргызский или английский), коротко и по делу: обычно 1–4 предложения, без Markdown-заголовков и таблиц — это чат WhatsApp. Можно *жирный* текст WhatsApp-разметкой.',
    '',
    'Правила:',
    '- Цены, скидки, сроки и гарантии называй только из данных ниже. Цена зависит от класса авто: если класс неизвестен, спроси марку и модель или назови диапазон «от … до …».',
    '- Промокод применяется к услугам своей категории; суммы скидок считай точно.',
    `- Записаться можно только на сайте: ${SITE_URL}/#booking (вход по телефону, 5 шагов). Сам ты записи не создаёшь и время не бронируешь — так и говори.`,
    '- Чтобы сказать, какое время свободно, вызови check_free_slots с датой. Не угадывай занятость.',
    '- Если клиент хочет поговорить с человеком, жалуется, спрашивает то, чего нет в данных, или вопрос про уже начатую работу — вызови call_manager и дай контакты менеджера.',
    '- Не обещай того, чего нет в данных; не принимай оплату и не проси реквизиты карт.',
    '',
    `Контакты: адрес ${settings.address || '—'}; режим ${settings.workHours || '—'}; телефон ${settings.phone || '—'}; WhatsApp менеджера ${settings.whatsapp || settings.phone || '—'}; контактное лицо ${settings.contactPerson || '—'}; Instagram ${settings.instagram || '—'}.`,
    '',
    'Классы авто: ' + Object.values(CLASS_NAMES).join(', ') + '.',
    '',
    'Услуги и цены:',
    serviceText,
    '',
    'Акции:',
    promoText,
    '',
    'Мастера:',
    masterText,
    '',
    'Частые вопросы:',
    faqText,
  ]);
}

// ---- Tools --------------------------------------------------------------------------------

const TOOLS = [
  {
    name: 'check_free_slots',
    description:
      'Свободное время для записи на указанную дату по каждому мастеру. Используй, когда клиент спрашивает, когда можно приехать или свободно ли время.',
    strict: true,
    input_schema: {
      type: 'object',
      properties: { date: { type: 'string', description: 'Дата в формате YYYY-MM-DD (по Бишкеку)' } },
      required: ['date'],
      additionalProperties: false,
    },
  },
  {
    name: 'call_manager',
    description:
      'Передать разговор менеджеру студии: клиент просит человека, жалуется или вопрос не покрыт данными. Менеджер получит уведомление с номером клиента.',
    strict: true,
    input_schema: {
      type: 'object',
      properties: { reason: { type: 'string', description: 'Коротко: что нужно клиенту' } },
      required: ['reason'],
      additionalProperties: false,
    },
  },
];

const bishkekNow = () => new Date(Date.now() + 6 * 60 * 60 * 1000); // UTC+6, read with getUTC*

async function checkFreeSlots(date, masters) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: 'Дата должна быть в формате YYYY-MM-DD' };
  const now = bishkekNow();
  const today = now.toISOString().slice(0, 10);
  if (date < today) return { error: 'Эта дата уже прошла' };
  const bookings = await getJson('bookings', []);
  const taken = bookings.filter((b) => b.bookingDate === date && b.status !== 'cancelled');
  const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const isPast = (t) => {
    const [h, m] = t.split(':').map(Number);
    return date === today && h * 60 + m <= nowMinutes;
  };
  return {
    date,
    masters: masters.map((m) => ({
      master: m.name,
      free: catalog.timeSlots.filter((t) => !isPast(t) && !taken.some((b) => b.masterId === m.id && b.bookingTime === t)),
    })),
    note: `Записаться: ${SITE_URL}/#booking`,
  };
}

async function runTool(block, ctx) {
  try {
    if (block.name === 'check_free_slots') return JSON.stringify(await checkFreeSlots(String(block.input.date || ''), ctx.data.masters));
    if (block.name === 'call_manager') {
      const sent = await notifyTelegram(
        `💬 WhatsApp: клиент +${ctx.from}${ctx.name ? ` (${ctx.name})` : ''} просит менеджера.\nПричина: ${String(block.input.reason || '').slice(0, 300)}\nПоследнее сообщение: ${ctx.text.slice(0, 500)}\nОтветить: https://wa.me/${ctx.from}`
      );
      const manager = ctx.data.settings.whatsapp || ctx.data.settings.phone || '';
      return JSON.stringify({
        notified: sent,
        manager_whatsapp: manager ? `https://wa.me/${manager.replace(/\D/g, '')}` : null,
        manager_phone: ctx.data.settings.phone || null,
      });
    }
    return JSON.stringify({ error: 'unknown tool' });
  } catch (err) {
    console.error('tool failed', block.name, err);
    return JSON.stringify({ error: 'Не удалось получить данные, предложи связаться с менеджером' });
  }
}

// ---- Claude --------------------------------------------------------------------------------

const anthropic = () => new Anthropic(); // reads ANTHROPIC_API_KEY

async function answer(ctx, history) {
  const client = anthropic();
  const now = bishkekNow();
  const system = [
    { type: 'text', text: systemPrompt(ctx.data), cache_control: { type: 'ephemeral' } },
    { type: 'text', text: `Сегодня ${now.toISOString().slice(0, 10)}, сейчас ${now.toISOString().slice(11, 16)} по Бишкеку.` },
  ];
  // History holds plain text turns only; within this reply the full assistant content is appended unchanged.
  const messages = [...history.map((h) => ({ role: h.role, content: h.text })), { role: 'user', content: ctx.text }];

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4096,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low' }, // short chat answers; raise to 'medium' if answers feel shallow
      system,
      tools: TOOLS,
      messages,
    });

    if (response.stop_reason === 'refusal') return null;
    const toolUses = response.content.filter((b) => b.type === 'tool_use');
    if (response.stop_reason !== 'tool_use' || toolUses.length === 0) {
      const text = response.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim();
      return text || null;
    }
    messages.push({ role: 'assistant', content: response.content });
    const results = await Promise.all(
      toolUses.map(async (b) => ({ type: 'tool_result', tool_use_id: b.id, content: await runTool(b, ctx) }))
    );
    messages.push({ role: 'user', content: results });
  }
  return null;
}

// ---- WhatsApp sending ----------------------------------------------------------------------

async function sendText(to, body) {
  const res = await fetch(`${GRAPH}/${env('WHATSAPP_PHONE_NUMBER_ID')}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('WHATSAPP_TOKEN')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: body.slice(0, 4000), preview_url: true } }),
  });
  if (!res.ok) console.error('WhatsApp send failed', res.status, await res.text().catch(() => ''));
  return res.ok;
}

const fallbackText = (settings) =>
  `Извините, не получилось ответить автоматически. Напишите менеджеру: https://wa.me/${String(settings.whatsapp || settings.phone || '996700910777').replace(/\D/g, '')} или позвоните ${settings.phone || '+996 700 910 777'}.`;

// ---- One incoming message ------------------------------------------------------------------

async function handleMessage(msg, contactName) {
  // Meta retries webhooks; reply to each message id once.
  const fresh = await redis(['SET', `wa:seen:${msg.id}`, '1', 'NX', 'EX', '172800']);
  if (fresh !== 'OK') return;

  const from = String(msg.from || '').replace(/\D/g, '');
  if (!from) return;

  const hourKey = `wa:rate:${from}:${Math.floor(Date.now() / 3_600_000)}`;
  const count = await redis(['INCR', hourKey]);
  if (count === 1) await redis(['EXPIRE', hourKey, '3600']);
  if (count > MAX_PER_HOUR) return;

  const data = await studioData();
  if (msg.type !== 'text' || !msg.text?.body) {
    await sendText(from, 'Пока я понимаю только текстовые сообщения. Напишите вопрос текстом, пожалуйста.');
    return;
  }

  const text = msg.text.body.slice(0, 2000);
  const histKey = `wa:hist:${from}`;
  const history = (await getJson(histKey, [])).slice(-HISTORY_TURNS);
  const ctx = { from, name: contactName, text, data };

  let reply = null;
  try {
    reply = await answer(ctx, history);
  } catch (err) {
    console.error('Claude request failed', err);
  }
  await sendText(from, reply || fallbackText(data.settings));
  if (reply) {
    const next = [...history, { role: 'user', text }, { role: 'assistant', text: reply }].slice(-HISTORY_TURNS);
    await redis(['SET', histKey, JSON.stringify(next), 'EX', String(HISTORY_TTL)]);
  }
}

export async function POST(request) {
  const raw = await request.text();
  if (!signatureValid(raw, request.headers.get('x-hub-signature-256'))) return json(401, { error: 'bad_signature' });
  if (!configured()) return json(200, { ignored: 'not_configured' });

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(400, { error: 'bad_json' });
  }

  const jobs = [];
  for (const entry of payload.entry || []) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      if (value.metadata?.phone_number_id && value.metadata.phone_number_id !== env('WHATSAPP_PHONE_NUMBER_ID')) continue;
      const names = Object.fromEntries((value.contacts || []).map((c) => [c.wa_id, c.profile?.name || '']));
      for (const msg of value.messages || []) jobs.push(handleMessage(msg, names[msg.from] || ''));
    }
  }
  const results = await Promise.allSettled(jobs);
  results.filter((r) => r.status === 'rejected').forEach((r) => console.error('WhatsApp message failed', r.reason));
  return json(200, { ok: true });
}
