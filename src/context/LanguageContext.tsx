'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Lang } from '@/lib/content';
import { DETECTED_LANG_COOKIE } from '@/lib/locale';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'focus-lang';

const isLang = (v: unknown): v is Lang => v === 'es' || v === 'en';

/** A language picked with the toggle on an earlier visit, if storage allows. */
function savedLang(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked: private mode, site data turned off
  }
}

/** The middleware's guess from the browser's language (see lib/locale). */
function detectedLang(): string | undefined {
  const prefix = `${DETECTED_LANG_COOKIE}=`;
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(prefix))
    ?.slice(prefix.length);
}

/**
 * Real i18n replacement for the original site's `data-es` / `data-en` display
 * toggling. Language lives in context so any section can read it; the choice is
 * persisted and mirrored onto <html lang> for accessibility / SEO.
 *
 * The page is rendered in Spanish and switches on load when there is reason
 * to: a language picked with the toggle before, or else the one the
 * middleware read off the browser. A picked language always wins, so someone
 * reading in Spanish on an English laptop is not overruled on the next visit.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  // Settle the starting language after mount (avoids hydration mismatch).
  useEffect(() => {
    const start = [savedLang(), detectedLang()].find(isLang);
    if (start) setLangState(start);
  }, []);

  // Mirrored however it was set, the start above included.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not remembered for next time, but the page still switches.
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'es' ? 'en' : 'es');
  }, [lang, setLang]);

  const value = useMemo(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}
