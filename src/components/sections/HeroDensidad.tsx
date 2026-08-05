'use client';

import Image from 'next/image';
import { useTranslate } from '@/hooks/useTranslate';
import { Marquee } from '@/components/ui/Marquee';
import { COPY } from '@/lib/content';
import styles from './hero.module.css';

/** Hero direction C — "Densidad": stacked marquees with a sharp lens at center. */
export function HeroDensidad() {
  const { t } = useTranslate();

  return (
    <section
      id="top"
      className={`${styles.hero} ${styles.heroC}`}
      aria-label="FOCUS. Mirar no alcanza"
    >
      <Image src="/assets/img-06.jpg" alt="" fill sizes="100vw" className={styles.cBg} />

      <Marquee
        duration={26}
        className={`${styles.cRow} ${styles.cRowBig}`}
        groupClassName={styles.cGroup}
        ariaLabel={t(COPY.hero.c.m1)}
      >
        <span>{t(COPY.hero.c.m1)}</span>
        <span style={{ color: 'var(--focus-magenta)' }}>{t(COPY.hero.c.m1)}</span>
        <span>{t(COPY.hero.c.m1)}</span>
      </Marquee>

      <Marquee
        duration={32}
        reverse
        className={`${styles.cRow} ${styles.cRowItalic}`}
        groupClassName={styles.cGroup}
        ariaLabel={t(COPY.hero.c.m2)}
      >
        <span>{t(COPY.hero.c.m2)}</span>
        <span style={{ color: 'var(--focus-blue)' }}>{t(COPY.hero.c.m2)}</span>
        <span>{t(COPY.hero.c.m2)}</span>
      </Marquee>

      <Marquee
        duration={22}
        className={`${styles.cRow} ${styles.cRowBig}`}
        groupClassName={styles.cGroup}
        ariaLabel={`${t(COPY.hero.c.m3a)} ${t(COPY.hero.c.m3b)}`}
      >
        <span>{t(COPY.hero.c.m3a)}</span>
        <span style={{ color: 'var(--focus-green)' }}>{t(COPY.hero.c.m3b)}</span>
      </Marquee>

      <div className={styles.cLens} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/img-06.jpg" alt="" className={styles.cLensImg} />
      </div>

      <div className={styles.cFooter}>
        <p className={styles.cPara}>{t(COPY.hero.c.para)}</p>
        <span className={styles.cLabel}>Densidad · el umbral · 2026</span>
      </div>
    </section>
  );
}
