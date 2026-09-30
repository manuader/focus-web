/* C02 · Criterio · "Siete preguntas antes de publicar" · 9 cuadros.
   Es el test de pertenencia de la skill, abierto al público. */
const { text, box, rings, reticle } = F;
const Q = [
  ['¿Hay un solo punto de foco?', 'Si todo pide atención, nada la recibe.'],
  ['¿El color es luz o es fondo?', 'Un acento bien puesto rinde más que una paleta entera.'],
  ['¿Cuántas tipografías hay?', 'Una familia alcanza. La jerarquía sale de la escala y el peso.'],
  ['¿Cómo se mueve?', 'Lento para entrar, preciso para resolver. Nada rebota.'],
  ['¿Suena a vos o a cualquiera?', 'Si otra marca puede firmarla tal cual, todavía no es tuya.'],
  ['¿Todo lo que dice es cierto?', 'Sin cifras infladas ni casos que no pasaron.'],
  ['¿Termina resuelta?', 'El desorden puede ser el comienzo. Nunca el final.'],
];
F.deck({
  name: 'focus_car02_siete-preguntas', format: 'post',
  frames: [
    (i) => [
      rings({ t0: i, fin: 0.01, cx: 780, cy: 420, size: 900, color: 'var(--g700)', accentRing: 3, accent: 'g' }),
      text({ lines: ['Siete preguntas', 'que le hacemos', 'a cada pieza', 'antes de *publicarla.*'], size: 96, x: 80, y: 560, t0: i, by: 'all' }),
      text({ lines: ['Guardalo. Sirve para cualquier marca.'], cls: 't-body', size: 40, x: 80, y: 1080, t0: i, by: 'all', color: 's' })],
    ...Q.map(([q, a], k) => (i) => [
      text({ lines: [`{s:${String(k + 1).padStart(2, '0')}}`], cls: 't-bold', size: 220, x: 60, y: 120, t0: i, by: 'all', style: { color: 'var(--g700)' } }),
      text({ lines: [q], size: 88, x: 80, y: 520, w: 920, t0: i, by: 'all' }),
      text({ lines: [a], cls: 't-body', size: 48, x: 80, y: 820, w: 900, t0: i, by: 'all', color: 's' }),
      box({ x: 80, y: 1120, w: 56, h: 3, t0: i, fin: 0.01, blur: false, style: { background: ['#FF00FF', '#0033FF', '#00FF33'][k % 3] } })]),
    (i) => [
      text({ lines: ['Si una pieza', 'no pasa las siete,', 'no *sale.*'], size: 104, x: 80, y: 330, t0: i, by: 'all' }),
      text({ lines: ['¿Cuántas pasa tu último posteo?', 'Contanos en los comentarios.'], cls: 't-body', size: 46, x: 80, y: 800, t0: i, by: 'all', color: 's' })],
  ],
});
