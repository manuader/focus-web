/* C05 · Estrategia · "Antes de cambiar tu marca" · 8 cuadros */
const { text, box, rings } = F;
const Q = [
  ['¿Qué ya es tuyo y no hay que tocar?', 'Un color, una palabra, un gesto. Lo que la gente ya reconoce se cuida, no se tira.'],
  ['¿Qué dice hoy tu marca que no querés decir?', 'Barata, vieja, igual a otras. Nombrarlo es la mitad del trabajo.'],
  ['¿Dónde te ven primero?', 'Instagram, la vidriera, un sitio, un envase. Ahí se decide todo lo demás.'],
  ['¿Con quién te confunden?', 'El ángulo propio está justo en esa diferencia.'],
  ['¿Qué tiene que pasar para que digas que funcionó?', 'Sin esa respuesta, cualquier resultado parece bueno. O ninguno.'],
];
const C3 = ['#FF00FF', '#5B8CFF', '#00FF33', '#FF00FF', '#5B8CFF'];
F.deck({
  name: 'focus_car05_antes-de-cambiar-tu-marca', format: 'post',
  frames: [
    (i) => [
      text({ lines: ['ANTES DE CAMBIAR'], cls: 't-head', size: 100, x: 80, y: 420, t0: i, by: 'all' }),
      text({ lines: ['TU MARCA, RESPONDÉ ESTO'], cls: 't-light-it t-caps', size: 62, x: 84, y: 530, t0: i, by: 'all' }),
      text({ lines: ['Cinco preguntas. Ninguna es sobre el logo.'], cls: 't-body', size: 42, x: 84, y: 700, t0: i, by: 'all', color: 's' }),
      rings({ t0: i, fin: 0.01, cx: 900, cy: 1200, size: 800, color: 'var(--g700)', accentRing: 1, accent: 'b' })],
    ...Q.map(([q, a], k) => (i) => [
      box({ x: 80, y: 120, w: 14, h: 14, t0: i, fin: 0.01, blur: false, style: { borderRadius: '50%', background: C3[k], boxShadow: `0 0 14px ${C3[k]}` } }),
      text({ lines: [`{s:Pregunta ${k + 1} de 5}`], cls: 't-mono', size: 24, x: 110, y: 112, t0: i, by: 'all' }),
      text({ lines: [q], size: 86, x: 80, y: 330, w: 920, t0: i, by: 'all' }),
      text({ lines: [a], cls: 't-body', size: 46, x: 80, y: 850, w: 900, t0: i, by: 'all', color: 's' })]),
    (i) => [
      text({ lines: ['Si tenés', 'las cinco,', 'ya empezamos.'], size: 112, x: 80, y: 300, t0: i, by: 'all' }),
      text({ lines: ['Mandanos tus respuestas por DM.', 'Te decimos por dónde seguiríamos.'], cls: 't-body', size: 46, x: 80, y: 780, t0: i, by: 'all', color: 's' })],
    (i) => [
      text({ lines: ['Guardalo', 'y mandáselo a quien', 'decide la marca con vos.'], size: 88, x: 80, y: 360, t0: i, by: 'all' }),
      F.logo({ t0: i, fin: 0.01, w: 220, x: 80, y: 1040, sub: 'El punto donde todo cambia' })],
  ],
});
