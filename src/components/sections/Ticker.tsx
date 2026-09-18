'use client';

import { Fragment } from 'react';
import { Marquee } from '@/components/ui/Marquee';
import { useTranslate } from '@/hooks/useTranslate';
import { TICKER_ITEMS } from '@/lib/content';
import type { Lang } from '@/lib/content';
import styles from './ticker.module.css';

const DOT_COLORS = [
  'var(--focus-magenta)',
  'var(--focus-blue)',
  'var(--focus-green)',
];

/**
 * `duration` is the time for one loop, so it has to track the content: the
 * group grew from 1881px to 2594px when the two new disciplines went in, and
 * holding 30s there would have sped the band up by 38%. 37s puts it at
 * 70px/s against the old 63px/s, the small nudge the owners asked for. The
 * English names run shorter, 2185px against 2594px, so 31s keeps English at
 * that same pace instead of letting it drift slower.
 */
const DURATION: Record<Lang, number> = { es: 37, en: 31 };

/** Paper marquee of disciplines, each followed by a cycling color dot. */
export function Ticker() {
  const { lang, t } = useTranslate();
  const items = TICKER_ITEMS.map((item) => t(item));

  return (
    <div className={styles.ticker}>
      <Marquee
        duration={DURATION[lang]}
        groupClassName={styles.group}
        ariaLabel={items.join(' · ')}
      >
        {items.map((item, i) => (
          <Fragment key={TICKER_ITEMS[i].es}>
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
