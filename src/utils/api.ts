// Thin client for the serverless API in /api (Vercel functions).
import type { Booking, Review } from '../types';

const TOKEN_KEY = 'tonixtint_admin_token';
const CLIENT_TOKEN_KEY = 'tonixtint_client_token';

export const getClientToken = (): string | null => {
  try {
    const token = localStorage.getItem(CLIENT_TOKEN_KEY);
    if (!token) return null;
    const expires = Number(token.split('.')[1]);
    if (!expires || expires < Date.now()) {
      localStorage.removeItem(CLIENT_TOKEN_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

export const setClientToken = (token: string | null) => {
  try {
    if (token) localStorage.setItem(CLIENT_TOKEN_KEY, token);
    else localStorage.removeItem(CLIENT_TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
};

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
  const clientToken = getClientToken();
  if (clientToken) headers['X-Client-Token'] = clientToken;
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

// Sent with the client token, and with the admin token too when the studio books for a client.
export const createBooking = (booking: Omit<Booking, 'createdAt' | 'telegramSent'>) =>
  request<{ booking: Booking }>('/api/bookings', { method: 'POST', body: JSON.stringify(booking) }, true);

export const fetchBookings = () => request<{ bookings: Booking[] }>('/api/bookings', {}, true);

// Public: which master/time slots are already taken on a date (no client details).
export const fetchTakenSlots = (date: string) =>
  request<{ taken: { masterId: string; time: string }[] }>(`/api/bookings?date=${encodeURIComponent(date)}`);

export const patchBookingStatus = (id: string, status: Booking['status']) =>
  request<{ ok: boolean }>('/api/bookings', { method: 'PATCH', body: JSON.stringify({ id, status }) }, true);

export const fetchPublicReviews = () => request<{ reviews: Review[] }>('/api/reviews');

export const createReview = (review: Omit<Review, 'id' | 'date' | 'likes' | 'verified'>) =>
  request<{ review: Review }>('/api/reviews', { method: 'POST', body: JSON.stringify(review) });

export const deletePublicReview = (id: string) =>
  request<{ ok: boolean }>(`/api/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' }, true);

export type ClientProfile = { name: string; phone: string; createdAt: string; mustChangePassword?: boolean };
type AccountResponse = { token?: string; profile: ClientProfile; bookings: Booking[] };

export const fetchAccount = () => request<AccountResponse>('/api/account');

export const registerAccount = (data: { name: string; phone: string; password: string; bookingId?: string }) =>
  request<AccountResponse>('/api/account', { method: 'POST', body: JSON.stringify({ action: 'register', ...data }) });

export const loginAccount = (phone: string, password: string) =>
  request<AccountResponse>('/api/account', { method: 'POST', body: JSON.stringify({ action: 'login', phone, password }) });

export const claimBooking = (bookingId: string) =>
  request<{ bookings: Booking[] }>('/api/account', { method: 'POST', body: JSON.stringify({ action: 'claim', bookingId }) });

export const changePassword = (oldPassword: string, newPassword: string) =>
  request<{ profile: ClientProfile }>('/api/account', {
    method: 'POST',
    body: JSON.stringify({ action: 'change_password', oldPassword, newPassword }),
  });

export type AdminClient = { name: string; phone: string; createdAt: string; bookings: number; mustChangePassword: boolean };

export const fetchClients = (q = '') =>
  request<{ clients: AdminClient[] }>(`/api/clients${q ? `?q=${encodeURIComponent(q)}` : ''}`, {}, true);

export const resetClientPassword = (phone: string) =>
  request<{ tempPassword: string; name: string; phone: string }>(
    '/api/clients',
    { method: 'POST', body: JSON.stringify({ action: 'reset', phone }) },
    true
  );
