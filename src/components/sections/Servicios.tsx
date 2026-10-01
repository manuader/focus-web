'use client';

import { useTranslate } from '@/hooks/useTranslate';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import { PrismaCompacto } from './PrismaCompacto';
import styles from './servicios.module.css';

/**
 * The original editorial services list, with the current prism kept as a
 * compact visual statement. The prism plays once on entry instead of holding
 * the page for a multi-screen, scroll-scrubbed sequence.
 */
export function Servicios() {
  const { t } = useTranslate();
  const title = useReveal<HTMLHeadingElement>(70);

  return (
    <section className={styles.servicios} id="servicios" aria-label={t(COPY.a11y.servicios)}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Reveal className={styles.eyebrow}>
              <Eyebrow section line="var(--focus-blue)" color="var(--focus-gray-700)">
                {t(COPY.servicios.eyebrow)}
              </Eyebrow>
            </Reveal>
            <h2 ref={title.ref} className={styles.title} style={title.style}>
              {t(COPY.servicios.title)}
            </h2>
          </div>
          <Reveal>
            <p className={styles.intro}>{t(COPY.servicios.intro)}</p>
          </Reveal>
        </div>

        <PrismaCompacto />

        <div className={styles.list}>
          {SERVICES.map((service) => (
            <a key={service.n} href="#contacto" className={styles.row}>
              <span className={styles.rowNum}>{service.n}</span>
              <h3 className={styles.rowTitle}>{t(service.title)}</h3>
              <span className={styles.rowDetail}>{t(service.detail)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
