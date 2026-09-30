/* Render de piezas FOCUS (lo llama ./focus; no hace falta usarlo a mano).
   node render.mjs campanas/<c>/reels/r01                 → video mudo 1080×1920 30 fps + portada + cues de audio
   node render.mjs campanas/<c>/reels/r01 --stills 1,4.5  → cuadros de control en work/_control
   node render.mjs campanas/<c>/posts/c01 --png           → un PNG por cuadro del carrusel o la historia
   La salida va a campanas/<c>/entregas/. Sirve la raíz del repo con un
   servidor estático propio (puerto libre, se cierra al terminar) y usa el
   ffmpeg de imageio-ffmpeg. */
import { createRequire } from 'node:module';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
// Playwright: el del repo (npm i) o, si no está, el global de la máquina.
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = await import('/opt/node22/lib/node_modules/playwright/index.mjs'); }
const { chromium } = pw;

// Raíz del repo: la carpeta que tiene .focus-root, subiendo desde acá.
let ROOT = path.dirname(new URL(import.meta.url).pathname);
while (!fs.existsSync(path.join(ROOT, '.focus-root'))) ROOT = path.dirname(ROOT);
const id = process.argv[2].replace(/\.js$/, '').replace(/^\.\//, '');
const args = process.argv.slice(3);
// Servidor estático de la raíz del repo: el motor carga fuentes, assets y piezas por URL.
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.otf': 'font/otf', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}/design-system/plantillas/piece.html`;
const PY = process.env.FOCUS_PY || 'python3';
const FFMPEG = execFileSync(PY, ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())']).toString().trim();
// campanas/<c>/reels/r01 → campanas/<c>/entregas
const OUT = path.join(ROOT, path.dirname(path.dirname(id)), 'entregas');
const CHROME = process.env.FOCUS_CHROME || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);

const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(`${BASE}?id=${id}`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.renderAt && window.__ready);
await page.evaluate(() => window.__ready);
const spec = await page.evaluate(() => ({ dur: SPEC.dur, fps: SPEC.fps || 30, cover: SPEC.cover, slides: SPEC.slides, format: SPEC.format, audio: SPEC.audio, name: SPEC.name }));
const H = spec.format === 'post' ? 1350 : 1920;
await page.setViewportSize({ width: 1080, height: H });
const clip = { x: 0, y: 0, width: 1080, height: H };
const shot = async (t, file, type = 'jpeg') => {
  await page.evaluate((tt) => window.renderAt(tt), t);
  return page.screenshot({ clip, type, quality: type === 'jpeg' ? 94 : undefined, path: file });
};

const name = spec.name || id.split('/').pop();
if (args[0] === '--stills') {
  const dir = path.join(ROOT, 'work', '_control');
  fs.mkdirSync(dir, { recursive: true });
  for (const t of args[1].split(',').map(Number)) await shot(t, path.join(dir, `${name}_${t}.jpg`));
  console.log('stills en', dir);
} else if (args[0] === '--png') {
  const dir = path.join(OUT, path.basename(path.dirname(id)), name);
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < spec.slides.length; i++) await shot(spec.slides[i], path.join(dir, `${String(i + 1).padStart(2, '0')}.png`), 'png');
  console.log('png en', dir);
} else {
  const dir = path.join(OUT, 'reels');
  fs.mkdirSync(dir, { recursive: true });
  const n = Math.round(spec.dur * spec.fps);
  const silent = path.join(dir, `${name}.silent.mp4`);
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(spec.fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-profile:v', 'high', silent], { stdio: ['pipe', 'ignore', 'inherit'] });
  // Cuadro 0 = portada (el cuadro asentado más fuerte), como pide /brag-slim.
  const coverBuf = await shot(spec.cover, path.join(dir, `${name}.jpg`));
  for (let i = 0; i < n; i++) {
    const buf = i === 0 ? coverBuf : await shot(i / spec.fps);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 60 === 0) process.stdout.write(`${name} ${i}/${n}\r`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  fs.writeFileSync(path.join(dir, `${name}.cues.json`), JSON.stringify({ dur: spec.dur, ...spec.audio }));
  console.log('\nvideo mudo', silent);
}
await browser.close();
server.close();
