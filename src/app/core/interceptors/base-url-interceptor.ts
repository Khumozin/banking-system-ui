import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CONFIG } from '../config/config';

const isAbsoluteUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const prependBaseUrl = (url: string, baseUrl: string): string =>
  `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;

/**
 * HTTP interceptor that prepends the appropriate base URL to relative requests
 * based on the request path prefix.
 *
 * Routes:
 * - /accounts/** → APP_ACCOUNTS_API_URL
 * - /transactions/** → APP_TRANSACTIONS_API_URL
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (isAbsoluteUrl(req.url)) return next(req);

  const config = inject(CONFIG);

  // Define mapping of path prefixes to their respective base URLs from config
  const apiMappings: Record<string, string | undefined> = {
    '/accounts': config.get('APP_ACCOUNTS_API_URL'),
    '/transactions': config.get('APP_TRANSACTIONS_API_URL'),
  };

  const matchedPrefix = Object.keys(apiMappings).find(prefix =>
    req.url.startsWith(prefix)
  );

  if (matchedPrefix) {
    const baseUrl = apiMappings[matchedPrefix];

    if (!baseUrl) {
      console.error(`Base URL not configured for prefix: ${matchedPrefix}`);
      return next(req);
    }

    const updatedUrl = prependBaseUrl(req.url, baseUrl);
    const updatedReq = req.clone({ url: updatedUrl });
    return next(updatedReq);
  }

  // If no prefix matched, pass through untouched
  return next(req);
};