/* R02 · Demostración visual · servicios · "Siete disciplinas, un haz" · 20 s */
const { text, beam, seq, box, logo } = F;
const SPEC7 = ['#FF00FF', '#C010FF', '#8020FF', '#0033FF', '#0080DD', '#00C088', '#00FF33'];
const SERV = ['Identidad', 'Dirección de arte', 'Social media', 'Audiovisual', 'Estrategia', 'Web', 'Packaging'];
// Destinos desparejos a propósito: una marca armada por partes.
const TG = [{ x: 150, y: 1010 }, { x: 330, y: 1210 }, { x: 470, y: 960 }, { x: 610, y: 1250 }, { x: 760, y: 1040 }, { x: 900, y: 1190 }, { x: 980, y: 930 }];
F.mount({
  name: 'focus_reel02_siete-disciplinas',
  dur: 20,
  cover: 9.6,
  items: [
    beam({ mode: 'split', t0: 0, t1: 5.6, fout: 0.5, source: { x: 540, y: 0 }, prism: { x: 540, y: 700, size: 100 }, targets: TG, colors: SPEC7, beam: [0, 0.9], bands: [0.9, 2.2], stagger: 0.12, bandW: 3 }),
    ...SERV.map((s, i) => text({ lines: [s], cls: 't-eyebrow', size: 28, x: TG[i].x - 110, w: 220, align: 'center', y: TG[i].y + 18, t0: 1.6 + i * 0.1, t1: 5.6, by: 'all', style: { color: SPEC7[i] === '#0033FF' ? '#5B8CFF' : SPEC7[i], letterSpacing: '0.08em' } })),
    text({ lines: ['Un logo por acá.', 'El sitio, por allá.', 'Los posteos, de otro.'], size: 64, cls: 't-body', x: 80, y: 290, t0: 0.2, t1: 5.6, by: 'line', lineDelay: 0.85, stagger: 0 }),
    text({ lines: ['Así se ve una marca', 'armada por partes.'], size: 52, cls: 't-body', x: 80, y: 1500, anchor: 'bottom', t0: 3.2, t1: 5.6, by: 'word', stagger: 0.06, color: 's' }),

    // El prisma real del sitio: el espectro entra, sale un solo haz.
    text({ lines: ['Siete disciplinas.'], size: 92, x: 80, y: 280, t0: 5.8, t1: 13, by: 'all' }),
    seq({ dir: '/instagram/produccion/capturas/prisma', count: 210, t0: 5.6, t1: 13, x: 0, y: 440, w: 1080, h: 880, pos: '50% 45%', zoom: [1.02, 1.1] }),
    text({ lines: ['Un solo *criterio.*'], size: 92, x: 80, y: 1350, t0: 8.6, t1: 13, by: 'all' }),

    // La lista, con el color de su banda.
    text({ lines: SERV.map((s, i) => s), size: 66, x: 150, y: 420, t0: 13.2, t1: 17.2, by: 'line', lineDelay: 0.16, stagger: 0,
      lineStyle: (i) => ({ position: 'relative', lineHeight: '1.5' }) }),
    ...SPEC7.map((c, i) => box({ x: 84, y: 420 + i * 99 + 36, w: 30, h: 30, t0: 13.2 + i * 0.16, t1: 17.2, style: { borderRadius: '50%', background: c, boxShadow: `0 0 18px ${c}` } })),
    text({ lines: ['Contratás un estudio.', '{s:No siete.}'], size: 56, cls: 't-body', x: 84, y: 1200, t0: 14.6, t1: 17.2, by: 'line', lineDelay: 0.7, stagger: 0 }),

    text({ lines: ['Tu marca:', '*hablemos.*'], size: 132, x: 80, y: 620, t0: 17.4, by: 'word', stagger: 0.2 }),
    logo({ t0: 18.3, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'sus'], [5.6, 'min'], [11, 'maj']],
    bpm: 84, pulse: [5.6, 17.2],
    events: [[0.05, 'swell'], [0.9, 'click'], [5.6, 'low'], [5.9, 'tick'], [8.7, 'tick'], [11.2, 'resolve'], [13.2, 'click', 0.3], [17.5, 'tick'], [18.3, 'swell']],
  },
});
