/* R08 · Pieza tipográfica · "Tu marca dice demasiado" · 18 s.
   Una retícula recorre un párrafo de clichés: nada queda en foco. */
const { text, reticle, box, logo } = F;
const NOISE = 'calidad innovación pasión compromiso excelencia soluciones confianza experiencia resultados creatividad calidez tradición vanguardia cercanía profesionalismo trayectoria diseño estrategia impacto energía propósito valor';
const lensPath = (t) => {
  // barre en S por el párrafo y termina fija en el centro vacío
  const k = F.io(F.p(t, 2.6, 8.4));
  const x = 540 + 360 * Math.sin(k * Math.PI * 3);
  const y = 420 + k * 760;
  const s = 1 + 0.06 * Math.sin(t * 5);
  return { x, y, s, r: t * 8 };
};
F.mount({
  name: 'focus_reel08_tu-marca-dice-demasiado',
  dur: 18,
  cover: 2.2,
  items: [
    text({ lines: ['Veintidós palabras.', 'Ninguna es tuya.'], size: 100, x: 80, y: 250, t0: 0, t1: 2.5, by: 'line', lineDelay: 0.3, stagger: 0, fin: 0.6 }),
    text({ lines: [NOISE], size: 74, x: 80, y: 560, w: 920, t0: 0.2, t1: 9.4, by: 'word', stagger: 0.03, color: 's', style: { lineHeight: '1.18' },
      lens: { path: lensPath, r: 170, max: 13, on: (t) => F.p(t, 2.2, 2.8) }, fout: 0.9 }),
    reticle({ t0: 2.6, t1: 9.4, size: 380, path: lensPath }),
    text({ lines: ['Nadie las recuerda', 'todas.'], size: 92, x: 80, y: 1260, t0: 5.2, t1: 9.4, by: 'line', lineDelay: 0.5, stagger: 0 }),

    text({ lines: ['Se quedan con *una.*'], size: 128, x: 80, y: 760, t0: 9.8, t1: 12.8, by: 'word', stagger: 0.3, blur: 24 }),
    text({ lines: ['¿Cuál es la tuya?'], size: 112, x: 80, y: 760, t0: 12.9, by: 'all', rgb: true, rgbAmp: 28 }),
    text({ lines: ['Dejala en comentarios.', 'Elegirla es nuestro trabajo.'], cls: 't-body', size: 46, x: 84, y: 950, t0: 14.0, by: 'line', lineDelay: 0.5, stagger: 0, color: 's' }),
    logo({ t0: 16.2, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'min'], [9.8, 'sus'], [12.9, 'maj']],
    events: [[0.1, 'click'], [2.6, 'swell'], [4.0, 'tick', 0.2], [5.9, 'tick', 0.8], [7.8, 'tick', 0.3], [9.4, 'low'], [10.1, 'tick'], [10.4, 'resolve'], [12.9, 'swell'], [14.0, 'tick']],
  },
});
