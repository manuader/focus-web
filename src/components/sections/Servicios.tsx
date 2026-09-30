'use client';

import { useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { COPY } from '@/lib/content';
import { Prisma } from './Prisma';
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
 */
export function Servicios() {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className={styles.prisma}
      aria-label={t(COPY.a11y.servicios)}
    >
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
