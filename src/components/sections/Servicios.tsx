'use client';

import { useEffect, useRef, useState } from 'react';
import { usePointer } from '@/context/PointerContext';
import { useTranslate } from '@/hooks/useTranslate';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import styles from './servicios.module.css';

/* Trace geometry of the little board. Orthogonal runs with 45 degree
   chamfers, fanned out from the central chip so nothing crosses.
   Every path is normalised with pathLength=100 so one dash travels the
   whole run per cycle, whatever its real length. */
const TRACES = [
  'M96 166H60L48 154V80H14', // 0  left pin 1, up to the board edge
  'M96 186H36V214H14', // 1  left pin 2, through a resistor
  'M96 206H80L68 218V262', // 2  left pin 3, ends on a pad
  'M204 166H248L260 154V104', // 3  right pin 1, ends on a pad
  'M204 186H286', // 4  right pin 2, straight out
  'M204 206H236V300L248 312V366', // 5  right pin 3, down to the edge
  'M124 142V116L112 104H60V44', // 6  top pin 1, out to a pad
  'M150 142V96L162 84V30', // 7  top pin 2, up to the accent node
  'M176 142V120H214L226 108V46H286', // 8  top pin 3, out to the right
  'M124 238V270L112 282H56V366', // 9  bottom pin 1
  'M150 238V310H196V366', // 10 bottom pin 2
  'M176 238V258L188 270H220V366', // 11 bottom pin 3
  'M88 44H74L62 32H26', // 12 header connector feed
];

/** The few traces drawn in a brand accent instead of gray. */
const TRACE_TINT: Record<number, string> = {
  7: styles.traceMagenta,
  11: styles.traceGreen,
};

/** Traces that carry a current pulse, each on its own clock. */
const PULSES = [
  { i: 0, cls: styles.pulseBlue },
  { i: 8, cls: styles.pulseMagenta },
  { i: 10, cls: styles.pulseGreen },
  { i: 5, cls: `${styles.pulseBlue} ${styles.pulseLate}` },
];

/** Mounting holes, one per corner. */
const HOLES = [
  [28, 28],
  [272, 28],
  [28, 352],
  [272, 352],
];

/**
 * Placeholder artwork for the hover panel: a small printed board with
 * current running through a handful of traces. Pure CSS animation, so it
 * costs nothing per frame beyond the compositor.
 */
function CircuitBoard() {
  return (
    <svg className={styles.board} viewBox="0 0 300 380">
      <defs>
        {TRACES.map((d, i) => (
          <path key={i} id={`focBoardTrace${i}`} d={d} pathLength={100} />
        ))}
      </defs>

      <rect className={styles.frame} x="14" y="14" width="272" height="352" />
      {HOLES.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle className={styles.hole} cx={cx} cy={cy} r="5.5" />
          <circle className={styles.holeCore} cx={cx} cy={cy} r="1.6" />
        </g>
      ))}

      <g className={styles.trace}>
        {TRACES.map((_, i) => (
          <use key={i} href={`#focBoardTrace${i}`} className={TRACE_TINT[i]} />
        ))}
      </g>

      {/* Central chip with its legs */}
      <path
        className={styles.legs}
        d="M96 166H104M96 186H104M96 206H104M196 166H204M196 186H204M196 206H204M124 142V150M150 142V150M176 142V150M124 226V238M150 226V238M176 226V238"
      />
      <rect className={styles.chip} x="104" y="150" width="92" height="76" />
      <rect className={styles.chipDie} x="118" y="164" width="64" height="48" />
      <circle className={styles.chipDot} cx="114" cy="160" r="3" />

      {/* Two discretes sitting on the mid traces */}
      <rect className={styles.part} x="50" y="181" width="22" height="10" />
      <rect className={styles.part} x="232" y="181" width="22" height="10" />

      {/* Header connector, top left */}
      <rect className={styles.part} x="88" y="36" width="44" height="16" />
      <rect className={styles.pad} x="93.5" y="41" width="6" height="6" />
      <rect className={styles.pad} x="107" y="41" width="6" height="6" />
      <rect className={styles.pad} x="120.5" y="41" width="6" height="6" />

      {/* Vias */}
      <circle className={styles.via} cx="48" cy="120" r="4" />
      <circle className={styles.via} cx="36" cy="200" r="4" />
      <circle className={styles.via} cx="226" cy="76" r="4" />
      <circle className={styles.via} cx="220" cy="330" r="4" />
      <circle
        className={`${styles.via} ${styles.node} ${styles.nodeDim}`}
        cx="150"
        cy="286"
        r="4"
      />

      {/* Pads and the accent nodes that blink out of step */}
      <rect className={styles.pad} x="55" y="39" width="10" height="10" />
      <rect
        className={`${styles.node} ${styles.nodeMagenta}`}
        x="157"
        y="25"
        width="10"
        height="10"
      />
      <circle
        className={`${styles.node} ${styles.nodeBlue}`}
        cx="260"
        cy="104"
        r="5"
      />
      <rect
        className={`${styles.node} ${styles.nodeGreen}`}
        x="63"
        y="257"
        width="10"
        height="10"
      />

      {/* Current pulses, drawn last so they read on top of the copper */}
      {PULSES.map(({ i, cls }) => (
        <use
          key={i}
          href={`#focBoardTrace${i}`}
          className={`${styles.pulse} ${cls}`}
        />
      ))}
    </svg>
  );
}

/**
 * The services list. Rows nudge and recolor on hover (CSS), and a small
 * circuit panel trails the cursor (fine pointers only). The panel is a
 * placeholder for artwork the brand owners will supply later.
 */
export function Servicios() {
  const { t } = useTranslate();
  const { enabled, subscribe } = usePointer();
  const title = useReveal<HTMLHeadingElement>(70);

  const panelRef = useRef<HTMLDivElement>(null);
  const onRef = useRef(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = panelRef.current;
    if (!el) return;
    return subscribe(({ x, y }) => {
      if (!onRef.current) return;
      el.style.transform = `translate3d(${x + 28}px, ${y - 190}px, 0)`;
    });
  }, [enabled, subscribe]);

  const showPanel = () => {
    if (!enabled) return;
    onRef.current = true;
    setOn(true);
  };
  const hidePanel = () => {
    onRef.current = false;
    setOn(false);
  };

  return (
    <section className={styles.servicios} id="servicios" aria-label="Servicios">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Reveal className={styles.eyebrow}>
              <Eyebrow section line="var(--focus-blue)" color="var(--focus-gray-700)">
                {t(COPY.servicios.eyebrow)}
              </Eyebrow>
            </Reveal>
            <h2 ref={title.ref} className={styles.title} style={title.style}>
              {t(COPY.servicios.title)}
            </h2>
          </div>
          <Reveal>
            <p className={styles.intro}>{t(COPY.servicios.intro)}</p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {SERVICES.map((s) => (
            <a
              key={s.n}
              href="#contacto"
              className={styles.row}
              onMouseEnter={showPanel}
              onMouseLeave={hidePanel}
            >
              <span className={styles.rowNum}>{s.n}</span>
              <span className={styles.rowTitle}>{t(s.title)}</span>
              <span className={styles.rowDetail}>{t(s.detail)}</span>
            </a>
          ))}
        </div>
      </div>

      {enabled ? (
        <div
          ref={panelRef}
          className={`${styles.panel} ${on ? styles.panelOn : ''}`}
          aria-hidden="true"
        >
          <CircuitBoard />
        </div>
      ) : null}
    </section>
  );
}
