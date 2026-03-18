import {
  LoginResponseSchema,
  LoginResponseType,
  RefreshResponseSchema,
  RefreshResponseType,
} from './schemas';

function getBackendUrl(): string {
  const url = process.env.BACKEND_API_URL;
  if (!url) throw new Error('BACKEND_API_URL environment variable is not set');
  return url;
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResponseType> {
  const res = await fetch(`${getBackendUrl()}/api/Auth/Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401 || res.status === 404) {
    throw new Error('Invalid email or password.');
  }

  if (!res.ok) {
    throw new Error('Service unavailable. Please try again later.');
  }

  const data: unknown = await res.json();
  return LoginResponseSchema.parse(data);
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshResponseType> {
  const res = await fetch(`${getBackendUrl()}/api/Auth/RefreshAccessToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      refreshToken,
    },
  });

  if (!res.ok) {
    throw new Error('RefreshAccessTokenError');
  }

  const data: unknown = await res.json();
  return RefreshResponseSchema.parse(data);
}
