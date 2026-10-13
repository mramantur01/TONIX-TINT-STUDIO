// Reviews left by visitors. They are kept in their own list so a visitor can never
// overwrite the curated reviews managed from the admin panel (content:reviews).
// GET is public; POST requires a signed-in client (one review per day); DELETE requires an admin token.
import {
  clientFromRequest,
  clip,
  getJson,
  handleError,
  isAdmin,
  listPrepend,
  listRemove,
  phoneKey,
  readBody,
  send,
  storageConfigured,
} from './_lib.js';

const KEY = 'reviews:public';
const MAX_REVIEWS = 500;
const REVIEW_INTERVAL_MS = 24 * 60 * 60 * 1000;

// userId is the client's phone key and createdAt is only for the rate limit: neither goes out.
const publicView = ({ userId, createdAt, ...review }) => review;

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (!storageConfigured()) return send(res, 200, { reviews: [] });
      return send(res, 200, { reviews: (await getJson(KEY, [])).map(publicView) });
    }

    if (req.method === 'POST') {
      const key = clientFromRequest(req);
      const user = key ? await getJson(`user:${key}`) : null;
      if (!user) return send(res, 401, { error: 'login_required' });

      const list = await getJson(KEY, []);
      const last = list.find((r) => r.userId === key);
      if (last && Date.now() - (last.createdAt || 0) < REVIEW_INTERVAL_MS) {
        return send(res, 429, { error: 'too_soon' });
      }

      const bookings = await getJson('bookings', []);
      const input = readBody(req);
      const review = {
        id: `rev-${Date.now()}`,
        authorName: clip(input.authorName, 60) || clip(user.name, 60),
        carModel: clip(input.carModel, 60),
        rating: Math.min(5, Math.max(1, Math.round(Number(input.rating) || 5))),
        date: new Date().toLocaleDateString('ru-RU'),
        serviceName: clip(input.serviceName, 120),
        comment: clip(input.comment, 1500),
        // "Verified" only for clients whose car the studio has actually finished.
        verified: bookings.some(
          (b) => b.status === 'completed' && (b.userId === key || phoneKey(b.clientPhone) === key)
        ),
        likes: 0,
        masterName: clip(input.masterName, 120) || undefined,
        userId: key,
        createdAt: Date.now(),
      };
      if (!review.authorName || !review.comment) return send(res, 400, { error: 'missing_fields' });
      await listPrepend(KEY, review, MAX_REVIEWS);
      return send(res, 201, { review: publicView(review) });
    }

    if (req.method === 'DELETE') {
      if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' });
      const id = new URL(req.url, 'http://x').searchParams.get('id');
      if (!id) return send(res, 400, { error: 'bad_id' });
      await listRemove(KEY, id);
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: 'method_not_allowed' });
  } catch (err) {
    return handleError(res, err);
  }
}
