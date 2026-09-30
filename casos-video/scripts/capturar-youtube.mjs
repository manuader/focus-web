/* Baja de YouTube los dos recortes de un caso audiovisual: un vertical
   (Short) y un tramo de un video horizontal, según casos/<id>/caso.json.

   uso: node casos-video/scripts/capturar-youtube.mjs <id>
   sale: casos-video/casos/<id>/media/{vertical,horizontal}.mp4 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2];
const dir = path.join(ROOT, 'casos', id);
const caso = JSON.parse(fs.readFileSync(path.join(dir, 'caso.json'), 'utf8'));
const work = path.join(ROOT, 'work', id, 'yt');
fs.mkdirSync(work, { recursive: true });

const key = (url) => url.split(/[/=]/).pop();
const bajar = (url, fmt, extra = []) => {
  const file = path.join(work, `${key(url)}.mp4`);
  if (!fs.existsSync(file)) execFileSync('yt-dlp', ['-q', '--no-warnings', '-f', fmt, ...extra, '--remux-video', 'mp4', '-o', file, url]);
  return file;
};
const recortar = (src, desde, dur, vf, out) => execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(desde), '-t', String(dur), '-i', src, '-an',
  '-vf', `${vf},fps=30`, '-c:v', 'libx264', '-crf', '21', '-preset', 'slow', '-g', '15', '-pix_fmt', 'yuv420p', path.join(dir, 'media', out)]);

const v = bajar(caso.vertical.url, 'bv*[height<=1280][ext=mp4]/b[ext=mp4]/b');
recortar(v, caso.vertical.desde, 4.7, 'scale=432:768:force_original_aspect_ratio=increase,crop=432:768', 'vertical.mp4');
const [a, b] = caso.youtube.seccion;
const h = bajar(caso.youtube.url, 'bv*[height<=720][ext=mp4]/b[height<=720]', ['--download-sections', `*${a}-${b}`]);
recortar(h, caso.youtube.desde, 5.8, 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540', 'horizontal.mp4');
console.log(id, 'vertical.mp4 + horizontal.mp4');
