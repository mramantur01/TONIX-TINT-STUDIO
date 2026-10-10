// Shared helpers for the Vercel serverless API (files starting with "_" are not routes).
import crypto from 'node:crypto';

// Upstash Redis REST credentials. Vercel's Upstash integration sets KV_* or UPSTASH_* names.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // admin session: 12 hours

export const CONTENT_KEYS = [
  'services',
  'masters',
  'settings',
  'promotions',
  'announcement',
  'reviews',
  'heroSlides',
  'portfolio',
];

export const storageConfigured = () => Boolean(REDIS_URL && REDIS_TOKEN);
export const adminConfigured = () => ADMIN_PASSWORD.length > 0;

export async function redis(command) {
  if (!storageConfigured()) {
    const err = new Error('Storage is not configured');
    err.status = 503;
    throw err;
  }
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    const err = new Error(data.error || `Redis error ${res.status}`);
    err.status = 502;
    throw err;
  }
  return data.result;
}

export async function getJson(key, fallback = null) {
  const raw = await redis(['GET', key]);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export const setJson = (key, value) => redis(['SET', key, JSON.stringify(value)]);

// ---- Admin auth: stateless HMAC-signed token -------------------------------------------

const sign = (payload) =>
  crypto.createHmac('sha256', `tonix-admin:${ADMIN_PASSWORD}`).update(payload).digest('hex');

export function passwordMatches(candidate) {
  if (!adminConfigured() || typeof candidate !== 'string') return false;
  const a = crypto.createHash('sha256').update(candidate).digest();
  const b = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

export function issueToken() {
  const expires = String(Date.now() + TOKEN_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function isAdmin(req) {
  if (!adminConfigured()) return false;
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  return (
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
}

// ---- HTTP helpers ------------------------------------------------------------------------

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export function handleError(res, err) {
  console.error(err);
  send(res, err.status || 500, { error: err.status === 503 ? 'storage_not_configured' : 'server_error' });
}

export const clip = (value, max = 300) => String(value ?? '').trim().slice(0, max);

// ---- Telegram notifications (optional) ----------------------------------------------------

export async function notifyTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    return res.ok;
  } catch (err) {
    console.error('Telegram send failed', err);
    return false;
  }
}

// ---- Client accounts (phone + password) -----------------------------------------------------

// Compare phones by their last 9 digits, so "+996 555 12 34 56" and "0555123456" match.
export const phoneKey = (value) => String(value ?? '').replace(/\D/g, '').slice(-9);

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  crypto.createHash('sha256').update(`tonix-client:${REDIS_TOKEN || ''}:${ADMIN_PASSWORD}`).digest('hex');
const CLIENT_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // clients stay signed in for 30 days

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return { salt, hash };
}

export function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(expectedHash, 'hex'));
}

const signClient = (payload) => crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

export function issueClientToken(phone) {
  const payload = `${phoneKey(phone)}.${Date.now() + CLIENT_TOKEN_TTL_MS}`;
  return `${payload}.${signClient(payload)}`;
}

// Returns the phone key of the signed-in client, or null.
export function clientFromRequest(req) {
  const header = req.headers['x-client-token'] || '';
  const [key, expires, signature] = String(header).split('.');
  if (!key || !expires || !signature || Number(expires) < Date.now()) return null;
  const expected = signClient(`${key}.${expires}`);
  if (signature.length !== expected.length) return null;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ? key : null;
}
