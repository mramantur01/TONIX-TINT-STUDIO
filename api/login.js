import { adminConfigured, issueToken, passwordMatches, readBody, send } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  if (!adminConfigured()) return send(res, 503, { error: 'admin_not_configured' });

  const { password } = readBody(req);
  if (!passwordMatches(password)) {
    // Small delay to slow down password guessing.
    await new Promise((r) => setTimeout(r, 800));
    return send(res, 401, { error: 'wrong_password' });
  }
  return send(res, 200, { token: issueToken() });
}
