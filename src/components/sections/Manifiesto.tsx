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
 * A manifesto that literally comes into focus: while the section is pinned, the
 * headline sharpens from blur → crisp as scroll progress crosses it.
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
    <section ref={sectionRef} id="manifiesto" className={styles.manifiesto}>
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
          <div className={styles.label}>01 — {t(COPY.manifiesto.eyebrow)}</div>
          <div className={styles.big}>
            {t(COPY.manifiesto.line1)}
            <br />
            {t(COPY.manifiesto.pre)}
            <em className={styles.em}>{t(COPY.manifiesto.em)}</em>
            {t(COPY.manifiesto.post)}
          </div>
          <div className={styles.sub}>{t(COPY.manifiesto.sub)}</div>
        </div>

        <div className={styles.hint}>{t(COPY.manifiesto.hint)}</div>
      </div>
    </section>
  );
}
