/* Posteo 4:5 de la serie "Sin plantilla" · 04/10 · Difracción.
   Versión estática del anuncio A04: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post04_a-medida',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 04 / 10',
    eyebrow: 'Difracción',
    lines: ['Software', '*a medida.*'],
    size: 120,
    visual: [
  F.gl({ frag: F.GLSL.interference, t0: -1, fin: 0.01, h: 1350, u: () => ({ uOrder: 0.62, uCells: 12, uAmt: 0.9, uFreq: 52 }) }),
  F.glyph({ name: 'software', x: 80, y: 700, size: 110, t0: -1, color: 'var(--paper)' }),
    ],
  }),
  audio: {},
});
