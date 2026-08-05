'use client';

import Image from 'next/image';
import { useTranslate } from '@/hooks/useTranslate';
import { RingsMotif } from '@/components/ui/RingsMotif';
import { COPY } from '@/lib/content';
import styles from './hero.module.css';

/** Hero direction B — "Pasaje": a split screen with FOCUS crossing the seam. */
export function HeroPasaje() {
  const { t } = useTranslate();

  return (
    <section id="top" className={`${styles.hero} ${styles.heroB}`} aria-label="FOCUS">
      <div className={styles.bLeft}>
        <div className={styles.bEyebrow}>{t(COPY.hero.b.eyebrow)}</div>
        <h1 className={styles.bHeadline}>
          <span>{t(COPY.hero.b.line1)}</span>
          <span className={styles.bHeadlineAlt}>{t(COPY.hero.b.line2)}</span>
        </h1>
        <p className={styles.bPara}>{t(COPY.hero.b.para)}</p>
        <RingsMotif
          radii={[120, 220, 320, 390]}
          strokeWidth={1.2}
          className={styles.bRings}
        />
      </div>

      <div className={styles.bRight}>
        <Image src="/assets/img-02.jpg" alt="" fill sizes="50vw" className={styles.bImg} />
        <div className={styles.bImgFade} />
        <div className={styles.bSeam} />
      </div>

      <div className={styles.bWord} aria-hidden="true">
        FOCUS
      </div>

      <div className={`${styles.metaBar} ${styles.bMeta}`}>
        <span>{t(COPY.hero.scroll)}</span>
        <span>Buenos Aires · 2026</span>
      </div>
    </section>
  );
}
