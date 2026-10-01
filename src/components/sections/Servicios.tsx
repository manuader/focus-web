'use client';

import type { CSSProperties } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useInView } from '@/hooks/useInView';
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
  const [stageRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className={styles.prisma} id="servicios" aria-label={t(COPY.a11y.servicios)}>
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

        <div ref={stageRef} className={styles.stage} data-visible={inView ? '1' : '0'}>
          <div className={styles.bands}>
            {SERVICES.map((service, index) => (
              <a
                key={service.n}
                href="#contacto"
                className={styles.band}
                style={{
                  '--c': SPECTRUM[index],
                  '--i': index,
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
            <PrismaCompacto />
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
