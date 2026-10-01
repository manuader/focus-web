'use client';

import { useCallback, useRef, type CSSProperties } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import { SPECTRUM } from './spectrum';
import { PrismaCompacto } from './PrismaCompacto';
import styles from './servicios.module.css';

/**
 * The service layout immediately before the current full-screen prism:
 * seven coloured editorial bands feeding a prism on the right. The former
 * SVG prism is replaced by the current 3D canvas, and the whole composition
 * now plays on entry instead of holding the page for several viewports.
 */
export function Servicios() {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const bandRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  /** The canvas is the source of truth: every band follows its actual ray. */
  const syncBands = useCallback((rays: readonly number[]) => {
    rays.forEach((progress, index) => {
      const band = bandRefs.current[index];
      if (!band) return;
      // The service resolves first; its scope follows as a second beat once
      // the ray has already made the title legible.
      const detailProgress = Math.max(0, Math.min(1, (progress - 0.42) / 0.34));
      band.style.setProperty('--band-opacity', (0.22 + progress * 0.78).toFixed(4));
      band.style.setProperty('--band-scale', (0.1 + progress * 0.9).toFixed(4));
      band.style.setProperty('--band-saturation', (0.7 + progress * 0.6).toFixed(3));
      band.style.setProperty('--band-glow', `${(progress * 11).toFixed(2)}px`);
      band.style.setProperty('--detail-progress', detailProgress.toFixed(4));
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.prisma}
      id="servicios"
      aria-label={t(COPY.a11y.servicios)}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Reveal className={styles.eyebrow}>
              <Eyebrow section line="var(--focus-blue)" color="var(--focus-gray-300)">
                {t(COPY.servicios.eyebrow)}
              </Eyebrow>
            </Reveal>
            <h2 className={styles.title}>{t(COPY.servicios.title)}</h2>
          </div>
          <p className={styles.intro}>{t(COPY.servicios.intro)}</p>
        </div>

        <div className={styles.stage}>
          <div className={styles.bands}>
            {SERVICES.map((service, index) => (
              <a
                key={service.n}
                ref={(element) => {
                  bandRefs.current[index] = element;
                }}
                href="#contacto"
                className={styles.band}
                style={{
                  '--c': SPECTRUM[index],
                  '--band-opacity': 0.22,
                  '--band-scale': 0.1,
                  '--band-saturation': 0.7,
                  '--band-glow': '0px',
                  '--detail-progress': 0,
                } as CSSProperties}
              >
                <span className={styles.bandFill} aria-hidden="true" />
                <span className={styles.bandRow}>
                  <span className={styles.bandNum} aria-hidden="true">
                    {service.n}
                  </span>
                  <h3 className={styles.bandTitle}>{t(service.title)}</h3>
                  <span className={styles.bandDetail}>{t(service.detail)}</span>
                </span>
              </a>
            ))}
          </div>

          <div className={styles.bench}>
            <PrismaCompacto
              sectionRef={sectionRef}
              bandRefs={bandRefs}
              onRays={syncBands}
            />
          </div>
        </div>

        <div className={styles.foot} aria-hidden="true">
          <span>7 {t({ es: 'disciplinas', en: 'disciplines' })}</span>
          <span>
            1 {t({ es: 'marca', en: 'brand' })} <b>→</b>
          </span>
        </div>
      </div>
    </section>
  );
}
