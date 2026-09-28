/* S03 · Detrás del sitio · 4 historias */
const { text, image, box } = F;
const cap = (dir, n) => `/instagram/produccion/capturas/${dir}/${String(n).padStart(4, '0')}.jpg`;
const CODE = `<pre style="margin:0;padding:44px;font-family:ui-monospace,Menlo,monospace;font-size:30px;line-height:1.5;color:#a7acb4;white-space:pre-wrap">
<span style="color:#7c818a">/* The spectrum, one stop per service.
   It runs through the brand's three
   additive primaries (magenta, blue,
   green) rather than a literal rainbow */</span>
<span style="color:#f6f6f4">export const SPECTRUM = [</span>
  <span style="color:#FF00FF">'#FF00FF'</span>, <span style="color:#C010FF">'#C010FF'</span>,
  <span style="color:#8020FF">'#8020FF'</span>, <span style="color:#5B8CFF">'#0033FF'</span>,
  <span style="color:#0080DD">'#0080DD'</span>, <span style="color:#00C088">'#00C088'</span>,
  <span style="color:#00FF33">'#00FF33'</span>,
<span style="color:#f6f6f4">] as const;</span></pre>`;
F.deck({
  name: 'focus_hist03_detras-del-sitio', counter: false,
  frames: [
    (i) => [image({ src: cap('prisma', 205), t0: i, fin: 0.01, blur: 0 }),
      box({ x: 0, y: 1100, w: 1080, h: 820, t0: i, fin: 0.01, blur: false, style: { background: 'linear-gradient(transparent, rgba(10,10,11,.94) 35%)' } }),
      text({ lines: ['34 commits para que', 'esto funcione en', 'tu teléfono.'], size: 76, x: 80, y: 1250, t0: i, by: 'all' })],
    (i) => [text({ lines: ['{s:src/components/sections/spectrum.ts}'], cls: 't-mono', size: 24, x: 80, y: 300, t0: i, by: 'all', style: { textTransform: 'none', letterSpacing: '0.02em' } }),
      box({ x: 60, y: 360, w: 960, h: 640, t0: i, fin: 0.01, blur: false, html: CODE, style: { background: '#17181b', border: '1px solid #3a3d42' } }),
      text({ lines: ['Siete colores, uno por servicio.', 'Solo magenta, azul y verde:', 'el manual no permite otros.'], cls: 't-body', size: 50, x: 80, y: 1070, t0: i, by: 'all' })],
    (i) => [image({ src: cap('refraccion', 45), t0: i, fin: 0.01, blur: 0 }),
      box({ x: 0, y: 0, w: 1080, h: 700, t0: i, fin: 0.01, blur: false, style: { background: 'linear-gradient(rgba(10,10,11,.95) 55%, transparent)' } }),
      text({ lines: ['Y se prueba con el dedo,', 'no solo con el mouse.'], size: 70, x: 80, y: 280, t0: i, by: 'all' })],
    (i) => [text({ lines: ['¿Qué interacción', 'querés que', 'desarmemos?'], size: 112, x: 80, y: 420, t0: i, by: 'all' })],
  ],
});
