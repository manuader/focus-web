/* Posteo 4:5 de la serie "Sin plantilla" · 10/10 · Recomposición.
   Versión estática del anuncio A10: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post10_proximo-caso',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 10 / 10',
    eyebrow: 'Recomposición',
    lines: ['Siete disciplinas.', 'Un solo *haz.*'],
    size: 100,
    visual: [
  F.three({ scene: 'prism', t0: -1, fin: 0.01, blurIn: 0, h: 1350, opts: { mode: 'merge', t: { bands: [0.2, 2.6], exit: [3.4, 5.0] }, entry: [0.05, 0.62, 0.2], exit: [0.2, -0.45, 0.2], outTo: [0.55, -8, 0.2], mergeFrom: (i) => [-1.6 + i * 0.62, 8, 0.2], cam: { from: [-1.2, 0.9, 9.5], to: [-1.2, 0.9, 9.5], dur: 1 }, look: [-1.1, 0.5], size: 0.85, studio: { bloom: 0.55, bloomT: 0.8 }, time: () => 7 } }),
    ],
  }),
  audio: {},
});
