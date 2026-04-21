/**
 * 프리셋 기본 HTTP 클라이언트.
 * - fetch 기반. 요청/응답 타입 안전.
 * - 공통 에러 타입 ApiError로 변환.
 * - client 환경변수 VITE_API_BASE_URL 사용.
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiErrorPayload {
  code?: string;
  message?: string;
  details?: unknown;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const url = new URL(path.replace(/^\//, ''), `${BASE_URL.replace(/\/$/, '')}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function apiRequest<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const { body, query, headers, ...rest } = options;
  const init: RequestInit = {
    ...rest,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
  };

  const response = await fetch(buildUrl(path, query), init);

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as ApiErrorPayload;
    throw new ApiError(
      response.status,
      payload.code ?? 'unknown_error',
      payload.message ?? response.statusText,
      payload.details,
    );
  }

  if (response.status === 204) return undefined as TResponse;
  return (await response.json()) as TResponse;
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
};
