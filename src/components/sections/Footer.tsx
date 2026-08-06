'use client';

import { useTranslate } from '@/hooks/useTranslate';
import { NAV_LINKS, CONTACT, COPY } from '@/lib/content';
import styles from './footer.module.css';

export function Footer() {
  const { t } = useTranslate();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Wordmark lockup: the mark carries "FOCUS", the line under it
            completes the name.

            Plain <picture> rather than next/image: the optimiser re-encodes,
            and an animated WebP does not survive that. The first source wins,
            so anyone asking for less motion gets the still logo instead of a
            loop that never stops. */}
        <div className={styles.brand}>
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet="/assets/focus-logo-still.webp"
              type="image/webp"
            />
            <source srcSet="/assets/focus-logo-anim.webp" type="image/webp" />
            <img
              className={styles.brandMark}
              src="/assets/focus-logo-light.png"
              alt="FOCUS creatives"
              width={280}
              height={86}
            />
          </picture>
          <span className={styles.brandSub} aria-hidden="true">
            {COPY.footer.brandSub}
          </span>
        </div>

        {/* The links run as a horizontal band so the column sits at the
            logo's height instead of towering over it. */}
        <nav className={styles.col} aria-label={t(COPY.footer.nav)}>
          <span className={styles.colHead}>{t(COPY.footer.nav)}</span>
          <div className={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={`${styles.link} ${styles.linkNav}`}>
                {t(l.label)}
              </a>
            ))}
          </div>
        </nav>

        <div className={styles.col}>
          <span className={styles.colHead}>{t(COPY.footer.contacto)}</span>
          <a
            href={`mailto:${CONTACT.email}`}
            className={`${styles.link} ${styles.linkMail}`}
          >
            {CONTACT.email}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 FOCUS</span>
        <span>{COPY.tagline}</span>
        <span>{t(COPY.footer.made)}</span>
      </div>
    </footer>
  );
}
