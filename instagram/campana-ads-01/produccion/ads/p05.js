/* Posteo 4:5 de la serie "Sin plantilla" · 05/10 · Densidad.
   Versión estática del anuncio A05: sirve como posteo de feed y como
   variante estática del anuncio para ubicaciones de feed (4:5). */
F.mount({
  name: 'focus_post05_una-decision',
  format: 'post',
  dur: 1,
  still: 0.5,
  cover: 0.5,
  items: F.post({
    serie: 'Sin plantilla · 05 / 10',
    eyebrow: 'Densidad',
    lines: ['Una decisión.', 'Todos los *lugares.*'],
    size: 84,
    visual: [
  F.gl({ frag: F.GLSL.density, t0: -1, fin: 0.01, h: 1350, u: () => ({ uZoom: 2.6, uAmt: 0.9, uAccent: 1, uC: [0.5, 0.6] }) }),
  { create(root) { const d = F.el('div', 'abs', { width: '240px', height: '270px', left: '420px', top: '405px', overflow: 'hidden' }, root); const i = F.el('img', null, { position: 'absolute', width: 3656 * 0.36 + 'px', left: -(1835 * 0.36 - 120) + 'px', top: -(637 * 0.36 - 135) + 'px' }, d); i.src = '/instagram/campana-ads-01/produccion/assets/focus-logo-light@8x.png'; F.wait(i.decode().catch(() => {})); }, update() {} },
    ],
  }),
  audio: {},
});
