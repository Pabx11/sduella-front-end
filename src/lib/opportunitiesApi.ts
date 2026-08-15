import type { OpportunitySearchResponse, OpportunitySource, OpportunityType } from '../types/opportunities';

const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const OPPORTUNITY_API_BASE_URL = (
  configuredBaseUrl || 'http://127.0.0.1:8000'
).replace(/\/$/, '');

const REQUEST_TIMEOUT_MS = 25_000;
const RESPONSE_CACHE_TTL_MS = 2 * 60_000;
const RESPONSE_CACHE_LIMIT = 100;

interface CachedSearch {
  expiresAt: number;
  response: OpportunitySearchResponse;
}

const responseCache = new Map<string, CachedSearch>();

interface SearchOptions {
  group: 'jobs' | 'funding';
  query?: string;
  location?: string;
  country?: string;
  remote?: boolean;
  duration?: 'permanent' | 'contract' | 'temporary';
  types?: OpportunityType[];
  sources?: OpportunitySource[];
  page?: number;
  pageSize?: number;
  signal?: AbortSignal;
}

export async function searchOpportunities({
  group,
  query,
  location,
  country,
  remote,
  duration,
  types,
  sources,
  page = 1,
  pageSize = 20,
  signal,
}: SearchOptions): Promise<OpportunitySearchResponse> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  if (query?.trim()) params.set('query', query.trim());
  if (location?.trim()) params.set('location', location.trim());
  if (country?.trim()) params.set('country', country.trim().toLowerCase());
  if (remote !== undefined) params.set('remote', String(remote));
  if (duration) params.set('duration', duration);
  types?.forEach(type => params.append('type', type));
  sources?.forEach(source => params.append('source', source));

  const requestUrl = `${OPPORTUNITY_API_BASE_URL}/api/v1/${group}?${params.toString()}`;
  const cached = responseCache.get(requestUrl);
  if (cached && cached.expiresAt > Date.now()) return cached.response;
  if (cached) responseCache.delete(requestUrl);

  const requestController = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => requestController.abort();
  if (signal?.aborted) abortFromCaller();
  else signal?.addEventListener('abort', abortFromCaller, { once: true });
  const timeoutId = globalThis.setTimeout(() => {
    timedOut = true;
    requestController.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(requestUrl, {
      signal: requestController.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(
        response.status >= 500
          ? 'The opportunity service is temporarily unavailable.'
          : 'The opportunity search could not be completed.',
      );
    }

    const result = await response.json() as OpportunitySearchResponse;
    if (responseCache.size >= RESPONSE_CACHE_LIMIT) {
      const oldestKey = responseCache.keys().next().value;
      if (oldestKey) responseCache.delete(oldestKey);
    }
    responseCache.set(requestUrl, {
      expiresAt: Date.now() + (result.errors.length > 0 ? 20_000 : RESPONSE_CACHE_TTL_MS),
      response: result,
    });
    return result;
  } catch (error) {
    if (timedOut) {
      throw new Error('The search is taking longer than expected. Please try again.');
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}
