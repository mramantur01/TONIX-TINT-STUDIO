// Admin: list client accounts and reset a forgotten password.
// GET  ?q=...                      -> { clients: [{ name, phone, createdAt, bookings, mustChangePassword }] }
// POST { action: 'reset', phone }  -> { tempPassword }  (shown once to the admin, sent to the client by phone/WhatsApp)
import crypto from 'node:crypto';
import { getJson, handleError, hashPassword, isAdmin, phoneKey, readBody, redis, send, setJson } from './_lib.js';

async function allUsers() {
  const keys = [];
  let cursor = '0';
  do {
    const [next, batch] = await redis(['SCAN', cursor, 'MATCH', 'user:*', 'COUNT', '200']);
    cursor = String(next);
    keys.push(...batch);
  } while (cursor !== '0' && keys.length < 5000);
  if (keys.length === 0) return [];
  const values = await redis(['MGET', ...keys]);
  return values
    .map((raw, i) => {
      try {
        return { key: keys[i].slice(5), ...JSON.parse(raw) };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export default async function handler(req, res) {
  if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });
  try {
    if (req.method === 'GET') {
      const q = new URL(req.url, 'http://x').searchParams.get('q')?.trim().toLowerCase() || '';
      const qDigits = q.replace(/\D/g, '');
      const [users, bookings] = await Promise.all([allUsers(), getJson('bookings', [])]);
      const clients = users
        .filter((u) => !q || u.name?.toLowerCase().includes(q) || (qDigits && u.key.includes(qDigits.slice(-9))))
        .map((u) => ({
          name: u.name,
          phone: u.phone,
          createdAt: u.createdAt,
          mustChangePassword: Boolean(u.mustChangePassword),
          bookings: bookings.filter((b) => b.userId === u.key || phoneKey(b.clientPhone) === u.key).length,
        }))
        .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      return send(res, 200, { clients });
    }

    if (req.method === 'POST') {
      const { action, phone } = readBody(req);
      if (action !== 'reset') return send(res, 400, { error: 'unknown_action' });
      const key = phoneKey(phone);
      const user = key.length === 9 ? await getJson(`user:${key}`) : null;
      if (!user) return send(res, 404, { error: 'not_found' });
      const tempPassword = String(crypto.randomInt(100000, 1000000)); // 6 digits
      const { salt, hash } = hashPassword(tempPassword);
      await setJson(`user:${key}`, { ...user, salt, hash, mustChangePassword: true });
      return send(res, 200, { tempPassword, name: user.name, phone: user.phone });
    }

    return send(res, 405, { error: 'method_not_allowed' });
  } catch (err) {
    return handleError(res, err);
  }
}
