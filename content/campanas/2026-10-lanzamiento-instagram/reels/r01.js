/* R01 · Manifiesto · "Mirar no alcanza" · 22 s */
const { text, image, rings, logo, group, box } = F;
F.mount({
  name: 'focus_reel01_manifiesto',
  dur: 22,
  cover: 2.6,
  items: [
    // Hook: el key visual de campaña, en gris y desenfocado; el lockup entra en foco.
    image({ src: '/design-system/assets/key-visuals/kv-mirar-no-alcanza.jpg', t0: 0, t1: 6.6, treat: 'dim', blur: 8, zoom: [1.55, 1.7], pos: '72% 40%', opacity: 1, fin: 0.4 }),
    text({ lines: ['MIRAR'], cls: 't-head', size: 210, x: 80, y: 700, t0: 0.1, t1: 6.6, by: 'all', blur: 26, fin: 1.4 }),
    text({ lines: ['NO ALCANZA'], cls: 't-light-it t-caps', size: 92, x: 84, y: 900, t0: 1.25, t1: 6.6, by: 'all', blur: 22, fin: 0.7 }),
    text({ lines: ['Tu marca tiene un ángulo.', '{s:No se ve.}'], size: 58, cls: 't-body', x: 84, y: 1080, w: 900, t0: 3.0, t1: 6.6, by: 'line', lineDelay: 0.5 }),

    // Ruido: frases que no terminan de enfocar.
    group({ t0: 6.6, t1: 11.4, fin: 0.01, children: [
      text({ lines: ['El ruido,', 'la tendencia,', 'la copia:'], size: 120, x: 80, y: 520, t0: 6.8, t1: 11.4, by: 'line', lineDelay: 0.55, stagger: 0,
        defocus: (t, li) => (t > 8.9 ? F.out(F.p(t, 8.9 + li * 0.15, 9.8 + li * 0.15)) * 14 : 0),
        dim: (t) => 1 - 0.55 * F.out(F.p(t, 8.9, 9.8)) }),
      text({ lines: ['se van fuera del plano.'], size: 64, cls: 't-body', x: 84, y: 1010, w: 900, t0: 9.0, t1: 11.4, by: 'word', stagger: 0.07 }),
    ]}),

    // La frase de marca, sobre anillos.
    rings({ t0: 11.2, t1: 19.2, cx: 540, cy: 900, size: 1500, period: 45, color: 'var(--g700)', accentRing: 2, accent: 'm', opacity: 0.9, scale: (t) => 1.08 - 0.08 * F.out(F.p(t, 11.2, 14)) }),
    text({ lines: ['No hace falta', 'otra marca.'], size: 124, x: 80, y: 640, t0: 11.5, t1: 15.6, by: 'line', lineDelay: 0.35 }),
    text({ lines: ['Hace falta *foco.*'], size: 132, x: 80, y: 930, t0: 13.1, t1: 15.6, by: 'word', stagger: 0.25, blur: 22, rgb: true, rgbAmp: 34 }),

    text({ lines: ['Identidad, dirección de arte,', 'contenido y sitios.'], size: 84, x: 80, y: 760, t0: 15.9, t1: 19.3, by: 'word', stagger: 0.08 }),

    // Cierre: el logo se recompone desde tres capas de luz.
    logo({ t0: 19.4, w: 440, y: 780, rgb: true, sub: 'El punto donde todo cambia' }),
    text({ lines: ['Mostranos tu marca · focuscreatives.net'], cls: 't-subserif', size: 48, x: 0, w: 1080, align: 'center', y: 1170, t0: 20.3, by: 'all' }),
  ],
  audio: {
    chords: [[0, 'min'], [13.1, 'maj']],
    events: [[1.4, 'tick'], [2.0, 'tick', 0.6], [9.0, 'swell'], [11.3, 'low'], [13.4, 'tick'], [13.5, 'resolve'], [19.4, 'swell'], [20.4, 'tick']],
  },
});
