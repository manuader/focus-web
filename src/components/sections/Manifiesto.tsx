'use client';

import { useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { RingsMotif } from '@/components/ui/RingsMotif';
import { COPY } from '@/lib/content';
import styles from './manifiesto.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * "Sobre nosotros": a statement that literally comes into focus. While the
 * section is pinned, the headline sharpens from blur to crisp as scroll
 * progress crosses it.
 */
export function Manifiesto() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useWindowScroll(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;
    const r = section.getBoundingClientRect();
    const p = clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
    const k = Math.min(1, p / 0.65);
    text.style.filter = `blur(${((1 - k) * 14).toFixed(2)}px)`;
    text.style.opacity = (0.25 + 0.75 * k).toFixed(3);
    text.style.transform = `scale(${(0.94 + 0.06 * k).toFixed(4)})`;
  });

  return (
    <section ref={sectionRef} id="nosotros" className={styles.manifiesto}>
      <div className={styles.sticky}>
        <div className={styles.ringsWrap} aria-hidden="true">
          <RingsMotif radii={[90, 170, 260, 350]} strokeWidth={1} className={styles.rings} />
        </div>

        <div
          ref={textRef}
          className={styles.text}
          style={
            reduce
              ? undefined
              : { filter: 'blur(14px)', opacity: 0.25, transform: 'scale(0.94)' }
          }
        >
          <div className={styles.label}>{t(COPY.nosotros.eyebrow)}</div>
          <h2 className={styles.big}>
            {t(COPY.nosotros.line1)}
            <br />
            {t(COPY.nosotros.pre)}
            <em className={styles.em}>{t(COPY.nosotros.em)}</em>
            {t(COPY.nosotros.post)}
          </h2>
          <div className={styles.sub}>{t(COPY.nosotros.sub)}</div>
        </div>

        <div className={styles.hint}>{t(COPY.nosotros.hint)}</div>
      </div>
    </section>
  );
}
