/* S04 · Casos en 15 segundos · 4 historias con links y menciones reales */
const { text, image, logo } = F;
const C = (id) => `/public/assets/clients/${id}-card.jpg`;
F.deck({
  name: 'focus_hist04_casos', counter: false,
  frames: [
    (i) => [...['ader-studio', 'oushy', 'toplaser-web', 'chillin', 'santa-tuca', 'toplaser', 'chuchones', 'rsh-consultora', 'fernanda-estetica'].map((id, k) =>
        image({ src: C(id), x: 80 + (k % 3) * 315, y: 300 + Math.floor(k / 3) * 330, w: 290, h: 300, t0: i, fin: 0.01, blur: 0 })),
      text({ lines: ['Nueve trabajos.', 'Tocá para verlos.'], size: 84, x: 80, y: 1320, t0: i, by: 'all' })],
    (i) => [text({ lines: ['Sitios'], cls: 't-eyebrow', size: 30, x: 80, y: 260, t0: i, by: 'all', style: { color: '#FF00FF' } }),
      ...[['ader-studio', 'Ader Studio'], ['oushy', 'OUSHY Studio'], ['toplaser-web', 'Top Láser']].flatMap(([id, n], k) => [
        image({ src: C(id), x: 80, y: 330 + k * 400, w: 300, h: 340, t0: i, fin: 0.01, blur: 0 }),
        text({ lines: [n], size: 60, x: 420, y: 430 + k * 400, t0: i, by: 'all' })])],
    (i) => [text({ lines: ['Redes, todos los meses'], cls: 't-eyebrow', size: 30, x: 80, y: 260, t0: i, by: 'all', style: { color: '#5B8CFF' } }),
      ...[['chillin', '@chillin1390bar'], ['chuchones', '@chuchones_wines'], ['rsh-consultora', '@rsh_consultora'], ['fernanda-estetica', '@esteticaintegralfernanda']].flatMap(([id, n], k) => [
        image({ src: C(id), x: 80, y: 330 + k * 300, w: 240, h: 260, t0: i, fin: 0.01, blur: 0 }),
        text({ lines: [n], cls: 't-body', size: 44, x: 360, y: 430 + k * 300, t0: i, by: 'all' })])],
    (i) => [text({ lines: ['Tu caso *acá.*'], size: 140, x: 80, y: 560, t0: i, by: 'all' }),
      text({ lines: ['30 minutos para contarnos', 'qué querés construir.'], cls: 't-body', size: 52, x: 84, y: 800, t0: i, by: 'all', color: 's' }),
      logo({ t0: i, fin: 0.01, w: 200, x: 84, y: 1420 })],
  ],
});
