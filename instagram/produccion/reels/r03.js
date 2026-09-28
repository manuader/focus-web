/* R03 · Software / experiencia interactiva · "Tocá la pantalla" · 20 s */
const { text, seq, box, logo, group } = F;
const chip = (t0, t1, n, name, how) => [
  box({ x: 60, y: 250, w: 960, h: 150, t0, t1, style: { background: 'rgba(10,10,11,.78)', backdropFilter: 'blur(10px)', borderTop: '1px solid #3a3d42', borderBottom: '1px solid #3a3d42' } }),
  text({ lines: [`{s:${n}}  ${name}`], cls: 't-eyebrow', size: 30, x: 90, y: 280, t0: t0 + 0.1, t1, by: 'all', style: { color: 'var(--paper)' } }),
  text({ lines: [how], cls: 't-body', size: 38, x: 90, y: 330, w: 900, t0: t0 + 0.3, t1, by: 'word', stagger: 0.05, style: { color: 'var(--g300)' } }),
];
F.mount({
  name: 'focus_reel03_toca-la-pantalla',
  dur: 20,
  cover: 1.9,
  items: [
    seq({ dir: '/instagram/produccion/capturas/superposicion', count: 150, t0: 0, t1: 5.4, fin: 0.3, offset: 0 }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 0, t1: 2.9, fin: 0.01, blur: false, style: { background: 'rgba(10,10,11,.72)' } }),
    text({ lines: ['Esto no es', 'un video editado.'], size: 108, x: 80, y: 640, t0: 0.15, t1: 2.9, by: 'line', lineDelay: 0.3, stagger: 0 }),
    text({ lines: ['Es un sitio respondiendo a un dedo.'], cls: 't-body', size: 50, x: 84, y: 920, t0: 1.2, t1: 2.9, by: 'word', stagger: 0.05, color: 's' }),
    ...chip(3.0, 5.4, '01', 'Superposición', 'Dos círculos en modo diferencia: el color nace donde se cruzan.'),

    seq({ dir: '/instagram/produccion/capturas/refraccion', count: 165, t0: 5.4, t1: 10.8, fin: 0.4 }),
    ...chip(5.8, 10.8, '02', 'Refracción', 'Tres capas de luz siguen el dedo. Soltás y vuelven a ser blanco.'),

    seq({ dir: '/instagram/produccion/capturas/foco', count: 135, t0: 10.8, t1: 15.4, fin: 0.4 }),
    ...chip(11.2, 15.4, '03', 'Foco', 'Tu dedo es la lente. Lo que toca, se enfoca.'),

    text({ lines: ['Diseñamos', 'y *programamos*', 'experiencias así.'], size: 104, x: 80, y: 600, t0: 15.6, by: 'line', lineDelay: 0.35, stagger: 0 }),
    text({ lines: ['Probalo con tu dedo en focuscreatives.net'], cls: 't-body', size: 42, x: 84, y: 1060, w: 900, t0: 17.2, by: 'word', stagger: 0.05, color: 's' }),
    logo({ t0: 18.0, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'min'], [15.6, 'maj']],
    bpm: 92, pulse: [3.0, 15.4],
    events: [[0.2, 'tick'], [3.0, 'click'], [5.4, 'swell'], [5.8, 'click'], [10.8, 'swell'], [11.2, 'click'], [15.6, 'resolve'], [17.2, 'tick']],
  },
});
