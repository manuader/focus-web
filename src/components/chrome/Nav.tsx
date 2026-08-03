'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useMagnetic } from '@/hooks/useMagnetic';
import { NAV_LINKS, COPY } from '@/lib/content';
import styles from './chrome.module.css';

export function Nav() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslate();
  const [solid, setSolid] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();

  // React bails out when the boolean is unchanged, so this only re-renders
  // when we actually cross the 60px threshold.
  useWindowScroll(() => setSolid(window.scrollY > 60));

  return (
    <nav className={`${styles.nav} ${solid ? styles.navSolid : ''}`}>
      <a href="#top" className={styles.brand} aria-label="FOCUS — inicio">
        <Image
          src="/assets/focus-logo-light.png"
          alt="FOCUS"
          width={457}
          height={160}
          priority
        />
      </a>

      <div className={styles.links}>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`${styles.link} ${styles.linksText}`}
          >
            {t(l.label)}
          </a>
        ))}

        <div className={styles.langSwitch}>
          <button
            type="button"
            className={`${styles.langBtn} ${lang === 'es' ? styles.langBtnActive : ''}`}
            onClick={() => setLang('es')}
            aria-pressed={lang === 'es'}
          >
            ES
          </button>
          <span className={styles.langSep} aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>

        <a ref={ctaRef} href="#contacto" className={styles.navCta}>
          {t(COPY.cta)}
        </a>
      </div>
    </nav>
  );
}
