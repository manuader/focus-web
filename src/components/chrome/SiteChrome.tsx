import type { ReactNode } from 'react';
import { GrainOverlay } from './GrainOverlay';
import { ScrollProgressBar } from './ScrollProgressBar';
import { CursorRing } from './CursorRing';
import { Nav } from './Nav';
import styles from './chrome.module.css';

/**
 * Fixed, page-wide furniture: the atmospheric overlays (grain, vignette,
 * scanline), the scroll progress bar, the custom cursor and the nav — wrapped
 * around the page content. Kept out of the sections so each section stays
 * focused on its own composition.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <GrainOverlay />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scanline} aria-hidden="true" />
      <ScrollProgressBar />
      <CursorRing />
      <Nav />
      <div style={{ position: 'relative', background: 'var(--focus-ink)' }}>
        {children}
      </div>
    </>
  );
}
