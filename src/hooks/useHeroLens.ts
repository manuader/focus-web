'use client';

import { useEffect, useRef } from 'react';
import { usePointer } from '@/context/PointerContext';

/**
 * The hero "lens": a circular magnifier that follows the smoothed pointer,
 * revealing a sharp, saturated crop of the same background image (which is
 * blurred underneath). Shows on hover, hides the global cursor ring while
 * active. Returns refs to wire onto the section, the lens, and its inner image.
 *
 * On touch there is nothing to hover, so the lens simply lives while the hero
 * is on screen and rides the drifting virtual pointer — the first thing a
 * phone visitor sees is the image being read, not a flat blurred plate.
 */
export function useHeroLens() {
  const { enabled, virtual, subscribe, suppressCursor } = usePointer();
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
    let detach: (() => void) | undefined;
    if (virtual) {
      // Opacity is written every frame below; the CSS fade would turn that
      // into a transition that restarts 60 times a second and never lands.
      lens.style.transition = 'none';
    } else {
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
      detach = () => {
        section.removeEventListener('mouseenter', enter);
        section.removeEventListener('mouseleave', leave);
      };
    }

    const unsub = subscribe(({ sx, sy }) => {
      const r = section.getBoundingClientRect();
      const half = lens.offsetWidth / 2;
      const ox = sx - r.left - half;
      const oy = sy - r.top - half;
      lens.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0)`;
      img.style.transform = `translate3d(${(-ox).toFixed(1)}px, ${(-oy).toFixed(1)}px, 0)`;
      if (virtual) {
        // No hover to open and close it, so the hero leaving the screen does.
        const vis = Math.max(0, Math.min(1, (r.bottom - 140) / 320));
        lens.style.opacity = vis.toFixed(3);
      }
    });

    return () => {
      detach?.();
      unsub();
      if (release) release();
    };
  }, [enabled, virtual, subscribe, suppressCursor]);

  return { sectionRef, lensRef, lensImgRef };
}
