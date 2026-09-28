/* Posteo 4:5 de la serie "Sin plantilla" · 02/10 · Profundidad de campo.
   Versión estática del anuncio A02: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post02_fuera-de-foco',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 02 / 10',
    eyebrow: 'Profundidad de campo',
    lines: ['Una marca no se inventa.', 'Se *enfoca.*'],
    size: 74,
    visual: [
  F.focusWindow({ src: '/public/assets/img-01.jpg', pos: '50% 100%', h: 1350, zoom: 1.35, path: () => ({ x: 640, y: 520, r: 210 }) }),
    ],
  }),
  audio: {},
});
