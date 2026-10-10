// Thin client for the serverless API in /api (Vercel functions).
import type { Booking, Review } from '../types';

const TOKEN_KEY = 'tonixtint_admin_token';

export const getAdminToken = (): string | null => {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const expires = Number(token.split('.')[0]);
    if (!expires || expires < Date.now()) {
      sessionStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

const setAdminToken = (token: string | null) => {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
};

async function request<T>(path: string, options: RequestInit = {}, admin = false): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (admin) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(path, { ...options, headers: { ...headers, ...(options.headers as Record<string, string>) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data && data.error) || `HTTP ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return data as T;
}

export type LoginResult = 'ok' | 'wrong_password' | 'not_configured' | 'network_error';

export async function adminLogin(password: string): Promise<LoginResult> {
  try {
    const { token } = await request<{ token: string }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    setAdminToken(token);
    return 'ok';
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status === 401) return 'wrong_password';
    if (status === 503) return 'not_configured';
    return 'network_error';
  }
}

export const adminLogout = () => setAdminToken(null);

export const fetchContent = () =>
  request<{ configured: boolean; content: Record<string, unknown> }>('/api/content');

export const saveContent = (patch: Record<string, unknown>) =>
  request<{ ok: boolean }>('/api/content', { method: 'PUT', body: JSON.stringify(patch) }, true);

export const createBooking = (booking: Omit<Booking, 'createdAt' | 'telegramSent'>) =>
  request<{ booking: Booking }>('/api/bookings', { method: 'POST', body: JSON.stringify(booking) });

export const fetchBookings = () => request<{ bookings: Booking[] }>('/api/bookings', {}, true);

export const patchBookingStatus = (id: string, status: Booking['status']) =>
  request<{ ok: boolean }>('/api/bookings', { method: 'PATCH', body: JSON.stringify({ id, status }) }, true);

export const fetchPublicReviews = () => request<{ reviews: Review[] }>('/api/reviews');

export const createReview = (review: Omit<Review, 'id' | 'date' | 'likes' | 'verified'>) =>
  request<{ review: Review }>('/api/reviews', { method: 'POST', body: JSON.stringify(review) });

export const deletePublicReview = (id: string) =>
  request<{ ok: boolean }>(`/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' }, true);
