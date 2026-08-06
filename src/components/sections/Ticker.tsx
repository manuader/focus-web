import { Fragment } from 'react';
import { Marquee } from '@/components/ui/Marquee';
import { TICKER_ITEMS } from '@/lib/content';
import styles from './ticker.module.css';

const DOT_COLORS = [
  'var(--focus-magenta)',
  'var(--focus-blue)',
  'var(--focus-green)',
];

/**
 * Paper marquee of disciplines, each followed by a cycling color dot.
 *
 * `duration` is the time for one loop, so it has to track the content: the
 * group grew from 1881px to 2594px when the two new disciplines went in, and
 * holding 30s there would have sped the band up by 38%. 37s puts it at
 * 70px/s against the old 63px/s, the small nudge the owners asked for.
 */
export function Ticker() {
  return (
    <div className={styles.ticker}>
      <Marquee
        duration={37}
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
