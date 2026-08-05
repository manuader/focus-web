'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useMagnetic } from '@/hooks/useMagnetic';
import { NAV_LINKS, COPY, CONTACT } from '@/lib/content';
import styles from './chrome.module.css';

export function Nav() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslate();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();

  // React bails out when the boolean is unchanged, so this only re-renders
  // when we actually cross the 60px threshold.
  useWindowScroll(() => setSolid(window.scrollY > 60));

  // Lock body scroll and allow Escape to close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const LangToggle = (
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
  );

  return (
    <>
      <nav className={`${styles.nav} ${solid || open ? styles.navSolid : ''}`}>
        <a href="#top" className={styles.brand} aria-label="FOCUS, inicio" onClick={() => setOpen(false)}>
          <Image
            src="/assets/focus-logo-light.png"
            alt="FOCUS"
            width={457}
            height={160}
            priority
          />
        </a>

        {/* Desktop cluster */}
        <div className={styles.links}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={`${styles.link} ${styles.linksText}`}>
              {t(l.label)}
            </a>
          ))}
          {LangToggle}
          <a ref={ctaRef} href="#contacto" className={styles.navCta}>
            {t(COPY.cta)}
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.burgerBox} aria-hidden="true">
            <span className={`${styles.burgerLine} ${styles.burgerLine1}`} />
            <span className={`${styles.burgerLine} ${styles.burgerLine2}`} />
          </span>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`${styles.menu} ${open ? styles.menuOpen : ''}`} aria-hidden={!open}>
        <div className={styles.menuGlow} aria-hidden="true" />
        <nav className={styles.menuLinks} aria-label="Navegación">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.menuLink}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {t(l.label)}
            </a>
          ))}
        </nav>
        <div className={styles.menuFoot}>
          {LangToggle}
          <a
            href="#contacto"
            className={styles.menuCta}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {t(COPY.cta)}
          </a>
          <a href={`mailto:${CONTACT.email}`} className={styles.menuMail} tabIndex={open ? 0 : -1}>
            {CONTACT.email}
          </a>
        </div>
      </div>
    </>
  );
}
