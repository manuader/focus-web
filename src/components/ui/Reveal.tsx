'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  /** Stagger, in ms — the original used (index % 4) * 70. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/** Convenience `<div>` wrapper around {@link useReveal} for grouped reveals. */
export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const { ref, style: revealStyle } = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={className} style={{ ...revealStyle, ...style }}>
      {children}
    </div>
  );
}
