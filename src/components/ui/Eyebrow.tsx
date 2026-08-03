import type { CSSProperties, ReactNode } from 'react';
import styles from './ui.module.css';

interface EyebrowProps {
  children: ReactNode;
  /** Accent color for the leading rule (omit for no rule). */
  line?: string;
  /** Show the blinking green status dot instead of a rule. */
  dot?: boolean;
  color?: string;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The recurring numbered section label ("06 — Servicios"), optionally prefixed
 * with a colored rule or the blinking live dot.
 */
export function Eyebrow({
  children,
  line,
  dot,
  color = 'var(--focus-gray-500)',
  gap,
  className,
  style,
}: EyebrowProps) {
  return (
    <div
      className={`${styles.eyebrow} ${className ?? ''}`}
      style={{ color, ...(gap != null ? { gap } : null), ...style }}
    >
      {dot ? <span className={styles.eyebrowDot} /> : null}
      {line ? (
        <span className={styles.eyebrowLine} style={{ background: line }} />
      ) : null}
      {children}
    </div>
  );
}
