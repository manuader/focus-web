/* C04 · Software · "Anatomía de un sitio que se mueve" · 7 cuadros.
   Capturas reales de focuscreatives.net en un teléfono. */
const { text, image, box } = F;
const cap = (dir, n) => `/instagram/produccion/capturas/${dir}/${String(n).padStart(4, '0')}.jpg`;
const part = (i, n, name, how, tech, src, pos) => [
  image({ src, x: 80, y: 90, w: 470, h: 835, t0: i, fin: 0.01, blur: 0, pos: pos || 'center', frame: true }),
  text({ lines: [`{s:${n}}`], cls: 't-mono', size: 24, x: 600, y: 110, t0: i, by: 'all' }),
  text({ lines: [name], size: 64, x: 600, y: 150, w: 420, t0: i, by: 'all' }),
  text({ lines: [how], cls: 't-body', size: 38, x: 600, y: 260, w: 400, t0: i, by: 'all' }),
  text({ lines: [`{s:${tech}}`], cls: 't-body', size: 28, x: 600, y: 700, w: 400, t0: i, by: 'all', style: { lineHeight: '1.4' } }),
];
F.deck({
  name: 'focus_car04_anatomia-de-un-sitio', format: 'post',
  frames: [
    (i) => [
      image({ src: cap('prisma', 200), x: 0, y: 0, w: 1080, h: 1350, t0: i, fin: 0.01, blur: 0, pos: '50% 62%' }),
      box({ x: 0, y: 700, w: 1080, h: 650, t0: i, fin: 0.01, blur: false, style: { background: 'linear-gradient(transparent, rgba(10,10,11,.95) 55%)' } }),
      text({ lines: ['Anatomía de un sitio', 'que se *mueve.*'], size: 92, x: 80, y: 1000, t0: i, by: 'all' }),
      text({ lines: ['focuscreatives.net, desarmado en cinco piezas.'], cls: 't-body', size: 36, x: 80, y: 1210, t0: i, by: 'all', color: 's' })],
    (i) => part(i, '01', 'Superposición', 'Dos círculos se cruzan y el color nace solo en el cruce.', 'mix-blend-mode: difference. Un círculo orbita solo; el otro sigue tu dedo.', cap('superposicion', 90)),
    (i) => part(i, '02', 'Prisma', 'Los siete servicios entran como espectro. Sale un solo haz: tu marca.', 'Animado por scroll. En teléfono, un prisma vertical propio.', cap('prisma', 190)),
    (i) => part(i, '03', 'Refracción', 'La palabra se separa en tres capas de luz y vuelve a ser blanca.', 'Tres capas en modo screen, cada una con su propio desplazamiento.', cap('refraccion', 40)),
    (i) => part(i, '04', 'Umbral', 'Bajás y la puerta se abre hacia el póster de marca.', 'Una máscara que crece con el scroll.', cap('umbral', 120)),
    (i) => part(i, '05', 'Foco', 'Tu dedo es la lente. Lo que toca, se enfoca.', 'En pantallas táctiles, un puntero virtual reemplaza al cursor.', cap('foco', 70)),
    (i) => [
      text({ lines: ['Diseño y código', 'salen de la', 'misma *mesa.*'], size: 108, x: 80, y: 300, t0: i, by: 'all' }),
      text({ lines: ['Productos digitales, sitios y experiencias', 'interactivas. Contanos qué querés construir.'], cls: 't-body', size: 42, x: 80, y: 760, t0: i, by: 'all', color: 's' }),
      F.logo({ t0: i, fin: 0.01, w: 220, x: 80, y: 1040 })],
  ],
});
