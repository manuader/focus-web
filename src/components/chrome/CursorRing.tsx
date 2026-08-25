'use client';

import { useEffect, useRef, useState } from 'react';
import { usePointer } from '@/context/PointerContext';
import styles from './chrome.module.css';

/**
 * The lens-like cursor ring. Follows the raw pointer immediately, grows over
 * interactive elements, and hides itself when a section (hero lens, foco
 * spotlight) requests to take over via {@link usePointer}'s suppression.
 *
 * Strictly a real-cursor object: on touch the pointer is synthesised, and a
 * ring drifting around on its own would read as a bug rather than a cursor.
 */
export function CursorRing() {
  const { enabled, virtual, subscribe, onSuppressChange } = usePointer();
  const ref = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const suppressed = useRef(false);
  const [grown, setGrown] = useState(false);
  const live = enabled && !virtual;

  // Follow the pointer (raw coords) and reveal on first movement.
  useEffect(() => {
    if (!live) return;
    const el = ref.current;
    if (!el) return;
    return subscribe(({ x, y }) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!moved.current) {
        moved.current = true;
        if (!suppressed.current) el.style.opacity = '1';
      }
    });
  }, [live, subscribe]);

  // Hide / show when a takeover zone is entered or left.
  useEffect(() => {
    if (!live) return;
    const el = ref.current;
    if (!el) return;
    return onSuppressChange((isSuppressed) => {
      suppressed.current = isSuppressed;
      el.style.opacity = isSuppressed || !moved.current ? '0' : '1';
    });
  }, [live, onSuppressChange]);

  // Grow over links and buttons (event delegation covers all of them).
  useEffect(() => {
    if (!live) return;
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
  }, [live]);

  if (!live) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`${styles.cursor} ${grown ? styles.cursorGrow : ''}`}
    />
  );
}
