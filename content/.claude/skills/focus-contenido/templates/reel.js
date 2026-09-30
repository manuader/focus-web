/* Plantilla de reel FOCUS · 20 s. Copiala con ./focus new <campaña> reel <slug>.
   Reglas: skill focus-identidad. Un gesto dominante por pieza; gancho en los
   primeros 2 s; texto que se lee (0,3 s por palabra); cierre resuelto. */
const { text, rings, logo } = F;
F.mount({
  name: 'NOMBRE_PIEZA',
  dur: 20,
  cover: 2.4, // segundo del cuadro asentado más fuerte (va como cuadro 0)
  items: [
    // Gancho: un enunciado que diga qué vas a ver.
    text({ lines: ['Enunciado de gancho', 'en dos líneas.'], size: 110, x: 80, y: 620, t0: 0.1, t1: 5, by: 'line', lineDelay: 0.3, stagger: 0 }),
    // Desarrollo: un gesto (acá, anillos) y una idea por plano.
    rings({ t0: 5, t1: 15, cx: 540, cy: 900, size: 1400, accentRing: 2 }),
    text({ lines: ['Una idea por plano,', 'con una palabra en *énfasis.*'], size: 88, x: 80, y: 700, t0: 5.4, t1: 15, by: 'word', stagger: 0.08 }),
    // Cierre como el Contacto del sitio: titular en mayúsculas + bajada serif + logo.
    text({ lines: ['Hablemos.'], cls: 't-head', size: 140, x: 80, y: 640, t0: 15.4, by: 'all' }),
    text({ lines: ['focuscreatives.net'], cls: 't-subserif', size: 60, x: 84, y: 800, t0: 16.2, by: 'all' }),
    logo({ t0: 17, w: 200, x: 84, y: 1330 }),
  ],
  audio: { chords: [[0, 'min'], [15.4, 'maj']], events: [[0.2, 'tick'], [5, 'swell'], [15.5, 'resolve']] },
});
