'use client';

import { useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { Localized } from '@/lib/content';

/**
 * Ergonomic access to localized strings: `t(content.hero.a.para)` returns the
 * copy for the active language. Also exposes `lang` for the few places that
 * branch on it directly.
 */
export function useTranslate() {
  const { lang } = useLanguage();
  const t = useCallback(<T,>(loc: Localized<T>): T => loc[lang], [lang]);
  return { lang, t };
}
