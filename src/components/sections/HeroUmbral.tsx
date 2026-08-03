'use client';

import Image from 'next/image';
import { useTranslate } from '@/hooks/useTranslate';
import { useHeroLens } from '@/hooks/useHeroLens';
import { useChromaticFlicker } from '@/hooks/useChromaticFlicker';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { RingsMotif } from '@/components/ui/RingsMotif';
import { COPY } from '@/lib/content';
import styles from './hero.module.css';
import ui from '@/components/ui/ui.module.css';

/** Hero direction A — "Umbral": blurred field + a magnifying lens on the cursor. */
export function HeroUmbral() {
  const { t } = useTranslate();
  const { sectionRef, lensRef, lensImgRef } = useHeroLens();
  const headlineRef = useChromaticFlicker<HTMLHeadingElement>();

  return (
    <section
      ref={sectionRef}
      id="top"
      className={`${styles.hero} foc-cursor-none`}
      aria-label="FOCUS"
    >
      <Image
        src="/assets/img-01.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.aBg}
      />

      <div ref={lensRef} className={styles.lens} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={lensImgRef}
          src="/assets/img-01.jpg"
          alt=""
          className={styles.lensImg}
        />
        <div className={styles.lensShade} />
      </div>

      <RingsMotif
        radii={[80, 150, 230, 310, 390]}
        strokeWidth={1.2}
        className={styles.aRings}
      />
      <div className={styles.aFade} />

      <div className={styles.aContent}>
        <div className={styles.aCol1}>
          <Eyebrow dot gap={12} color="var(--focus-gray-300)" style={{ marginBottom: 34 }}>
            {t(COPY.hero.eyebrow)}
          </Eyebrow>
          <h1 ref={headlineRef} className={styles.aHeadline}>
            <span>{t(COPY.hero.a.line1)}</span>
            <span className={styles.aHeadlineAlt}>{t(COPY.hero.a.line2)}</span>
          </h1>
        </div>

        <div className={styles.aCol2}>
          <p className={styles.aPara}>{t(COPY.hero.a.para)}</p>
          <MagneticLink
            href="#trabajo"
            className={`${ui.btn} ${ui.btnGhost}`}
            style={{
              padding: '15px 26px',
              fontSize: 11,
              letterSpacing: '0.22em',
            }}
          >
            {t(COPY.hero.a.cta)}
            <span className={ui.btnLine} />
          </MagneticLink>
        </div>
      </div>

      <div className={`${styles.metaBar} ${styles.aMeta}`}>
        <span>El umbral · 2026</span>
        <span>{t(COPY.hero.scroll)}</span>
        <span>N 34°36&apos; / W 58°22&apos;</span>
      </div>
    </section>
  );
}
