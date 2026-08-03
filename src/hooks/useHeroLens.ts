'use client';

import { useEffect, useRef } from 'react';
import { usePointer } from '@/context/PointerContext';

/**
 * The hero "lens": a circular magnifier that follows the smoothed pointer,
 * revealing a sharp, saturated crop of the same background image (which is
 * blurred underneath). Shows on hover, hides the global cursor ring while
 * active. Returns refs to wire onto the section, the lens, and its inner image.
 */
export function useHeroLens() {
  const { enabled, subscribe, suppressCursor } = usePointer();
  const sectionRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const lens = lensRef.current;
    const img = lensImgRef.current;
    if (!section || !lens || !img) return;

    let release: (() => void) | null = null;
    const enter = () => {
      lens.style.opacity = '1';
      if (!release) release = suppressCursor();
    };
    const leave = () => {
      lens.style.opacity = '0';
      if (release) {
        release();
        release = null;
      }
    };
    section.addEventListener('mouseenter', enter);
    section.addEventListener('mouseleave', leave);

    const unsub = subscribe(({ sx, sy }) => {
      const r = section.getBoundingClientRect();
      const half = lens.offsetWidth / 2;
      const ox = sx - r.left - half;
      const oy = sy - r.top - half;
      lens.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0)`;
      img.style.transform = `translate3d(${(-ox).toFixed(1)}px, ${(-oy).toFixed(1)}px, 0)`;
    });

    return () => {
      section.removeEventListener('mouseenter', enter);
      section.removeEventListener('mouseleave', leave);
      unsub();
      if (release) release();
    };
  }, [enabled, subscribe, suppressCursor]);

  return { sectionRef, lensRef, lensImgRef };
}
