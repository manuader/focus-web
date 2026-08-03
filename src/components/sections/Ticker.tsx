import { Fragment } from 'react';
import { Marquee } from '@/components/ui/Marquee';
import { TICKER_ITEMS } from '@/lib/content';
import styles from './ticker.module.css';

const DOT_COLORS = [
  'var(--focus-magenta)',
  'var(--focus-blue)',
  'var(--focus-green)',
];

/** Paper marquee of disciplines, each followed by a cycling color dot. */
export function Ticker() {
  return (
    <div className={styles.ticker}>
      <Marquee
        duration={30}
        groupClassName={styles.group}
        ariaLabel={TICKER_ITEMS.join(' · ')}
      >
        {TICKER_ITEMS.map((item, i) => (
          <Fragment key={item}>
            <span>{item}</span>
            <span
              className={styles.dot}
              style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
            />
          </Fragment>
        ))}
      </Marquee>
    </div>
  );
}
