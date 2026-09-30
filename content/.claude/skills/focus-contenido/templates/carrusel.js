/* Plantilla de carrusel FOCUS · 1080×1350. Copiala con ./focus new <campaña> carrusel <slug>. */
const { text, rings, logo } = F;
const eb = (s, i) => text({ lines: [s], cls: 't-eyebrow', size: 38, x: 80, y: 90, t0: i, by: 'all' });
F.deck({
  name: 'NOMBRE_PIEZA', format: 'post',
  frames: [
    (i) => [rings({ t0: i, fin: 0.01, cx: 820, cy: 420, size: 900, accentRing: 3, accent: 'g' }),
      text({ lines: ['Titular de portada'], cls: 't-head', size: 104, x: 80, y: 820, t0: i, by: 'all' }),
      text({ lines: ['bajada en serif'], cls: 't-subserif', size: 60, x: 84, y: 960, t0: i, by: 'all' })],
    (i) => [eb('Eyebrow de sección', i),
      text({ lines: ['Un enunciado por cuadro,', 'con una palabra en *énfasis.*'], size: 84, x: 80, y: 320, t0: i, by: 'all' }),
      text({ lines: ['Cuerpo en Light, gris, hasta tres líneas.'], cls: 't-body', size: 44, x: 80, y: 700, w: 920, t0: i, by: 'all', color: 's' })],
    (i) => [text({ lines: ['Enfoquemos'], cls: 't-head', size: 136, x: 80, y: 300, t0: i, by: 'all' }),
      text({ lines: ['lo que ya es tuyo'], cls: 't-subserif', size: 76, x: 84, y: 450, t0: i, by: 'all' }),
      logo({ t0: i, fin: 0.01, w: 240, x: 80, y: 1040, sub: 'El punto donde todo cambia' })],
  ],
});
