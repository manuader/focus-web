'use client';

import { useTranslate } from '@/hooks/useTranslate';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import styles from './servicios.module.css';

/** The services list. Rows nudge and recolor on hover, in CSS alone. */
export function Servicios() {
  const { t } = useTranslate();
  const title = useReveal<HTMLHeadingElement>(70);

  return (
    <section className={styles.servicios} id="servicios" aria-label="Servicios">
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

        <div className={styles.list}>
          {SERVICES.map((s) => (
            <a key={s.n} href="#contacto" className={styles.row}>
              <span className={styles.rowNum}>{s.n}</span>
              <span className={styles.rowTitle}>{t(s.title)}</span>
              <span className={styles.rowDetail}>{t(s.detail)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
