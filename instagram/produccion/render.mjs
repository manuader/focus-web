/* Render de piezas FOCUS.
   node render.mjs reels/r01            → video 1080x1920 30fps + portada
   node render.mjs reels/r01 --stills 1,4.5,9   → solo cuadros de control
   node render.mjs posts/c01 --png      → un PNG por cuadro del carrusel/historia
   Requiere: servidor estático en la raíz del repo (python3 -m http.server 3300)
   y el ffmpeg de imageio-ffmpeg (pip install imageio-ffmpeg). */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const id = process.argv[2];
const args = process.argv.slice(3);
const BASE = process.env.FOCUS_BASE || 'http://localhost:3300/instagram/produccion/engine/piece.html';
const FFMPEG = execFileSync('python3', ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())']).toString().trim();
const OUT = path.resolve('../entregables');

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
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
  const dir = path.join(OUT, '_control');
  fs.mkdirSync(dir, { recursive: true });
  for (const t of args[1].split(',').map(Number)) await shot(t, path.join(dir, `${name}_${t}.jpg`));
  console.log('stills en', dir);
} else if (args[0] === '--png') {
  const dir = path.join(OUT, path.dirname(id), name);
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
