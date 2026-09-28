/* Posteo 4:5 de la serie "Sin plantilla" · 08/10 · Umbral.
   Versión estática del anuncio A08: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post08_el-proceso',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 08 / 10',
    eyebrow: 'Umbral',
    lines: ['Qué pasa después', 'de *escribirnos.*'],
    size: 92,
    visual: [
  F.gl({ frag: F.GLSL.slit, t0: -1, fin: 0.01, h: 1350, u: () => ({ uOpen: 0.3, uX: 0.78, uDust: 1, uAmt: 1, uWarm: 0.2 }) }),
  ...[['01', 'Diagnóstico'], ['02', 'Dirección'], ['03', 'Sistema'], ['04', 'Acompañamiento']].flatMap(([n, s], i) => [
    F.text({ lines: [`{s:${n}}`], cls: 't-mono', size: 24, x: 80, y: 260 + i * 110, w: 80, t0: -1, by: 'all', fin: 0.01 }),
    F.text({ lines: [s], size: 60, x: 160, y: 240 + i * 110, w: 560, t0: -1, by: 'all', fin: 0.01 }),
  ]),
    ],
  }),
  audio: {},
});
