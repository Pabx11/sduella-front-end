import { OPPORTUNITY_API_BASE_URL } from './opportunitiesApi';
import type { Role, User } from '../types';

export interface SavedInterest {
  opportunity_group: 'jobs' | 'funding';
  opportunity_type?: string;
  country_code?: string;
  query?: string;
  field_or_sector?: string;
  remote?: boolean;
  notification_frequency: 'daily' | 'weekly' | 'monthly';
  is_active?: boolean;
}

interface ApiUser {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  email_verified: boolean;
  profile: Record<string, string | null>;
  interests: Array<SavedInterest & { id: string }>;
  consents: Record<string, boolean>;
}

interface AuthResponse { access_token: string; user: ApiUser; }
let accessToken: string | null = null;

function toUser(user: ApiUser): User {
  return {
    id: user.id, name: user.full_name, email: user.email, role: user.role,
    countryCode: user.profile.country_code || undefined,
    city: user.profile.city || undefined,
    institution: user.profile.institution || undefined,
    emailVerified: user.email_verified,
    interests: user.interests,
    consents: user.consents,
    totalDonated: 0, donations: [], applications: [],
  };
}

async function readResponse(response: Response) {
  if (response.ok) return response.json();
  let message = 'The request could not be completed.';
  try {
    const body = await response.json();
    if (typeof body.detail === 'string') message = body.detail;
  } catch { /* Preserve the safe fallback. */ }
  throw new Error(message);
}

async function authRequest(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  return fetch(`${OPPORTUNITY_API_BASE_URL}${path}`, { ...init, headers, credentials: 'include' });
}

function acceptAuth(body: AuthResponse): User {
  accessToken = body.access_token;
  return toUser(body.user);
}

export async function login(email: string, password: string): Promise<User> {
  return acceptAuth(await readResponse(await authRequest('/api/v1/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  })) as AuthResponse);
}

export async function register(payload: {
  full_name: string; email: string; password: string; role: Role;
  country_code?: string; city?: string; institution?: string;
  interests: SavedInterest[]; opportunity_email_consent: boolean; marketing_consent: boolean;
}): Promise<User> {
  return acceptAuth(await readResponse(await authRequest('/api/v1/auth/register', {
    method: 'POST', body: JSON.stringify(payload),
  })) as AuthResponse);
}

export async function restoreSession(): Promise<User | null> {
  try {
    return acceptAuth(await readResponse(await authRequest('/api/v1/auth/refresh', { method: 'POST' })) as AuthResponse);
  } catch { accessToken = null; return null; }
}

export async function logout(): Promise<void> {
  try { await authRequest('/api/v1/auth/logout', { method: 'POST' }); }
  finally { accessToken = null; }
}

export async function updateProfile(user: User): Promise<User> {
  const body = await readResponse(await authRequest('/api/v1/users/me/profile', {
    method: 'PATCH',
    body: JSON.stringify({ full_name: user.name, country_code: user.countryCode, city: user.city, institution: user.institution }),
  })) as ApiUser;
  return toUser(body);
}

export async function updateConsents(opportunityEmail: boolean, marketing: boolean): Promise<User> {
  const body = await readResponse(await authRequest('/api/v1/users/me/consents', {
    method: 'PUT',
    body: JSON.stringify({ opportunity_email: opportunityEmail, marketing }),
  })) as ApiUser;
  return toUser(body);
}

export async function requestEmailVerification(): Promise<void> {
  await readResponse(await authRequest('/api/v1/auth/request-email-verification', { method: 'POST' }));
}
