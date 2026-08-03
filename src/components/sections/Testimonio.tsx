'use client';

import { useTranslate } from '@/hooks/useTranslate';
import { Reveal } from '@/components/ui/Reveal';
import { RingsMotif } from '@/components/ui/RingsMotif';
import { COPY } from '@/lib/content';
import styles from './testimonio.module.css';

/** A single client quote, centered over a slow concentric-rings backdrop. */
export function Testimonio() {
  const { t } = useTranslate();

  return (
    <section className={styles.testimonio} aria-label="Testimonio">
      <div className={styles.ringsWrap} aria-hidden="true">
        <RingsMotif radii={[90, 170, 260, 350]} strokeWidth={1} className={styles.rings} />
      </div>

      <div className={styles.inner}>
        <Reveal className={styles.eyebrow}>10 — {t(COPY.testimonio.eyebrow)}</Reveal>
        <Reveal>
          <blockquote className={styles.quote}>{t(COPY.testimonio.quote)}</blockquote>
        </Reveal>
        <Reveal className={styles.author}>
          Valentina Ríos · <span className={styles.role}>{COPY.testimonio.role}</span>
        </Reveal>
      </div>
    </section>
  );
}
