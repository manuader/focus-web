/* S02 · Test de foco (quiz) · 4 historias */
const { text, box, logo } = F;
const A = `<div style="position:absolute;inset:0;background:#17181b;padding:26px;font-family:Arial,sans-serif;overflow:hidden">
<div style="font-size:30px;font-weight:900;color:#ff00ff">¡NUEVO!</div><div style="font-size:40px;font-weight:900;color:#fff;line-height:1">CALIDAD · DISEÑO · INNOVACIÓN</div>
<div style="margin-top:14px;font-size:24px;color:#00ff33">Soluciones 360° para tu negocio</div><div style="margin-top:10px;font-size:24px;color:#5b8cff">Consultá sin compromiso</div>
<div style="margin-top:14px;font-size:30px;font-weight:900;color:#ffe600">¡Promo de lanzamiento!</div><div style="margin-top:12px;font-size:22px;color:#a7acb4">+ envíos · + cuotas · + garantía</div></div>`;
const B = `<div style="position:absolute;inset:0;background:#0a0a0b;overflow:hidden">
<div style="position:absolute;left:150px;top:20px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,51,.45),rgba(0,255,51,0) 65%)"></div>
<div style="position:absolute;left:28px;bottom:40px;font-weight:300;font-size:52px;line-height:1.02;color:#f6f6f4;letter-spacing:-.02em">Una sola<br>idea.</div></div>`;
F.deck({
  name: 'focus_hist02_test-de-foco', counter: false,
  frames: [
    (i) => [text({ lines: ['Test de', '10 segundos.'], size: 132, x: 80, y: 600, t0: i, by: 'all' }),
      text({ lines: ['Sin trampa.'], cls: 't-body', size: 56, x: 84, y: 920, t0: i, by: 'all', color: 's' })],
    (i) => [text({ lines: ['¿Cuál se lee', 'primero?'], size: 96, x: 80, y: 260, t0: i, by: 'all' }),
      text({ lines: ['A'], cls: 't-mono', size: 30, x: 80, y: 520, t0: i, by: 'all' }),
      box({ x: 80, y: 570, w: 440, h: 560, t0: i, fin: 0.01, blur: false, html: A, style: { border: '1px solid #3a3d42' } }),
      text({ lines: ['B'], cls: 't-mono', size: 30, x: 560, y: 520, t0: i, by: 'all' }),
      box({ x: 560, y: 570, w: 440, h: 560, t0: i, fin: 0.01, blur: false, html: B, style: { border: '1px solid #3a3d42' } })],
    (i) => [text({ lines: ['B.'], cls: 't-head', size: 300, x: 80, y: 420, t0: i, by: 'all', rgb: true, rgbCurve: () => 5 }),
      text({ lines: ['Un solo punto de foco.', 'El ojo va a donde', 'hay menos ruido.'], size: 76, x: 80, y: 800, t0: i, by: 'all' })],
    (i) => [text({ lines: ['La versión larga', 'está en el último reel.'], size: 88, x: 80, y: 560, t0: i, by: 'all' }),
      text({ lines: ['Compartíselo a quien arma', 'los posteos de tu marca.'], cls: 't-body', size: 48, x: 84, y: 820, t0: i, by: 'all', color: 's' }),
      logo({ t0: i, fin: 0.01, w: 200, x: 84, y: 1380 })],
  ],
});
