/* ============================================================
   FOCUS — Starting language
   Spanish is the site's language; English is for visitors whose
   browser asks for it first. Decided on the server from the
   Accept-Language header rather than from navigator.language in
   the page, because the header is the one signal crawlers leave
   out: Googlebot requests without it, so it keeps indexing the
   Spanish page, whereas its renderer runs an English Chrome and
   would have switched a client-side check to English.
   Shared by the middleware, which detects, and the
   LanguageProvider, which applies.
   ============================================================ */

import type { Lang } from './content';

/** Written by the middleware on every page request with its guess. Not
    httpOnly: the LanguageProvider reads it to pick the starting language. */
export const DETECTED_LANG_COOKIE = 'focus-lang-detected';

/**
 * The language to open in, from what the request says about the visitor.
 *
 * Accept-Language decides whenever it names Spanish or English, in the order
 * and weights the browser gives. When it names neither (a browser set to
 * French only, say) a visitor in the United States gets English. With no
 * header at all there is nothing to go on, and that is exactly how crawlers
 * ask, so that case stays Spanish instead of following the IP: Googlebot
 * crawls mostly from the US and would otherwise index the page in English.
 */
export function detectLang(
  acceptLanguage: string | null,
  country: string | null,
): Lang {
  if (!acceptLanguage) return 'es';

  const ranked = acceptLanguage
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { base: tag.trim().split('-')[0], q: q ? Number(q.slice(2)) : 1, i };
    })
    // q=0 means "not this one"; a malformed weight is NaN and drops out too.
    .filter((r) => r.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);

  for (const { base } of ranked) {
    if (base === 'es' || base === 'en') return base;
  }
  return country === 'US' ? 'en' : 'es';
}
