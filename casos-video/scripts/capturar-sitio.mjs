/* Captura el recorrido de un sitio en formato móvil como secuencia de
   cuadros, un screenshot por cuadro de video. El scroll se fija por cuadro
   (no se graba en tiempo real), así el resultado es el mismo en cada corrida.

   uso: node casos-video/scripts/capturar-sitio.mjs <id> [<id>…]
   sale: casos-video/work/<id>/sitio/f_0001.jpg…  y  casos-video/casos/<id>/media/sitio.mp4 */
import { chromium } from './playwright.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FPS = 30;
/** Viewport de la web dentro del teléfono: 390 de ancho, 844 menos barra de
    estado y barra de dirección. */
const VW = 390, VH = 742;

/* Recorridos. `y` va en alturas de viewport (vh); `dur` en segundos de video.
   `flick` es un salto rápido entre secciones, como un gesto de dedo. */
const SITES = {
  'ader-studio': {
    url: 'https://ader-studio.vercel.app',
    /* El sitio abre con una brújula que gira al tocarla y se asienta en el logo. */
    tap: { x: 195, y: 330, at: 0.5 },
    path: [
      { hold: 2.1 },
      { to: 2.3, dur: 2.2 },
      { to: 11.1, dur: 0.55, flick: true },
      { to: 12.5, dur: 2.3 },
      { to: 'end', dur: 0.6, flick: true },
      { hold: 1.2 },
    ],
  },
  oushy: {
    url: 'https://oushy-web.vercel.app',
    path: [
      { hold: 1.0 },
      { to: 1.35, dur: 2.0 },
      { to: 2.45, dur: 0.5, flick: true },
      { to: 3.7, dur: 2.2 },
      { to: 7.2, dur: 0.55, flick: true },
      { to: 8.3, dur: 1.6 },
      { to: 'end', dur: 0.5, flick: true },
      { hold: 0.7 },
    ],
  },
  'top-laser-web': {
    url: 'https://toplaserimprenta.com',
    path: [
      { hold: 1.0 },
      { to: 1.3, dur: 1.9 },
      { to: 3.55, dur: 0.5, flick: true },
      { hold: 1.0 },
      { to: 8.6, dur: 0.6, flick: true },
      { to: 9.9, dur: 2.4 },
      { to: 11.7, dur: 0.6, flick: true },
      { hold: 1.0 },
    ],
  },
};

const ease = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
const easeFlick = (x) => (x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2);

const b = await chromium.launch({ headless: true });
for (const id of process.argv.slice(2)) {
  const site = SITES[id];
  if (!site) throw new Error(`sin recorrido para ${id}`);
  const dir = path.join(ROOT, 'work', id, 'sitio');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await b.newContext({
    viewport: { width: VW, height: VH }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'es-AR',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();
  await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3500);
  // Recorre la página una vez para que carguen las imágenes diferidas.
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  if (!site.tap) {
    for (let y = 0; y < H; y += VH) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(350); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
  }
  const maxY = (await page.evaluate(() => document.documentElement.scrollHeight)) - VH;

  let f = 0, y = 0, t = 0, tapped = false;
  const shot = async (yy) => {
    await page.evaluate((v) => window.scrollTo(0, v), Math.round(yy));
    await page.waitForTimeout(34);
    if (site.tap && !tapped && t >= site.tap.at) { tapped = true; await page.touchscreen.tap(site.tap.x, site.tap.y); }
    await page.screenshot({ path: path.join(dir, `f_${String(++f).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 92 });
    t += 1 / FPS;
  };
  for (const seg of site.path) {
    const n = Math.round((seg.hold ?? seg.dur) * FPS);
    if (seg.hold) { for (let i = 0; i < n; i++) await shot(y); continue; }
    const y1 = Math.min(maxY, seg.to === 'end' ? maxY : seg.to * VH);
    const y0 = y;
    for (let i = 1; i <= n; i++) await shot(y0 + (y1 - y0) * (seg.flick ? easeFlick : ease)(i / n));
    y = y1;
  }
  await ctx.close();

  const out = path.join(ROOT, 'casos', id, 'media');
  fs.mkdirSync(out, { recursive: true });
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, 'f_%04d.jpg'),
    '-vf', 'scale=624:-2:flags=lanczos', '-c:v', 'libx264', '-crf', '17', '-preset', 'slow', '-g', '15', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    path.join(out, 'sitio.mp4')]);
  console.log(id, `${f} cuadros, ${(f / FPS).toFixed(2)} s`, 'alto', H);
}
await b.close();
