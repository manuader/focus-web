'use client';

import { useEffect, useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { COPY, UMBRAL_FILM } from '@/lib/content';
import styles from './umbral.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * "What looks like a door turns out to be a world." As the pinned section is
 * scrolled, a thin slit widens (clip-path) into a full-bleed film while the
 * center text dissolves — the threshold opening.
 *
 * The film only runs while the section is near the screen; with reduced
 * motion it stays on its first frame.
 */
export function Umbral() {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const edgesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLVideoElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const film = filmRef.current;
    if (!section || !film) return;
    if (reduce) {
      film.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          film.preload = 'auto';
          film.play().catch(() => {});
        } else film.pause();
      },
      { rootMargin: '50% 0px' },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reduce]);

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
    // The shade behind the words leaves with them: the open door is all film.
    const words = String(1 - Math.max(0, (e - 0.75) * 4));
    if (textRef.current) textRef.current.style.opacity = words;
    if (scrimRef.current) scrimRef.current.style.opacity = words;
  });

  return (
    <section ref={sectionRef} className={styles.umbral} aria-label={t(COPY.a11y.umbral)}>
      <div className={styles.sticky}>
        <div ref={doorRef} className={styles.door} aria-hidden="true">
          <video
            ref={filmRef}
            className={styles.doorImg}
            src={UMBRAL_FILM.src}
            poster={UMBRAL_FILM.poster}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            tabIndex={-1}
          />
          <div className={styles.doorShade} />
        </div>
        <div ref={edgesRef} className={styles.edges} aria-hidden="true" />
        <div ref={scrimRef} className={styles.scrim} aria-hidden="true" />

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
