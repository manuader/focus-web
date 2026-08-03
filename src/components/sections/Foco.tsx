'use client';

import { useRef } from 'react';
import { usePointer } from '@/context/PointerContext';
import { useTranslate } from '@/hooks/useTranslate';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { COPY } from '@/lib/content';
import styles from './foco.module.css';

/**
 * Attention as a flashlight: the paragraph reads dim until the cursor — a lens
 * with a viewfinder ring — passes over it, revealing the sharp, green-accented
 * version through a clip-path circle. On touch / reduced motion it's fully lit.
 */
export function Foco() {
  const { t } = useTranslate();
  const { enabled, suppressCursor } = usePointer();
  const wrapRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const releaseRef = useRef<(() => void) | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (spotRef.current) {
      spotRef.current.style.clipPath = `circle(150px at ${x.toFixed(0)}px ${y.toFixed(0)}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.opacity = '1';
      ringRef.current.style.transform = `translate3d(${x.toFixed(0)}px, ${y.toFixed(0)}px, 0)`;
    }
  };

  const onEnter = () => {
    if (!enabled) return;
    if (!releaseRef.current) releaseRef.current = suppressCursor();
  };

  const onLeave = () => {
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
      <Eyebrow line="var(--focus-magenta)" className={styles.eyebrow}>
        09 — Foco
      </Eyebrow>

      <div ref={wrapRef} className={styles.wrap}>
        <div className={`${styles.text} ${styles.textDim}`}>{dim}</div>

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

        <div className={styles.hint}>{t(COPY.foco.hint)}</div>
      </div>
    </section>
  );
}
