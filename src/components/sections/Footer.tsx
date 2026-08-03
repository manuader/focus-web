'use client';

import Image from 'next/image';
import { useTranslate } from '@/hooks/useTranslate';
import { NAV_LINKS, CONTACT, COPY } from '@/lib/content';
import styles from './footer.module.css';

export function Footer() {
  const { t } = useTranslate();
  const navLinks = NAV_LINKS.slice(0, 3);

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.brand}>
            <Image src="/assets/focus-logo-light.png" alt="FOCUS" width={457} height={160} />
          </div>
          <div className={styles.address}>
            {CONTACT.address[0]}
            <br />
            {CONTACT.address[1]}
          </div>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <span className={styles.colHead}>{t(COPY.footer.nav)}</span>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={`${styles.link} ${styles.linkNav}`}>
                {t(l.label)}
              </a>
            ))}
          </div>
          <div className={styles.col}>
            <span className={styles.colHead}>Social</span>
            {CONTACT.social.map((s) => (
              <a key={s.label} href={s.href} className={`${styles.link} ${styles.linkSocial}`}>
                {s.label}
              </a>
            ))}
          </div>
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
