'use client';

import { useEffect, useRef } from 'react';
import { usePointer } from '@/context/PointerContext';
import { useTranslate } from '@/hooks/useTranslate';
import { COPY } from '@/lib/content';
import styles from './superposicion.module.css';

/**
 * Two overlapping circles in `difference` blend: one orbits on its own, the
 * other trails the cursor. A new color is born only where they cross —
 * the brand's "superposición" idea made interactive.
 */
export function Superposicion() {
  const { t } = useTranslate();
  const { enabled, subscribe } = usePointer();
  const sectionRef = useRef<HTMLElement>(null);
  const followRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const follow = followRef.current;
    if (!section || !follow) return;

    // Independent, slower easing than the shared smoothing (0.07 vs 0.12).
    // The circle is centered via CSS; the transform offsets it from center.
    let sx = 0;
    let sy = 0;
    let started = false;
    return subscribe(({ x, y }) => {
      const r = section.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      const cx = x - r.left;
      const cy = y - r.top;
      if (!started) {
        sx = cx;
        sy = cy;
        started = true;
      } else {
        sx += (cx - sx) * 0.07;
        sy += (cy - sy) * 0.07;
      }
      follow.style.transform = `translate3d(${(sx - r.width / 2).toFixed(1)}px, ${(sy - r.height / 2).toFixed(1)}px, 0)`;
    });
  }, [enabled, subscribe]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sup} foc-cursor-none`}
      aria-label="Superposición"
    >
      <div className={styles.orbit} aria-hidden="true" />
      <div ref={followRef} className={styles.follow} aria-hidden="true" />

      <div className={styles.text}>
        <div className={styles.eyebrow}>{t(COPY.queEsFocus.eyebrow)}</div>
        <div className={styles.title}>
          {t(COPY.superposicion.title1)}
          <br />
          <span className={styles.titleAlt}>{t(COPY.superposicion.title2)}</span>
        </div>
        <div className={styles.hint}>{t(COPY.superposicion.hint)}</div>
      </div>
    </section>
  );
}
