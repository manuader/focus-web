'use client';

import { useRef, type CSSProperties } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Prisma } from './Prisma';
import { stops } from './prismScene';
import { useScrollSteps } from './useScrollSteps';
import styles from './servicios.module.css';

/**
 * Services as an inverted prism: the spectrum goes in, one white beam comes
 * out. Each service is one ray of colour; all seven together make the white
 * beam that is the client's brand.
 *
 * Scroll-scrubbed: a tall section with a sticky 100vh stage. The heading
 * sits on top; the scene (the prism, the rays, the caption and the names
 * flying into their rays) is Prisma, the same one on every screen size,
 * laid out for the width it gets.
 *
 * The scroll stops briefly on every service so they arrive one by one: the
 * wheel steps through them (useScrollSteps), and touch snaps to the same
 * points (the markers below).
 */
const STOPS = stops(SERVICES.length);

export function Servicios() {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollSteps(sectionRef, STOPS, useReducedMotion());

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className={styles.prisma}
      aria-label={t(COPY.a11y.servicios)}
    >
      {STOPS.map((at) => (
        <span
          key={at}
          className={styles.stop}
          style={{ '--at': at } as CSSProperties}
          aria-hidden="true"
        />
      ))}
      <div className={styles.sticky}>
        <div ref={headerRef} className={styles.header}>
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

        <Prisma sectionRef={sectionRef} headerRef={headerRef} />
      </div>
    </section>
  );
}
