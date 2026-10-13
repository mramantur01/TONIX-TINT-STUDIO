// Client bookings.
// POST needs a client account (or the admin); GET ?date=YYYY-MM-DD is public and returns only
// which master/time slots are taken that day; the full GET and PATCH require an admin token.
import {
  clientFromRequest,
  clip,
  getJson,
  handleError,
  isAdmin,
  listPatch,
  listPrepend,
  notifyTelegram,
  readBody,
  send,
} from './_lib.js';

const KEY = 'bookings';
const MAX_BOOKINGS = 2000;
const STATUSES = ['pending', 'in_progress', 'ready', 'completed', 'cancelled'];
const PAYMENT_METHODS = ['mbank', 'odengi', 'optima', 'card', 'cash'];
const PAYMENT_STATUSES = ['pending', 'paid', 'pay_on_site'];
const CATEGORIES = ['sedan', 'crossover', 'suv', 'premium'];

function sanitize(input) {
  const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
  return {
    id: /^BK-[A-Z0-9]{4,20}$/.test(input.id || '')
      ? input.id
      : `BK-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`,
    createdAt: new Date().toISOString(),
    clientName: clip(input.clientName, 80),
    clientPhone: clip(input.clientPhone, 40),
    carBrand: clip(input.carBrand, 60),
    carModel: clip(input.carModel, 60),
    carYear: Number(input.carYear) || 0,
    carCategory: pick(input.carCategory, CATEGORIES, 'sedan'),
    plateNumber: clip(input.plateNumber, 20).toUpperCase(),
    serviceId: clip(input.serviceId, 80),
    serviceTitle: clip(input.serviceTitle, 160),
    masterId: clip(input.masterId, 80),
    masterName: clip(input.masterName, 120),
    bookingDate: clip(input.bookingDate, 20),
    bookingTime: clip(input.bookingTime, 10),
    filmBrand: clip(input.filmBrand, 80),
    priceKgs: Math.max(0, Number(input.priceKgs) || 0),
    paymentMethod: pick(input.paymentMethod, PAYMENT_METHODS, 'cash'),
    paymentStatus: pick(input.paymentStatus, PAYMENT_STATUSES, 'pay_on_site'),
    status: 'pending',
    telegramSent: false,
    notes: clip(input.notes, 1000),
    tintPermitAssistance: Boolean(input.tintPermitAssistance),
  };
}

const telegramText = (b) =>
  [
    `🔔 Новая запись ${b.id} — TONIX TINT STUDIO`,
    `👤 ${b.clientName} (${b.clientPhone})`,
    `🚗 ${b.carBrand} ${b.carModel}${b.carYear ? ` (${b.carYear})` : ''}${b.plateNumber ? `, госномер ${b.plateNumber}` : ''}`,
    `🛠 ${b.serviceTitle}${b.filmBrand ? ` — ${b.filmBrand}` : ''}`,
    `👨‍🔧 Мастер: ${b.masterName || '—'}`,
    `📅 ${b.bookingDate} в ${b.bookingTime}`,
    `💰 ${b.priceKgs.toLocaleString('ru-RU')} KGS, оплата: ${b.paymentMethod}`,
    b.tintPermitAssistance ? '📄 Нужна помощь с разрешением на тонировку' : '',
    b.notes ? `📝 ${b.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

// A master can take one car per slot; cancelled bookings free the slot.
const occupies = (b, masterId, date, time) =>
  b.status !== 'cancelled' && b.masterId === masterId && b.bookingDate === date && b.bookingTime === time;

// Today's date in Bishkek (UTC+6), as YYYY-MM-DD.
const bishkekToday = () => new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString().slice(0, 10);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Booking is only available from a client account (the admin may also create bookings).
      const clientKey = clientFromRequest(req);
      const user = clientKey ? await getJson(`user:${clientKey}`) : null;
      if (!user && !isAdmin(req)) return send(res, 401, { error: 'login_required' });

      const booking = sanitize(readBody(req));
      if (user) {
        booking.userId = clientKey;
        booking.clientPhone = user.phone; // bookings always carry the account's phone
        if (!booking.clientName) booking.clientName = user.name;
      }
      if (!booking.clientName || !booking.clientPhone || !booking.bookingDate || !booking.bookingTime) {
        return send(res, 400, { error: 'missing_fields' });
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.bookingDate)) return send(res, 400, { error: 'bad_date' });
      if (user && booking.bookingDate < bishkekToday()) return send(res, 400, { error: 'date_in_past' });
      const existing = await getJson(KEY, []);
      if (existing.some((b) => occupies(b, booking.masterId, booking.bookingDate, booking.bookingTime))) {
        return send(res, 409, { error: 'slot_taken' });
      }
      booking.telegramSent = await notifyTelegram(telegramText(booking));
      await listPrepend(KEY, booking, MAX_BOOKINGS);
      return send(res, 201, { booking });
    }

    const date = req.method === 'GET' ? new URL(req.url, 'http://x').searchParams.get('date') : null;
    if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return send(res, 400, { error: 'bad_date' });
      const taken = (await getJson(KEY, []))
        .filter((b) => b.bookingDate === date && b.status !== 'cancelled')
        .map((b) => ({ masterId: b.masterId, time: b.bookingTime }));
      return send(res, 200, { taken });
    }

    if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });

    if (req.method === 'GET') {
      return send(res, 200, { bookings: await getJson(KEY, []) });
    }

    if (req.method === 'PATCH') {
      const { id, status } = readBody(req);
      if (!STATUSES.includes(status)) return send(res, 400, { error: 'bad_status' });
      if (typeof id !== 'string' || !id) return send(res, 400, { error: 'bad_id' });
      await listPatch(KEY, id, { status });
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: 'method_not_allowed' });
  } catch (err) {
    return handleError(res, err);
  }
}
