// Client cabinet: a visitor proves who they are with their phone number plus the number
// of any of their bookings (BK-...), and gets back all bookings made with that phone.
import { getJson, handleError, readBody, send } from './_lib.js';

// Compare phones by their last 9 digits, so "+996 555 12 34 56" and "0555123456" match.
const phoneKey = (value) => String(value ?? '').replace(/\D/g, '').slice(-9);

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  try {
    const { phone, bookingId } = readBody(req);
    const key = phoneKey(phone);
    const id = String(bookingId ?? '').trim().toUpperCase().replace(/^#/, '');
    if (key.length < 9 || !id) return send(res, 400, { error: 'missing_fields' });

    const all = await getJson('bookings', []);
    const proof = all.find((b) => b.id.toUpperCase() === id && phoneKey(b.clientPhone) === key);
    if (!proof) {
      // Slow down guessing.
      await new Promise((r) => setTimeout(r, 800));
      return send(res, 404, { error: 'not_found' });
    }

    const bookings = all.filter((b) => phoneKey(b.clientPhone) === key);
    return send(res, 200, { bookings });
  } catch (err) {
    return handleError(res, err);
  }
}
