/**
 * Ordrat API client — wrapper around native fetch that:
 * 1. Attaches the Bearer token from the NextAuth session.
 * 2. On 401, forces a session refresh and retries once.
 * 3. On second 401 (refresh failed), signs out and redirects to /signin.
 *
 * Usage (client components only — requires SessionProvider in the tree):
 *   import { ordratFetch } from '@/lib/api-client';
 *   const data = await ordratFetch('/api/Orders/GetAll');
 */

import { getSession, signOut } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? '';

async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  if (!session || session.error === 'RefreshAccessTokenError') return null;
  return session.accessToken ?? null;
}

export async function ordratFetch(
  path: string,
  init: RequestInit = {},
  _retried = false,
): Promise<Response> {
  const token = await getAccessToken();

  if (!token) {
    await signOut({ callbackUrl: '/signin' });
    throw new Error('Session expired. Redirecting to sign-in.');
  }

  const headers = new Headers(init.headers);
  headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json');
  headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (res.status === 401 && !_retried) {
    // Force NextAuth to re-run the jwt() callback (triggers refresh)
    const refreshedSession = await getSession();

    if (
      !refreshedSession ||
      refreshedSession.error === 'RefreshAccessTokenError'
    ) {
      await signOut({ callbackUrl: '/signin' });
      throw new Error('Session expired. Redirecting to sign-in.');
    }

    // Retry with the new token
    return ordratFetch(path, init, true);
  }

  return res;
}
