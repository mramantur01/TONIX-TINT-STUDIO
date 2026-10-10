// Site content edited from the admin panel (services, prices, masters, settings, ...).
// GET is public; PUT requires an admin token.
import {
  CONTENT_KEYS,
  handleError,
  isAdmin,
  readBody,
  redis,
  send,
  setJson,
  storageConfigured,
} from './_lib.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (!storageConfigured()) return send(res, 200, { configured: false, content: {} });
      const values = await redis(['MGET', ...CONTENT_KEYS.map((k) => `content:${k}`)]);
      const content = {};
      CONTENT_KEYS.forEach((key, i) => {
        if (values[i] == null) return;
        try {
          content[key] = JSON.parse(values[i]);
        } catch {
          /* skip corrupted value */
        }
      });
      return send(res, 200, { configured: true, content });
    }

    if (req.method === 'PUT') {
      if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });
      const body = readBody(req);
      const keys = Object.keys(body).filter((k) => CONTENT_KEYS.includes(k));
      if (keys.length === 0) return send(res, 400, { error: 'nothing_to_save' });
      for (const key of keys) {
        await setJson(`content:${key}`, body[key]);
      }
      return send(res, 200, { ok: true, saved: keys });
    }

    return send(res, 405, { error: 'method_not_allowed' });
  } catch (err) {
    return handleError(res, err);
  }
}
