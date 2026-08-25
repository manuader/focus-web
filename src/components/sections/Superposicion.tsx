'use client';

import { useEffect, useRef } from 'react';
import { usePointer } from '@/context/PointerContext';
import { watchVisibility } from '@/lib/visibility';
import { useTranslate } from '@/hooks/useTranslate';
import { COPY } from '@/lib/content';
import styles from './superposicion.module.css';

/**
 * Two overlapping circles in `difference` blend: one orbits on its own, the
 * other trails the cursor. A new color is born only where they cross —
 * the brand's "superposición" idea made interactive. On touch the second
 * circle trails the drifting virtual pointer, and a finger steers it.
 */
export function Superposicion() {
  const { t } = useTranslate();
  const { enabled, virtual, subscribe } = usePointer();
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
    // Off screen, the loop would still measure this section on every frame.
    const seen = watchVisibility(section);
    const unsub = subscribe(({ x, y }) => {
      if (!seen.visible) return;
      const r = section.getBoundingClientRect();
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
    return () => {
      seen.stop();
      unsub();
    };
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
        <h2 className={styles.title}>
          {t(COPY.superposicion.title1)}
          <br />
          <span className={styles.titleAlt}>{t(COPY.superposicion.title2)}</span>
        </h2>
      </div>

      {/* Outside .text on purpose: in there it inherited the difference
          blend and landed on the magenta circle, where it was unreadable.
          Down here it sits on clean black. */}
      <div className={styles.hint}>
        {t(virtual ? COPY.superposicion.hintTouch : COPY.superposicion.hint)}
      </div>
    </section>
  );
}
