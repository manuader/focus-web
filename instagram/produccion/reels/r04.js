/* R04 · Criterio / estrategia · "¿De qué está hecha tu marca?" · 20 s */
const { text, box, rings } = F;
const split = (t) => {
  // 0-1.2 junta y blanca · 1.2-3 se abre · 3-9 abierta · 9-12 corrida (borrosa) · 13-15.5 se recompone
  const open = F.io(F.p(t, 1.2, 2.6)) * (1 - F.io(F.p(t, 13.2, 15.4)));
  return 6 + open * 95;
};
const LAYERS = [
  { c: 'm', hex: '#FF00FF', label: 'Estrategia', q: '¿Qué lugar ocupa?', dx: -1, dy: -1 },
  { c: 'b', hex: '#5B8CFF', label: 'Imagen', q: '¿Cómo se reconoce?', dx: 0.7, dy: 0.5 },
  { c: 'g', hex: '#00FF33', label: 'Voz', q: '¿Cómo suena?', dx: 0.3, dy: 1.2 },
];
F.mount({
  name: 'focus_reel04_tres-capas',
  dur: 20,
  cover: 4.2,
  items: [
    text({ lines: ['¿De qué está hecha', 'tu marca?'], size: 84, x: 80, y: 300, t0: 0.1, t1: 8.8, by: 'line', lineDelay: 0.3, stagger: 0 }),
    // La palabra, en sus tres capas aditivas.
    text({ lines: ['MARCA'], cls: 't-bold', size: 220, x: 0, w: 1080, align: 'center', y: 760, t0: 0, t1: 17, by: 'all', rgb: true, rgbCurve: split,
      defocus: (t) => 9 * F.io(F.p(t, 9, 10)) * (1 - F.io(F.p(t, 12.6, 13.6))), fin: 0.6 }),
    ...LAYERS.map((L, i) => text({ lines: [`{${L.c}:${L.label}}`], cls: 't-eyebrow', size: 34, x: 80, y: 1120 + i * 110, t0: 3 + i * 1.6, t1: 8.8, by: 'all', style: { color: L.hex } })),
    ...LAYERS.map((L, i) => text({ lines: [L.q], cls: 't-body', size: 48, x: 420, y: 1110 + i * 110, w: 620, t0: 3.3 + i * 1.6, t1: 8.8, by: 'word', stagger: 0.05 })),

    text({ lines: ['Cuando una capa se corre,', 'la marca se ve {s:borrosa.}'], size: 70, x: 80, y: 1180, t0: 9.2, t1: 12.8, by: 'line', lineDelay: 0.6, stagger: 0 }),
    text({ lines: ['Las separamos', 'para ver de qué está hecha.'], cls: 't-body', size: 58, x: 80, y: 1180, t0: 12.9, t1: 15.6, by: 'line', lineDelay: 0.5, stagger: 0 }),
    text({ lines: ['Y las juntamos hasta que', 'la luz es *blanca* otra vez.'], size: 70, x: 80, y: 1180, t0: 15.7, by: 'line', lineDelay: 0.5, stagger: 0 }),
    text({ lines: ['Guardalo para la próxima vez', 'que revises tu marca.'], cls: 't-body', size: 44, x: 80, y: 1390, w: 920, t0: 17.4, by: 'line', lineDelay: 0.4, stagger: 0, color: 's' }),
  ],
  audio: {
    chords: [[0, 'sus'], [9, 'min'], [15.4, 'maj']],
    events: [[1.2, 'swell'], [3.0, 'tick', 0.3], [4.6, 'tick', 0.5], [6.2, 'tick', 0.7], [9.0, 'low'], [13.2, 'swell'], [15.4, 'resolve'], [17.4, 'click']],
  },
});
