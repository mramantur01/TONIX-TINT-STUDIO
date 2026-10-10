// Client accounts: register / sign in with phone + password, see own bookings.
//
// Without SMS we can't prove a visitor owns a phone number, so:
//  - if bookings with this phone already exist, registering requires the number of one of them;
//  - the cabinet shows bookings made while signed in, bookings made before registration
//    (ownership was proven at registration), and bookings the client adds by number.
//
// GET  (X-Client-Token)                     -> { profile, bookings }
// POST { action: 'register', name, phone, password, bookingId? }
// POST { action: 'login', phone, password }
// POST { action: 'claim', bookingId }       (X-Client-Token) attach a booking made while signed out
import {
  clientFromRequest,
  clip,
  getJson,
  handleError,
  hashPassword,
  issueClientToken,
  phoneKey,
  readBody,
  send,
  setJson,
  verifyPassword,
} from './_lib.js';

const userKey = (key) => `user:${key}`;
const slow = () => new Promise((r) => setTimeout(r, 800));
const normId = (value) => String(value ?? '').trim().toUpperCase().replace(/^#/, '');

const profileOf = (user) => ({
  name: user.name,
  phone: user.phone,
  createdAt: user.createdAt,
  mustChangePassword: Boolean(user.mustChangePassword), // signed in with a temporary password from the studio
});

function visibleBookings(all, user, key) {
  return all.filter(
    (b) =>
      b.userId === key ||
      (!b.userId && phoneKey(b.clientPhone) === key && (b.createdAt || '') < user.createdAt)
  );
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const key = clientFromRequest(req);
      const user = key && (await getJson(userKey(key)));
      if (!user) return send(res, 401, { error: 'unauthorized' });
      const all = await getJson('bookings', []);
      return send(res, 200, { profile: profileOf(user), bookings: visibleBookings(all, user, key) });
    }

    if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
    const body = readBody(req);

    if (body.action === 'register') {
      const key = phoneKey(body.phone);
      const name = clip(body.name, 80);
      const password = String(body.password ?? '');
      if (key.length < 9 || !name) return send(res, 400, { error: 'missing_fields' });
      if (password.length < 6) return send(res, 400, { error: 'weak_password' });
      if (await getJson(userKey(key))) return send(res, 409, { error: 'already_registered' });

      const all = await getJson('bookings', []);
      const existing = all.filter((b) => phoneKey(b.clientPhone) === key);
      if (existing.length > 0) {
        const id = normId(body.bookingId);
        if (!id) return send(res, 403, { error: 'booking_required' });
        if (!existing.some((b) => b.id.toUpperCase() === id)) {
          await slow();
          return send(res, 403, { error: 'booking_mismatch' });
        }
      }

      const { salt, hash } = hashPassword(password);
      const user = { name, phone: clip(body.phone, 40), salt, hash, createdAt: new Date().toISOString() };
      await setJson(userKey(key), user);
      return send(res, 201, {
        token: issueClientToken(key),
        profile: profileOf(user),
        bookings: visibleBookings(all, user, key),
      });
    }

    if (body.action === 'login') {
      const key = phoneKey(body.phone);
      const user = key.length === 9 ? await getJson(userKey(key)) : null;
      if (!user || !verifyPassword(body.password ?? '', user.salt, user.hash)) {
        await slow();
        return send(res, 401, { error: 'wrong_credentials' });
      }
      const all = await getJson('bookings', []);
      return send(res, 200, {
        token: issueClientToken(key),
        profile: profileOf(user),
        bookings: visibleBookings(all, user, key),
      });
    }

    if (body.action === 'change_password') {
      const key = clientFromRequest(req);
      const user = key && (await getJson(userKey(key)));
      if (!user) return send(res, 401, { error: 'unauthorized' });
      if (!verifyPassword(body.oldPassword ?? '', user.salt, user.hash)) {
        await slow();
        return send(res, 403, { error: 'wrong_password' });
      }
      const newPassword = String(body.newPassword ?? '');
      if (newPassword.length < 6) return send(res, 400, { error: 'weak_password' });
      const { salt, hash } = hashPassword(newPassword);
      const updated = { ...user, salt, hash, mustChangePassword: false };
      await setJson(userKey(key), updated);
      return send(res, 200, { profile: profileOf(updated) });
    }

    if (body.action === 'claim') {
      const key = clientFromRequest(req);
      const user = key && (await getJson(userKey(key)));
      if (!user) return send(res, 401, { error: 'unauthorized' });
      const id = normId(body.bookingId);
      const all = await getJson('bookings', []);
      const target = all.find((b) => b.id.toUpperCase() === id && phoneKey(b.clientPhone) === key);
      if (!target) {
        await slow();
        return send(res, 404, { error: 'not_found' });
      }
      if (target.userId && target.userId !== key) return send(res, 404, { error: 'not_found' });
      const updated = all.map((b) => (b === target ? { ...b, userId: key } : b));
      await setJson('bookings', updated);
      return send(res, 200, { bookings: visibleBookings(updated, user, key) });
    }

    return send(res, 400, { error: 'unknown_action' });
  } catch (err) {
    return handleError(res, err);
  }
}
