import type { CSSProperties, ReactNode } from 'react';
import styles from './ui.module.css';

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration: number;
  reverse?: boolean;
  /** Class for each of the two duplicated groups (gap, padding, font…). */
  groupClassName?: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

/**
 * Infinite horizontal marquee. The group is rendered twice and the track slides
 * exactly one group width, so the loop is seamless regardless of content. The
 * second copy is aria-hidden. Loops are paused globally under reduced motion.
 */
export function Marquee({
  children,
  duration,
  reverse,
  groupClassName,
  className,
  style,
  ariaLabel,
}: MarqueeProps) {
  return (
    <div
      className={`${styles.marqueeViewport} ${className ?? ''}`}
      style={style}
      role="marquee"
      aria-label={ariaLabel}
    >
      <div
        className={styles.marqueeTrack}
        style={{
          animationName: reverse ? 'focMarqueeRev' : 'focMarquee',
          animationDuration: `${duration}s`,
        }}
      >
        <div className={groupClassName}>{children}</div>
        <div className={groupClassName} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
