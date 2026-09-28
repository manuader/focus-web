/* R10 · Software / oficio · "Nadie lo va a notar" · 20 s.
   Tres detalles reales del código del sitio: idioma por Accept-Language
   (src/lib/locale.ts), el azul de texto #5B8CFF (globals.css) y
   prefers-reduced-motion en las secciones animadas. */
const { text, box, rings, logo } = F;
const num = (n, t0, t1) => text({ lines: [`{s:${n} / 03}`], cls: 't-mono', size: 26, x: 80, y: 290, t0, t1, by: 'all' });
F.mount({
  name: 'focus_reel10_nadie-lo-va-a-notar',
  dur: 20,
  cover: 1.9,
  items: [
    text({ lines: ['Nadie lo va', 'a notar.'], size: 132, x: 80, y: 560, t0: 0.05, t1: 2.8, by: 'line', lineDelay: 0.3, stagger: 0, fin: 0.6 }),
    text({ lines: ['Por eso lo hicimos.'], size: 72, x: 84, y: 880, t0: 1.2, t1: 2.8, by: 'all', color: 's' }),

    // 01 · idioma
    num('01', 2.9, 7.0),
    text({ lines: ['ES'], cls: 't-bold', size: 380, x: 60, y: 420, t0: 3.0, t1: 7.0, by: 'all', defocus: (t) => 18 * F.io(F.p(t, 4.6, 5.2)), dim: (t) => 1 - 0.7 * F.io(F.p(t, 4.6, 5.2)) }),
    text({ lines: ['EN'], cls: 't-bold', size: 380, x: 520, y: 420, t0: 3.0, t1: 7.0, by: 'all', defocus: (t) => 18 * (1 - F.io(F.p(t, 4.6, 5.2))), dim: (t) => 0.3 + 0.7 * F.io(F.p(t, 4.6, 5.2)), color: '#5B8CFF' }),
    text({ lines: ['El sitio lee el idioma de tu navegador', 'y te habla en español o en inglés.'], cls: 't-body', size: 46, x: 80, y: 960, w: 940, t0: 3.4, t1: 7.0, by: 'line', lineDelay: 0.6, stagger: 0 }),
    text({ lines: ['{s:Escrito para cada lector, no traducido.}'], cls: 't-body', size: 40, x: 80, y: 1120, t0: 5.2, t1: 7.0, by: 'all' }),

    // 02 · contraste
    num('02', 7.1, 11.6),
    box({ x: 80, y: 420, w: 440, h: 440, t0: 7.2, t1: 11.6, style: { border: '1px solid #3a3d42' }, html: '<div style="padding:40px;font-size:150px;font-weight:300;color:#0033ff">Aa</div><div style="position:absolute;left:40px;bottom:36px;font-weight:700;font-size:26px;letter-spacing:.12em;color:#7c818a">#0033FF · 2,47:1</div>' }),
    box({ x: 560, y: 420, w: 440, h: 440, t0: 7.6, t1: 11.6, style: { border: '1px solid #5b8cff' }, html: '<div style="padding:40px;font-size:150px;font-weight:300;color:#5b8cff">Aa</div><div style="position:absolute;left:40px;bottom:36px;font-weight:700;font-size:26px;letter-spacing:.12em;color:#f6f6f4">#5B8CFF · 6,2:1</div>' }),
    text({ lines: ['El azul de marca no se leía', 'en texto chico sobre negro.'], cls: 't-body', size: 46, x: 80, y: 960, w: 940, t0: 7.9, t1: 11.6, by: 'line', lineDelay: 0.6, stagger: 0 }),
    text({ lines: ['Hicimos un azul solo para eso.'], size: 54, x: 80, y: 1110, w: 940, t0: 9.4, t1: 11.6, by: 'all' }),

    // 03 · menos movimiento
    num('03', 11.7, 15.9),
    rings({ t0: 11.7, t1: 15.9, cx: 540, cy: 640, size: 700, period: 3, accentRing: 3, accent: 'g', color: 'var(--g400)',
      time: (t) => (t < 13.4 ? t : 13.4 + (1 - Math.exp(-(t - 13.4) * 2.2)) / 2.2) }),
    text({ lines: ['Si tu teléfono pide menos movimiento,', 'el sitio se queda quieto.'], cls: 't-body', size: 46, x: 80, y: 1060, w: 940, t0: 12.1, t1: 15.9, by: 'line', lineDelay: 0.6, stagger: 0 }),

    text({ lines: ['Lo que no se ve', 'también es *diseño.*'], size: 112, x: 80, y: 620, t0: 16.1, by: 'line', lineDelay: 0.4, stagger: 0 }),
    text({ lines: ['¿Tu sitio está a esta altura? Hablemos.'], cls: 't-body', size: 42, x: 84, y: 930, w: 900, t0: 17.4, by: 'word', stagger: 0.05, color: 's' }),
    logo({ t0: 18.0, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'min'], [16.1, 'maj']],
    bpm: 80, pulse: [2.9, 15.9],
    events: [[0.1, 'tick'], [2.9, 'click'], [4.8, 'tick', 0.7], [7.1, 'click'], [7.6, 'tick', 0.7], [11.7, 'click'], [13.4, 'low'], [16.1, 'resolve'], [17.4, 'tick']],
  },
});
