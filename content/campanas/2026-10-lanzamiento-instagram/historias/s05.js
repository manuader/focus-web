/* S05 · Hablemos · 4 historias */
const { text, rings, logo } = F;
F.deck({
  name: 'focus_hist05_hablemos', counter: false,
  frames: [
    (i) => [text({ lines: ['Antes de', 'escribirnos,', 'tres cosas.'], size: 128, x: 80, y: 520, t0: i, by: 'all' })],
    (i) => [text({ lines: ['{s:01}'], cls: 't-mono', size: 30, x: 80, y: 520, t0: i, by: 'all' }),
      text({ lines: ['Trabajamos', 'en español', 'y en *inglés.*'], size: 124, x: 80, y: 570, t0: i, by: 'all' })],
    (i) => [text({ lines: ['{s:02}'], cls: 't-mono', size: 30, x: 80, y: 460, t0: i, by: 'all' }),
      text({ lines: ['Marca, contenido,', 'web y software.'], size: 104, x: 80, y: 510, t0: i, by: 'all' }),
      text({ lines: ['En un mismo equipo.'], size: 104, x: 80, y: 740, t0: i, by: 'all', color: 's' })],
    (i) => [rings({ t0: i, fin: 0.01, cx: 900, cy: 400, size: 800, color: 'var(--g700)', accentRing: 2, accent: 'g' }),
      text({ lines: ['{s:03}'], cls: 't-mono', size: 30, x: 80, y: 520, t0: i, by: 'all' }),
      text({ lines: ['Se empieza con', 'una llamada', 'de 30 minutos.'], size: 112, x: 80, y: 570, t0: i, by: 'all' }),
      text({ lines: ['O por WhatsApp: +54 9 11 5926 4267'], cls: 't-body', size: 42, x: 84, y: 1300, t0: i, by: 'all', color: 's' })],
  ],
});
