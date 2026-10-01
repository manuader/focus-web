import type { ReactNode } from 'react';
import styles from './ui.module.css';

/** Shared optical accent used by every FOCUS call-to-action. */
export function FocusButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className={styles.focusBtnLabel}>{children}</span>
      <span className={styles.focusBtnOrbs} aria-hidden="true">
        <span className={`${styles.focusBtnOrb} ${styles.focusBtnOrbGreen}`} />
        <span className={`${styles.focusBtnOrb} ${styles.focusBtnOrbBlue}`} />
        <span className={`${styles.focusBtnOrb} ${styles.focusBtnOrbMagenta}`} />
      </span>
    </>
  );
}
