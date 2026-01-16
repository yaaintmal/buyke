import axios from 'axios';
// @ts-ignore
import axiosRetry from 'axios-retry';

const BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry configuration
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: any) => {
    // Retry on network errors or 5xx status codes
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response?.status ?? 0) >= 500
    );
  },
});

// Basic response interceptor to normalize errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const response = err?.response;
    if (response) {
      const apiError: ApiError = {
        message: response.data?.error || response.statusText || 'API Error',
        status: response.status,
        details: response.data?.details,
      };
      return Promise.reject(apiError);
    }

    return Promise.reject({ message: err.message || 'Network error' } as ApiError);
  },
);

export function setAuthToken(token: string | null) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export default api;
