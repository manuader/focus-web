import styles from './chrome.module.css';

/**
 * Analog grain — an SVG fractal-noise turbulence rendered over everything and
 * blended with `overlay`. Static, so it stays a server component.
 */
export function GrainOverlay() {
  return (
    <div className={styles.grain} aria-hidden="true">
      <svg>
        <filter id="focGrain">
          <feTurbulence
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
            type="fractalNoise"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#focGrain)" />
      </svg>
    </div>
  );
}
