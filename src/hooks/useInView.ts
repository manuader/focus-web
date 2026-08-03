'use client';

import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Fraction of the element visible before it counts as in view. */
  threshold?: number;
  /** Margin around the root — negative bottom triggers slightly early/late. */
  rootMargin?: string;
  /** Stop observing after the first reveal (default true). */
  once?: boolean;
}

/**
 * IntersectionObserver-based visibility — the idiomatic replacement for the
 * original site's manual getBoundingClientRect scroll sweep. Returns a ref to
 * attach and whether the element has entered the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or SSR quirk) → reveal immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
