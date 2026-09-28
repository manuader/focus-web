/* Posteo 4:5 de la serie "Sin plantilla" · 01/10 · Superposición.
   Versión estática del anuncio A01: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post01_sin-plantilla',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 01 / 10',
    eyebrow: 'Superposición',
    lines: ['Usamos IA.', 'No usamos', '*plantillas.*'],
    size: 84,
    visual: [
  F.box({ x: 250, y: 330, w: 400, h: 400, t0: -1, fin: 0.01, blur: false, style: { borderRadius: '50%', background: '#ff00ff', mixBlendMode: 'difference' } }),
  F.box({ x: 430, y: 450, w: 400, h: 400, t0: -1, fin: 0.01, blur: false, style: { borderRadius: '50%', background: '#00ff33', mixBlendMode: 'difference' } }),
    ],
  }),
  audio: {},
});
