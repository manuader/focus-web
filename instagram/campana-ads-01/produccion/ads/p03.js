/* Posteo 4:5 de la serie "Sin plantilla" · 03/10 · Reflexión.
   Versión estática del anuncio A03: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post03_lo-que-queda',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 03 / 10',
    eyebrow: 'Reflexión',
    lines: ['Sos más que', 'tu *cara.*'],
    size: 108,
    visual: [
  F.three({ scene: 'mirror', t0: -1, fin: 0.01, blurIn: 0, h: 1350, opts: { camX: 0, lookX: 0, lookY: -0.6, camY: 0.9, colH: 2.0, camFrom: 6.2, camTo: 6.2, split: () => 1, exit: 'sink', ring: () => 1, ringColor: 0xff00ff, ringX: 0, time: () => 14 } }),
    ],
  }),
  audio: {},
});
