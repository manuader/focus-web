'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './preloader.module.css';

/** Keep in step with the keyframe delays in preloader.module.css. */
const TOTAL_MS = 3400;

/**
 * Opening sequence: the aperture "C" of the wordmark spins in on its own,
 * settles into the middle of the word, the remaining letters resolve out of
 * blur around it, and the assembled logo flies up to the header.
 *
 * The whole sequence is CSS keyframes, so it still finishes if the JS never
 * runs: the overlay's own fade-out carries `forwards`, and it drops
 * pointer-events, meaning a hydration failure cannot leave the site behind a
 * dead screen. JS only measures where the header logo sits, locks the scroll
 * while it plays, and unmounts at the end.
 *
 * The page is server-rendered underneath the whole time, so crawlers and
 * generative engines never see the overlay: it is aria-hidden and covers
 * markup that is already complete.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Under reduced motion CSS already hides the overlay; skip the sequence
    // so nothing is locked or delayed.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      return;
    }

    // Lock first, measure second. The lock can only change layout on
    // platforms with classic scrollbars, and `scrollbar-gutter: stable` in
    // globals.css keeps it from doing so, but measuring against the state
    // the animation actually plays in costs nothing.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // `instant` matters: html carries scroll-behavior: smooth, so a plain
    // scrollTo would animate the page down behind the overlay.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const root = rootRef.current;
    const logo = logoRef.current;
    const target = document.querySelector<HTMLElement>('[data-nav-logo]');

    // Map the big centred logo onto the header logo. transform-origin is the
    // top-left corner, so a translate plus a scale lands one rect on the
    // other exactly, at whatever size the header happens to be.
    if (root && logo && target) {
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      if (from.width > 0 && to.width > 0) {
        root.style.setProperty('--fly-x', `${(to.left - from.left).toFixed(1)}px`);
        root.style.setProperty('--fly-y', `${(to.top - from.top).toFixed(1)}px`);
        root.style.setProperty('--fly-s', (to.width / from.width).toFixed(4));
      }
    }

    const t = window.setTimeout(() => setDone(true), TOTAL_MS);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  // Belt and braces: if the timeout is ever missed, releasing the scroll on
  // unmount above still runs, and this restores it the moment we finish.
  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (done) return null;

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.stage}>
        <div ref={logoRef} className={styles.logo}>
          {/* The wordmark, minus the C, in two groups so they resolve from
              opposite sides. Both are the same PNG under a mask. */}
          <span className={`${styles.part} ${styles.left}`} />
          <span className={`${styles.part} ${styles.right}`} />

          {/* The aperture C. The window is the glyph's measured box and the
              PNG is offset inside it, so this is the real artwork, never a
              redrawn one. */}
          <span className={styles.cBox}>
            <span className={styles.cInk} />
          </span>
        </div>
      </div>
    </div>
  );
}
