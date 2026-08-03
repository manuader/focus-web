'use client';

import { useEffect, useRef, useState } from 'react';
import { usePointer } from '@/context/PointerContext';
import styles from './chrome.module.css';

/**
 * The lens-like cursor ring. Follows the raw pointer immediately, grows over
 * interactive elements, and hides itself when a section (hero lens, foco
 * spotlight) requests to take over via {@link usePointer}'s suppression.
 */
export function CursorRing() {
  const { enabled, subscribe, onSuppressChange } = usePointer();
  const ref = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const suppressed = useRef(false);
  const [grown, setGrown] = useState(false);

  // Follow the pointer (raw coords) and reveal on first movement.
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    return subscribe(({ x, y }) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!moved.current) {
        moved.current = true;
        if (!suppressed.current) el.style.opacity = '1';
      }
    });
  }, [enabled, subscribe]);

  // Hide / show when a takeover zone is entered or left.
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    return onSuppressChange((isSuppressed) => {
      suppressed.current = isSuppressed;
      el.style.opacity = isSuppressed || !moved.current ? '0' : '1';
    });
  }, [enabled, onSuppressChange]);

  // Grow over links and buttons (event delegation covers all of them).
  useEffect(() => {
    if (!enabled) return;
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('a, button');
    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) setGrown(true);
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target)) setGrown(false);
    };
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`${styles.cursor} ${grown ? styles.cursorGrow : ''}`}
    />
  );
}
