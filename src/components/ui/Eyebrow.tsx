import type { CSSProperties, ReactNode } from 'react';
import styles from './ui.module.css';

interface EyebrowProps {
  children: ReactNode;
  /** Accent color for the leading rule (omit for no rule). */
  line?: string;
  /** Show the blinking green status dot instead of a rule. */
  dot?: boolean;
  /**
   * Section-label treatment: serif italic, a size up, no tracking.
   * Leave off for the small tracked micro-labels (hero status line).
   */
  section?: boolean;
  color?: string;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The recurring section label ("Servicios"), optionally prefixed with a
 * colored rule or the blinking live dot.
 */
export function Eyebrow({
  children,
  line,
  dot,
  section,
  color = 'var(--focus-gray-500)',
  gap,
  className,
  style,
}: EyebrowProps) {
  return (
    <div
      className={`${styles.eyebrow} ${section ? styles.eyebrowSection : ''} ${className ?? ''}`}
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
