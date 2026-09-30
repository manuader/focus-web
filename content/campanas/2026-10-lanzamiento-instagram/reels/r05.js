/* R05 · Proceso · "Un commit a la vez" · 22 s. Los mensajes son los commits
   reales del repo del sitio (git log), con su fecha. */
const { text, box, seq, logo } = F;
const LOG = [
  ['2026-08-03', 'Migrate FOCUS site from Claude Design to Next.js'],
  ['2026-08-06', 'Open the site with the aperture spinning into the wordmark'],
  ['2026-08-19', 'Rebuild Servicios as an inverted prism'],
  ['2026-08-20', 'Add the vertical prism for phones, and fix contrast site-wide'],
  ['2026-08-25', 'Give phones a pointer, so the cursor sections come alive'],
  ['2026-08-25', 'Keep the affordance copy honest on every device'],
  ['2026-08-25', 'Stop measuring five sections a frame to animate one'],
  ['2026-09-18', "Open the site in the visitor's language"],
  ['2026-09-28', 'Give phones a real prism'],
];
// Qué commit está en foco en cada momento (índice en LOG).
const FOCUS_AT = [[4.2, 2], [7.0, 4], [10.0, 6]];
const focusIdx = (t) => { let k = -1; FOCUS_AT.forEach(([ts, i]) => { if (t >= ts) k = i; }); return k; };
F.mount({
  name: 'focus_reel05_un-commit-a-la-vez',
  dur: 22,
  cover: 1.8,
  items: [
    // Hook: el último commit, grande.
    text({ lines: ['Dale al teléfono', 'un prisma de verdad'], cls: 't-head', size: 104, x: 80, y: 580, t0: 0, t1: 3.4, by: 'line', lineDelay: 0.25, stagger: 0, fin: 0.7 }),
    text({ lines: ['{s:commit · 28/09 · Give phones a real prism}'], cls: 't-mono', size: 26, x: 84, y: 500, t0: 0.4, t1: 3.4, by: 'all' }),
    text({ lines: ['Esta línea rehízo el prisma.'], cls: 't-body', size: 56, x: 84, y: 920, t0: 0.9, t1: 3.4, by: 'all' }),

    // El historial: todo desenfocado salvo la decisión que se lee.
    text({ lines: LOG.map(([d, m]) => `{s:${d.slice(5).replace('-', '/')}}  ${m}`), cls: 't-body', size: 36, x: 80, y: 330, w: 940, t0: 3.5, t1: 13, by: 'line', lineDelay: 0.07, stagger: 0,
      lineStyle: () => ({ lineHeight: '1.25', marginBottom: '26px' }),
      defocus: (t, li) => { const k = focusIdx(t); return k < 0 ? 0 : (li === k ? 0 : 7 * F.out(F.p(t, 4.2, 4.8))); },
      dim: (t, li) => { const k = focusIdx(t); return k < 0 || li === k ? 1 : 0.35; } }),
    text({ lines: ['El prisma de servicios, dado vuelta.'], cls: 't-body', size: 52, x: 80, y: 1240, w: 920, t0: 4.4, t1: 6.9, by: 'word', stagger: 0.05 }),
    text({ lines: ['Le dimos un puntero al teléfono.'], cls: 't-body', size: 50, x: 80, y: 1240, w: 940, t0: 7.1, t1: 9.9, by: 'all' }),
    text({ lines: ['Medía cinco secciones para animar una.', 'Ya no.'], cls: 't-body', size: 46, x: 80, y: 1240, w: 940, t0: 10.1, t1: 13, by: 'line', lineDelay: 0.6, stagger: 0 }),

    // El resultado, en el teléfono.
    seq({ dir: '/work/capturas/hero', count: 120, t0: 13.2, t1: 18.6, rate: 0.72 }),
    box({ x: 0, y: 1080, w: 1080, h: 840, t0: 13.2, t1: 18.6, blur: false, style: { background: 'linear-gradient(transparent, rgba(10,10,11,.9) 45%)' } }),
    text({ lines: ['34 commits entre el 3 de agosto', 'y el 28 de septiembre.'], cls: 't-body', size: 44, x: 80, y: 1330, t0: 14, t1: 18.6, by: 'line', lineDelay: 0.5, stagger: 0 }),

    text({ lines: ['Diseño y código', 'en la misma *mesa.*'], size: 112, x: 80, y: 640, t0: 18.8, by: 'line', lineDelay: 0.35, stagger: 0 }),
    text({ lines: ['Seguí el próximo commit.'], cls: 't-body', size: 40, x: 84, y: 960, w: 900, t0: 19.9, by: 'word', stagger: 0.05, color: 's' }),
    logo({ t0: 20.4, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'min'], [13.2, 'maj']],
    bpm: 88, pulse: [3.5, 13],
    events: [[0.1, 'tick'], [3.5, 'swell'], [4.2, 'tick'], [7.0, 'tick'], [9.8, 'tick'], [13.2, 'low'], [13.4, 'resolve'], [18.8, 'swell'], [19.9, 'tick']],
  },
});
