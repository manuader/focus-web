/* Posteo 4:5 de la serie "Sin plantilla" · 06/10 · Exposición larga.
   Versión estática del anuncio A06: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post06_el-flujo',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 06 / 10',
    eyebrow: 'Exposición larga',
    lines: ['Agentes para producir.', 'Personas para *decidir.*'],
    size: 72,
    visual: [
  F.gl({ frag: F.GLSL.trails, t0: -1, fin: 0.01, h: 1350, u: () => ({ uHead: 1, uConv: 1, uAmt: 1, uHi: -1 }) }),
    ],
  }),
  audio: {},
});
