'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { COPY } from '@/lib/content';
import styles from './umbral.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * "What looks like a door turns out to be a world." As the pinned section is
 * scrolled, a thin slit widens (clip-path) into a full-bleed image while the
 * center text dissolves — the threshold opening.
 */
export function Umbral() {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const edgesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useWindowScroll(() => {
    const section = sectionRef.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const p = clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
    const e = 1 - Math.pow(1 - p, 3);
    const side = `${(49.6 * (1 - e)).toFixed(2)}%`;
    const vert = `${(14 * (1 - e)).toFixed(2)}%`;

    if (doorRef.current) {
      doorRef.current.style.clipPath = `inset(${vert} ${side} ${vert} ${side})`;
    }
    if (edgesRef.current) {
      const edges = edgesRef.current;
      edges.style.left = side;
      edges.style.right = side;
      edges.style.top = vert;
      edges.style.bottom = vert;
      edges.style.opacity = String(1 - e * 0.85);
    }
    if (textRef.current) {
      textRef.current.style.opacity = String(1 - Math.max(0, (e - 0.75) * 4));
    }
  });

  return (
    <section ref={sectionRef} className={styles.umbral} aria-label="Umbral">
      <div className={styles.sticky}>
        <div ref={doorRef} className={styles.door} aria-hidden="true">
          <Image src="/assets/img-06.jpg" alt="" fill sizes="100vw" className={styles.doorImg} />
          <div className={styles.doorShade} />
        </div>
        <div ref={edgesRef} className={styles.edges} aria-hidden="true" />

        <div ref={textRef} className={styles.text}>
          <h2 className={styles.title}>
            {t(COPY.umbral.line1)}
            <br />
            <span className={styles.titleAlt}>{t(COPY.umbral.line2)}</span>
          </h2>
        </div>

        <div className={styles.hint}>{t(COPY.umbral.hint)}</div>
      </div>
    </section>
  );
}
