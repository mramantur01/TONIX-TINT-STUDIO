// Reviews left by visitors. They are kept in their own list so a visitor can never
// overwrite the curated reviews managed from the admin panel (content:reviews).
// GET and POST are public; DELETE requires an admin token.
import { clip, getJson, handleError, isAdmin, readBody, send, setJson, storageConfigured } from './_lib.js';

const KEY = 'reviews:public';
const MAX_REVIEWS = 500;

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (!storageConfigured()) return send(res, 200, { reviews: [] });
      return send(res, 200, { reviews: await getJson(KEY, []) });
    }

    if (req.method === 'POST') {
      const input = readBody(req);
      const review = {
        id: `rev-${Date.now()}`,
        authorName: clip(input.authorName, 60),
        carModel: clip(input.carModel, 60),
        rating: Math.min(5, Math.max(1, Math.round(Number(input.rating) || 5))),
        date: new Date().toLocaleDateString('ru-RU'),
        serviceName: clip(input.serviceName, 120),
        comment: clip(input.comment, 1500),
        verified: false,
        likes: 0,
        masterName: clip(input.masterName, 120) || undefined,
      };
      if (!review.authorName || !review.comment) return send(res, 400, { error: 'missing_fields' });
      const list = await getJson(KEY, []);
      await setJson(KEY, [review, ...list].slice(0, MAX_REVIEWS));
      return send(res, 201, { review });
    }

    if (req.method === 'DELETE') {
      if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });
      const id = new URL(req.url, 'http://x').searchParams.get('id');
      const list = await getJson(KEY, []);
      await setJson(KEY, list.filter((r) => r.id !== id));
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: 'method_not_allowed' });
  } catch (err) {
    return handleError(res, err);
  }
}
