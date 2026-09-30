/* RX · BORRADOR · Portfolio de software · "De fisura a Dios" · 20 s.
   Pendiente de decisión del usuario: presentar FisuEvolution (Ader Games) como
   trabajo o producto del equipo de FOCUS (evidencia.md §4 y §5). Todo lo que
   dice es público y verificable: sitio adergames-site (copy), repo
   manuader/fisuevolution (ESTADO.md, 19/07/2026). Lleva la marca BORRADOR en
   pantalla para que no se publique por error. */
const { text, seq, box, logo } = F;
F.mount({
  name: 'focus_reelRX_borrador_fisuevolution',
  dur: 20,
  cover: 2.6,
  items: [
    seq({ dir: '/work/capturas/ader-juego', count: 180, t0: 0, t1: 8.2, rate: 0.85, fin: 0.3 }),
    box({ x: 0, y: 0, w: 1080, h: 300, t0: 0, t1: 16, fin: 0.01, blur: false, style: { background: 'linear-gradient(#0a0a0b 70%, transparent)' } }),
    box({ x: 0, y: 1040, w: 1080, h: 880, t0: 0, t1: 8.2, fin: 0.01, blur: false, style: { background: 'linear-gradient(transparent, #0a0a0b 24%)' } }),
    text({ lines: ['De fisura a Dios.'], cls: 't-head', size: 104, x: 80, y: 1260, t0: 0.2, t1: 3.6, by: 'all', fin: 0.7 }),
    text({ lines: ['Un juego para iPhone,', 'en camino a la App Store.'], cls: 't-body', size: 50, x: 84, y: 1380, t0: 1.0, t1: 3.6, by: 'line', lineDelay: 0.3, stagger: 0 }),
    text({ lines: ['{s:FisuEvolution · merge / idle · iOS 17 o posterior}'], cls: 't-label', size: 24, x: 84, y: 1300, t0: 3.8, t1: 8.2, by: 'all' }),
    text({ lines: ['Treinta niveles,', 'una economía simulada', 'y balanceada a mano.'], cls: 't-body', size: 58, x: 84, y: 1350, t0: 4.0, t1: 8.2, by: 'line', lineDelay: 0.35, stagger: 0 }),

    text({ lines: ['{s:manuader/fisuevolution · ESTADO.md · 19/07/2026}'], cls: 't-mono', size: 24, x: 80, y: 560, t0: 8.5, t1: 12.2, by: 'all', style: { textTransform: 'none', letterSpacing: '0.04em' } }),
    text({ lines: ['Swift 6.', '*121 tests* en verde.'], size: 112, x: 80, y: 620, t0: 8.6, t1: 12.2, by: 'line', lineDelay: 0.5, stagger: 0 }),
    text({ lines: ['Sin cuentas y sin rastreo.'], cls: 't-body', size: 52, x: 84, y: 920, t0: 9.8, t1: 12.2, by: 'all', color: 's' }),

    seq({ dir: '/work/capturas/ader-home', count: 150, t0: 12.2, t1: 16, rate: 1.2, fin: 0.5 }),
    box({ x: 0, y: 1080, w: 1080, h: 840, t0: 12.2, t1: 16, fin: 0.01, blur: false, style: { background: 'linear-gradient(transparent, #0a0a0b 24%)' } }),
    text({ lines: ['Y el sitio del estudio,', 'en español y en inglés.'], cls: 't-body', size: 56, x: 84, y: 1330, t0: 12.6, t1: 16, by: 'line', lineDelay: 0.4, stagger: 0 }),

    text({ lines: ['¿Tenés un producto', 'en camino?'], cls: 't-head', size: 100, x: 80, y: 620, t0: 16.2, by: 'line', lineDelay: 0.3, stagger: 0 }),
    text({ lines: ['Lo diseñamos y lo programamos.'], cls: 't-subserif', size: 56, x: 84, y: 850, t0: 17.0, by: 'all' }),
    text({ lines: ['{s:Ader Games · producto del fundador de FOCUS}'], cls: 't-label', size: 22, x: 84, y: 1000, t0: 17.4, by: 'all' }),
    logo({ t0: 17.8, w: 200, x: 84, y: 1330 }),

    // Marca de borrador: no se publica hasta que el usuario apruebe la atribución.
    box({ x: 700, y: 262, w: 300, h: 56, t0: 0, fin: 0.01, blur: false, html: '<div style="border:2px solid #ff00ff;color:#ff00ff;font-weight:800;letter-spacing:.2em;font-size:24px;text-align:center;line-height:52px">BORRADOR</div>' }),
  ],
  audio: {
    chords: [[0, 'sus'], [8.5, 'min'], [16.2, 'maj']],
    bpm: 96, pulse: [0.2, 16],
    events: [[0.2, 'tick'], [3.8, 'click'], [8.5, 'low'], [8.7, 'tick'], [9.2, 'tick', 0.7], [12.2, 'swell'], [16.2, 'resolve'], [17.4, 'click']],
  },
});
