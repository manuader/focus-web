import type { CSSProperties } from 'react';

interface RingsMotifProps {
  /** Ring radii, outer-last. */
  radii: number[];
  /** SVG canvas size the radii are drawn against (default 800×800). */
  size?: number;
  strokeWidth?: number;
  /** Optional solid center dot (used in the Foco process card). */
  dotRadius?: number;
  className?: string;
  /** Color is taken from `style.color` via currentColor. */
  style?: CSSProperties;
  ariaHidden?: boolean;
}

/**
 * Concentric rings — the "densidad" motif from the brand system: the closer
 * you look, the more there is. Recolor via `style.color`; blend and animate
 * from the caller (mix-blend-mode: screen + focSpin in the original).
 */
export function RingsMotif({
  radii,
  size = 800,
  strokeWidth = 1.2,
  dotRadius,
  className,
  style,
}: RingsMotifProps) {
  const c = size / 2;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        {radii.map((r) => (
          <circle key={r} cx={c} cy={c} r={r} />
        ))}
      </g>
      {dotRadius ? <circle cx={c} cy={c} r={dotRadius} fill="currentColor" /> : null}
    </svg>
  );
}
