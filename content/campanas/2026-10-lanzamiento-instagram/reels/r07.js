/* R07 · Portfolio verificado · "Nueve trabajos" · 22 s.
   Solo los casos de WORKS en src/lib/content.ts, con sus servicios reales. */
const { text, image, group, seq, box, logo } = F;
const C = (id) => `/design-system/assets/clientes/${id}-card.jpg`;
const GRID = ['ader-studio', 'oushy', 'toplaser-web', 'chillin', 'santa-tuca', 'toplaser', 'chuchones', 'rsh-consultora', 'fernanda-estetica'];
const cardName = (x, y, w, name, cat, t0, t1) => [
  text({ lines: [name], cls: 't-body', size: 34, x, y, w, t0, t1, by: 'all', style: { fontWeight: 700 } }),
  text({ lines: [`{s:${cat}}`], cls: 't-body', size: 28, x, y: y + 42, w, t0: t0 + 0.1, t1, by: 'all' }),
];
const chapter = (t0, t1, eyebrow, color, kids) => group({ t0, t1, clip: 'iris', clipIn: [t0, t0 + 0.8], cy: 900, fout: 0.4, children: [
  text({ lines: [eyebrow], cls: 't-eyebrow', size: 40, x: 60, y: 280, t0: t0 + 0.2, t1, by: 'all', style: { color } }),
  ...kids,
] });
F.mount({
  name: 'focus_reel07_nueve-trabajos',
  dur: 22,
  cover: 2.4,
  items: [
    ...GRID.map((id, i) => image({ src: C(id), x: 60 + (i % 3) * 330, y: 330 + Math.floor(i / 3) * 400, w: 300, h: 375, t0: 0.05 + i * 0.07, t1: 3.2, fin: 0.7, blur: 16 })),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 1.0, t1: 3.2, fin: 0.5, blur: false, style: { background: 'rgba(10,10,11,.66)' } }),
    text({ lines: ['Ocho marcas.'], cls: 't-head', size: 124, x: 60, y: 700, t0: 1.0, t1: 3.2, by: 'all' }),
    text({ lines: ['Ningún rubro se repite.'], cls: 't-body', size: 58, x: 64, y: 850, t0: 1.3, t1: 3.2, by: 'word', stagger: 0.05 }),

    chapter(3.2, 7.2, 'Páginas web', '#FF00FF', [
      ...[['ader-studio', 'Ader Studio', 'Arquitectura'], ['oushy', 'OUSHY Studio', 'Estudio creativo'], ['toplaser-web', 'Top Láser', 'Imprenta']].flatMap(([id, n, c], i) => [
        image({ src: C(id), x: 60 + i * 330, y: 400, w: 300, h: 375, t0: 3.4 + i * 0.25, t1: 7.2 }),
        ...cardName(60 + i * 330, 800, 300, n, c, 3.6 + i * 0.25, 7.2),
      ]),
      text({ lines: ['Tres sitios,', 'tres rubros.'], cls: 't-body', size: 60, x: 60, y: 1040, t0: 4.7, t1: 7.2, by: 'line', lineDelay: 0.5, stagger: 0 }),
    ]),
    chapter(7.2, 11.8, 'Social media management', '#5B8CFF', [
      ...[['chillin', '@chillin1390bar', 'Bar'], ['chuchones', '@chuchones_wines', 'Vinos boutique'], ['rsh-consultora', '@rsh_consultora', 'Seguridad e higiene'], ['fernanda-estetica', '@esteticaintegralfernanda', 'Estética y salud']].flatMap(([id, n, c], i) => [
        image({ src: C(id), x: 60 + (i % 2) * 490, y: 360 + Math.floor(i / 2) * 560, w: 400, h: 440, t0: 7.4 + i * 0.22, t1: 11.8 }),
        ...cardName(60 + (i % 2) * 490, 360 + Math.floor(i / 2) * 560 + 452, 470, n, c, 7.6 + i * 0.22, 11.8),
      ]),
    ]),
    chapter(11.8, 15.2, 'Identidad · social media · audiovisual', '#00FF33', [
      image({ src: C('toplaser'), x: 60, y: 380, w: 620, h: 775, t0: 12, t1: 15.2, zoom: [1, 1.04] }),
      ...cardName(60, 1180, 900, 'Top Láser', 'Imprenta · identidad, redes, video y web', 12.3, 15.2),
    ]),
    chapter(15.2, 18.4, 'Edición de video · social media', '#FF00FF', [
      image({ src: C('santa-tuca'), x: 400, y: 380, w: 620, h: 775, t0: 15.4, t1: 18.4, zoom: [1, 1.04] }),
      ...cardName(60, 1180, 960, '@santatuca', 'Creador de contenido · edición de reels y videos de YouTube', 15.7, 18.4),
    ]),

    seq({ dir: '/work/capturas/casos', count: 210, t0: 18.4, t1: 22, rate: 1.9, offset: 0.2, fin: 0.5 }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 19.6, fin: 0.6, blur: false, style: { background: 'rgba(10,10,11,.95)' } }),
    text({ lines: ['¿El próximo rubro?'], cls: 't-head', size: 104, x: 60, y: 700, t0: 19.7, by: 'word', stagger: 0.2 }),
    text({ lines: ['Agendá 30 minutos.'], cls: 't-body', size: 42, x: 64, y: 900, w: 900, t0: 20.3, by: 'word', stagger: 0.05, color: 's' }),
    logo({ t0: 20.6, w: 200, x: 64, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'sus'], [2.9, 'min'], [18.4, 'maj']],
    bpm: 96, pulse: [2.9, 18.4],
    events: [[0.05, 'swell'], [1.1, 'tick'], [2.9, 'click'], [7.2, 'click', 0.4], [11.8, 'click', 0.6], [15.2, 'click', 0.5], [18.4, 'low'], [19.7, 'resolve']],
  },
});
