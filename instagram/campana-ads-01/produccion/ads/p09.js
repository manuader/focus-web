/* Posteo 4:5 de la serie "Sin plantilla" · 09/10 · Órbita.
   Versión estática del anuncio A09: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post09_todos-los-meses',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 09 / 10',
    eyebrow: 'Órbita',
    lines: ['Un estudio,', 'todos los *meses.*'],
    size: 100,
    visual: [
  F.three({ scene: 'orbit', t0: -1, fin: 0.01, blurIn: 0, h: 1350, opts: { n: 4, colors: [0xff00ff, 0x3366ff, 0x00ff33, 0xffffff], tilt: 0.9, camFrom: 13, camTo: 13, camY: 1.6, lookY: -0.7, active: () => -1, time: () => 22 } }),
    ],
  }),
  audio: {},
});
