// Client bookings.
// POST is public (a visitor books a slot); GET and PATCH require an admin token.
import {
  clientFromRequest,
  clip,
  getJson,
  handleError,
  isAdmin,
  notifyTelegram,
  readBody,
  send,
  setJson,
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
    `🚗 ${b.carBrand} ${b.carModel}${b.carYear ? ` (${b.carYear})` : ''}`,
    `🛠 ${b.serviceTitle}${b.filmBrand ? ` — ${b.filmBrand}` : ''}`,
    `👨‍🔧 Мастер: ${b.masterName || '—'}`,
    `📅 ${b.bookingDate} в ${b.bookingTime}`,
    `💰 ${b.priceKgs.toLocaleString('ru-RU')} KGS, оплата: ${b.paymentMethod}`,
    b.tintPermitAssistance ? '📄 Нужна помощь с разрешением на тонировку' : '',
    b.notes ? `📝 ${b.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const booking = sanitize(readBody(req));
      const clientKey = clientFromRequest(req);
      if (clientKey) booking.userId = clientKey; // booked while signed in to the cabinet
      if (!booking.clientName || !booking.clientPhone || !booking.bookingDate || !booking.bookingTime) {
        return send(res, 400, { error: 'missing_fields' });
      }
      booking.telegramSent = await notifyTelegram(telegramText(booking));
      const list = await getJson(KEY, []);
      await setJson(KEY, [booking, ...list].slice(0, MAX_BOOKINGS));
      return send(res, 201, { booking });
    }

    if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });

    if (req.method === 'GET') {
      return send(res, 200, { bookings: await getJson(KEY, []) });
    }

    if (req.method === 'PATCH') {
      const { id, status } = readBody(req);
      if (!STATUSES.includes(status)) return send(res, 400, { error: 'bad_status' });
      const list = await getJson(KEY, []);
      const updated = list.map((b) => (b.id === id ? { ...b, status } : b));
      await setJson(KEY, updated);
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: 'method_not_allowed' });
  } catch (err) {
    return handleError(res, err);
  }
}
