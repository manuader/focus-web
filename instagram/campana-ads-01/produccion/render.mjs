/* Render de los anuncios FOCUS.
   node render.mjs a01                → MP4 mudo 1080x1920 30 fps + portada + cues de audio
   node render.mjs a01 --stills 1,4,9 → cuadros de control en ../entregables/_control/
   node render.mjs a01 --from 12 --to 20 → solo un tramo (para revisar)
   Sirve la raíz del repo con un servidor propio (puerto 3410 + n) y usa la
   GPU del equipo (ANGLE/Metal en macOS) para los shaders y el vidrio 3D. */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const OUT = path.resolve(HERE, '../entregables');
const id = process.argv[2];
const args = process.argv.slice(3);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.otf': 'font/otf', '.woff2': 'font/woff2', '.json': 'application/json', '.mp4': 'video/mp4' };
const srv = http.createServer((q, s) => {
  const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(ROOT)) { s.writeHead(403); s.end(); return; }
  fs.readFile(f, (e, d) => { if (e) { s.writeHead(404); s.end(); return; } s.writeHead(200, { 'content-type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' }); s.end(d); });
});
const PORT = 18400 + Math.floor(Math.random() * 1500);
await new Promise((r) => srv.listen(PORT, r));

const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
let failed = false;
page.on('pageerror', (e) => { failed = true; console.error('pageerror', e.message); });
page.on('console', (m) => { if (m.type() === 'error') { failed = true; console.error('console', m.text()); } });
await page.goto(`http://localhost:${PORT}/instagram/campana-ads-01/produccion/engine/stage.html?id=${id}`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.renderAt && window.__ready, null, { timeout: 60000 });
await page.evaluate(() => window.__ready);
if (failed) { console.error('la pieza no montó'); await browser.close(); srv.close(); process.exit(1); }
const spec = await page.evaluate(() => ({ dur: SPEC.dur, fps: SPEC.fps || 30, cover: SPEC.cover, audio: SPEC.audio, name: SPEC.name, format: SPEC.format, still: SPEC.still }));
const HH = spec.format === 'post' ? 1350 : 1920;
if (HH !== 1920) await page.setViewportSize({ width: 1080, height: HH });
const clip = { x: 0, y: 0, width: 1080, height: HH };
const shot = async (t, file) => {
  await page.evaluate((tt) => window.renderAt(tt), t);
  return page.screenshot({ clip, type: 'jpeg', quality: 95, path: file });
};
const name = spec.name || id;
if (args[0] === '--png') {
  const dir = path.join(OUT, 'posteos');
  fs.mkdirSync(dir, { recursive: true });
  await page.evaluate((tt) => window.renderAt(tt), spec.still);
  await page.screenshot({ clip, type: 'png', path: path.join(dir, `${spec.name}.png`) });
  console.log('png', path.join(dir, `${spec.name}.png`));
} else if (args[0] === '--stills') {
  const dir = path.join(OUT, '_control');
  fs.mkdirSync(dir, { recursive: true });
  for (const t of args[1].split(',').map(Number)) await shot(t, path.join(dir, `${id}_${t.toFixed(2).padStart(6, '0')}.jpg`));
  console.log('stills en', dir);
} else {
  const dir = path.join(OUT, 'anuncios');
  fs.mkdirSync(dir, { recursive: true });
  const from = Number(opt('--from', 0)), to = Number(opt('--to', spec.dur));
  const n0 = Math.round(from * spec.fps), n1 = Math.round(to * spec.fps);
  const part = from > 0 || to < spec.dur;
  const silent = path.join(dir, `${name}${part ? `.part${from}-${to}` : ''}.silent.mp4`);
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(spec.fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2', '-tune', 'film', '-g', '60', silent], { stdio: ['pipe', 'ignore', 'inherit'] });
  // Cuadro 0 = portada (el cuadro asentado más fuerte).
  let coverBuf = null;
  if (!part) coverBuf = await shot(spec.cover, path.join(dir, `${name}.jpg`));
  const t0 = Date.now();
  for (let i = n0; i < n1; i++) {
    const buf = i === 0 && coverBuf ? coverBuf : await shot(i / spec.fps);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 30 === 0) process.stdout.write(`${name} ${i}/${n1} · ${((Date.now() - t0) / 1000).toFixed(0)} s\r`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  if (!part) fs.writeFileSync(path.join(dir, `${name}.cues.json`), JSON.stringify({ dur: spec.dur, cover: spec.cover, ...spec.audio }, null, 1));
  console.log(`\n${name}: ${n1 - n0} cuadros en ${((Date.now() - t0) / 1000).toFixed(0)} s → ${silent}`);
}
await browser.close();
srv.close();
