/* Posteo 4:5 de la serie "Sin plantilla" · 07/10 · Cáustica.
   Versión estática del anuncio A07: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post07_primera-reunion',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 07 / 10',
    eyebrow: 'Cáustica',
    lines: ['Tu sitio es la', 'primera *reunión.*'],
    size: 96,
    visual: [
  F.gl({ frag: F.GLSL.caustic, t0: -1, fin: 0.01, h: 1350, u: () => ({ uAmt: 0.5, uSplit: 0.014, uScale: 2.4, uTint: 0.3, uSpeed: 0.3, uCenter: [0.5, 0.5], uRadius: 0 }) }),
  F.image({ src: '/instagram/campana-ads-01/produccion/capturas/prisma/0120.jpg', x: 560, y: 200, w: 380, h: 676, t0: -1, fin: 0.01, blur: 0, frame: true }),
    ],
  }),
  audio: {},
});
