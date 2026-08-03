'use client';

import { useRef } from 'react';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import styles from './chrome.module.css';

/** Top-of-page RGB progress bar tracking overall scroll depth. */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useWindowScroll(() => {
    const el = ref.current;
    if (!el) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const p = total > 0 ? window.scrollY / total : 0;
    el.style.width = `${(Math.max(0, Math.min(1, p)) * 100).toFixed(2)}%`;
  });

  return <div ref={ref} className={styles.progress} aria-hidden="true" />;
}
