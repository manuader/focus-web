import { NextResponse, type NextRequest } from 'next/server';
import { DETECTED_LANG_COOKIE, detectLang } from '@/lib/locale';

/**
 * Tells the page which language to open in. The page itself stays static,
 * the same HTML for everyone straight from the CDN; this only adds a cookie
 * with the guess, which the LanguageProvider applies on load. It is worked
 * out again on every visit, so it follows the browser if its language
 * changes. A choice made with the ES / EN toggle is kept separately and
 * always wins over it.
 *
 * The cookie has to outlive the browser session. A returning browser
 * revalidates the cached page and Vercel answers with a bare 304 that drops
 * this Set-Cookie, so a session cookie, gone after a restart, would leave an
 * English reader with no guess and the Spanish page.
 */
export function middleware(request: NextRequest) {
  const lang = detectLang(
    request.headers.get('accept-language'),
    // Set by Vercel's edge; absent locally, where the header alone decides.
    request.headers.get('x-vercel-ip-country'),
  );
  const response = NextResponse.next();
  response.cookies.set(DETECTED_LANG_COOKIE, lang, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

/* The page only: assets, images and metadata routes have no use for it. */
export const config = { matcher: '/' };
