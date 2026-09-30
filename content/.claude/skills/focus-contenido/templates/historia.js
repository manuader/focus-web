/* Plantilla de historias FOCUS · 1080×1920. Copiala con ./focus new <campaña> historia <slug>.
   Dejá libre la zona del sticker nativo (encuesta, quiz, pregunta, link) y anotala en la ficha. */
const { text, rings, logo } = F;
F.deck({
  name: 'NOMBRE_PIEZA', counter: false,
  frames: [
    (i) => [text({ lines: ['Primera historia:', 'qué vas a ver.'], size: 112, x: 80, y: 560, t0: i, by: 'all' })],
    (i) => [text({ lines: ['Pregunta para', 'el sticker.'], size: 112, x: 80, y: 420, t0: i, by: 'all' })],  // sticker en y 950–1250
    (i) => [rings({ t0: i, fin: 0.01, cx: 900, cy: 400, size: 800, accentRing: 2, accent: 'g' }),
      text({ lines: ['Cierre.'], cls: 't-head', size: 140, x: 80, y: 600, t0: i, by: 'all' }),
      logo({ t0: i, fin: 0.01, w: 200, x: 84, y: 1380 })],
  ],
});
