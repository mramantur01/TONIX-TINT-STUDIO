// Admin: download everything the site stores, as one JSON file to keep on the studio's computer.
// GET -> { createdAt, bookings, bookingsArchive, clients, content, reviews }
// Client password hashes are left out: a backup file should not carry login secrets.
import {
  BOOKINGS_ARCHIVE_KEY,
  CONTENT_KEYS,
  allUsers,
  getJson,
  handleError,
  isAdmin,
  readArchive,
  redis,
  send,
} from './_lib.js';

export default async function handler(req, res) {
  if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });
  if (req.method !== 'GET') return send(res, 405, { error: 'method_not_allowed' });
  try {
    const [bookings, bookingsArchive, users, contentValues, reviews] = await Promise.all([
      getJson('bookings', []),
      readArchive(BOOKINGS_ARCHIVE_KEY),
      allUsers(),
      redis(['MGET', ...CONTENT_KEYS.map((k) => `content:${k}`)]),
      getJson('reviews:public', []),
    ]);
    const content = {};
    CONTENT_KEYS.forEach((key, i) => {
      if (contentValues[i] == null) return;
      try {
        content[key] = JSON.parse(contentValues[i]);
      } catch {
        /* skip corrupted value */
      }
    });
    const clients = users.map(({ salt, hash, key, ...profile }) => profile);
    res.setHeader('Content-Disposition', 'attachment; filename="tonix-backup.json"');
    return send(res, 200, {
      createdAt: new Date().toISOString(),
      bookings,
      bookingsArchive,
      clients,
      content,
      reviews,
    });
  } catch (err) {
    return handleError(res, err);
  }
}
