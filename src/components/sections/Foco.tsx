'use client';

import { useEffect, useRef } from 'react';
import { usePointer } from '@/context/PointerContext';
import { watchVisibility } from '@/lib/visibility';
import { useTranslate } from '@/hooks/useTranslate';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { COPY } from '@/lib/content';
import styles from './foco.module.css';

/**
 * Attention as a flashlight: the paragraph reads dim until the cursor — a lens
 * with a viewfinder ring — passes over it, revealing the sharp, green-accented
 * version through a clip-path circle. On touch the virtual pointer sweeps the
 * lens across the paragraph on its own, and a finger grabs it. Under reduced
 * motion the paragraph is simply fully lit.
 */
export function Foco() {
  const { t } = useTranslate();
  const { enabled, virtual, subscribe, suppressCursor } = usePointer();
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const releaseRef = useRef<(() => void) | null>(null);

  /** Paint the lens at a point given in the wrap's own coordinates. */
  const paint = (x: number, y: number, radius: number) => {
    if (spotRef.current) {
      spotRef.current.style.clipPath = `circle(${radius}px at ${x.toFixed(0)}px ${y.toFixed(0)}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${x.toFixed(0)}px, ${y.toFixed(0)}px, 0)`;
    }
  };

  // Touch: no hover to open the lens, so it rides the drifting pointer for as
  // long as the paragraph is on screen, and fades out with it.
  useEffect(() => {
    if (!enabled || !virtual) return;
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    const ring = ringRef.current;
    if (ring) ring.style.transition = 'none';
    const clamp = (v: number, lo: number, hi: number) =>
      Math.min(Math.max(v, lo), Math.max(lo, hi));
    // Two rects a frame is the most expensive subscriber; away from the
    // paragraph it should cost nothing at all.
    const seen = watchVisibility(wrap);
    const unsub = subscribe(({ sx, sy }) => {
      if (!seen.visible) return;
      const r = wrap.getBoundingClientRect();
      const tr = text.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 while the paragraph is off screen, 1 once it is comfortably inside.
      const vis = Math.max(
        0,
        Math.min(1, Math.min(tr.bottom - vh * 0.12, vh * 0.9 - tr.top) / 150),
      );
      if (ring) ring.style.opacity = (vis * 0.85).toFixed(3);
      // The drift is viewport-wide; the paragraph is not. Without this the
      // lens spends most of its time on the empty space beside the text.
      const x = clamp(sx, tr.left + 44, tr.right - 44) - r.left;
      const y = clamp(sy, tr.top + 34, tr.bottom - 34) - r.top;
      paint(x, y, vis * 130);
    });
    return () => {
      seen.stop();
      unsub();
    };
  }, [enabled, virtual, subscribe]);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || virtual) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    if (ringRef.current) ringRef.current.style.opacity = '1';
    paint(e.clientX - r.left, e.clientY - r.top, 150);
  };

  const onEnter = () => {
    if (!enabled || virtual) return;
    if (!releaseRef.current) releaseRef.current = suppressCursor();
  };

  const onLeave = () => {
    if (virtual) return;
    if (spotRef.current) spotRef.current.style.clipPath = 'circle(0px at 50% 50%)';
    if (ringRef.current) ringRef.current.style.opacity = '0';
    if (releaseRef.current) {
      releaseRef.current();
      releaseRef.current = null;
    }
  };

  const dim = (
    <>
      {t(COPY.foco.pre)}
      <em className={styles.em}>{t(COPY.foco.em)}</em>
      {t(COPY.foco.post)}
    </>
  );
  const bright = (
    <>
      {t(COPY.foco.pre)}
      <em className={`${styles.em} ${styles.emBright}`}>{t(COPY.foco.em)}</em>
      {t(COPY.foco.post)}
    </>
  );

  return (
    <section
      className={`${styles.foco} foc-cursor-none`}
      aria-label="Foco"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Eyebrow
        section
        line="var(--focus-magenta)"
        color="var(--focus-gray-300)"
        className={styles.eyebrow}
      >
        {t(COPY.foco.eyebrow)}
      </Eyebrow>

      <div ref={wrapRef} className={styles.wrap}>
        <div ref={textRef} className={`${styles.text} ${styles.textDim}`}>
          {dim}
        </div>

        <div
          ref={spotRef}
          className={styles.spot}
          style={enabled ? undefined : { clipPath: 'none' }}
          aria-hidden="true"
        >
          <div className={`${styles.text} ${styles.textBright}`}>{bright}</div>
        </div>

        <div ref={ringRef} className={styles.ring} aria-hidden="true">
          <span className={styles.tickV} style={{ top: -7 }} />
          <span className={styles.tickV} style={{ bottom: -7 }} />
          <span className={styles.tickH} style={{ left: -7 }} />
          <span className={styles.tickH} style={{ right: -7 }} />
        </div>

        <div className={styles.hint}>
          {t(virtual ? COPY.foco.hintTouch : COPY.foco.hint)}
        </div>
      </div>
    </section>
  );
}
