/* Capturas de control de la sección Casos del sitio, a tamaños fijos.
   uso: node casos-video/scripts/qa-sitio.mjs [url]   (por defecto http://localhost:3100)
   sale: casos-video/work/_qa/*.png */
import { chromium } from './playwright.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'work', '_qa');
fs.mkdirSync(out, { recursive: true });
const url = process.argv[2] || 'http://localhost:3100';
const SIZES = { desk: [1440, 900, false], laptop: [1280, 720, false], movil: [390, 664, true], chico: [375, 553, true] };
const only = process.argv[3]?.split(',');

const b = await chromium.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
for (const [name, [w, h, mobile]] of Object.entries(SIZES)) {
  if (only && !only.includes(name)) continue;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500); // la entrada del sitio
  const at = (f) => page.evaluate((f) => { const s = document.querySelector('#trabajo'); const top = s.getBoundingClientRect().top + scrollY; scrollTo({ top: top + (s.offsetHeight - innerHeight) * f, behavior: "instant" }); }, f);
  const shot = (tag) => page.screenshot({ path: path.join(out, `${name}-${tag}.png`) });
  const state = () => page.evaluate(() => [...document.querySelectorAll('#trabajo a')].map((a) => a.dataset.state || '-').join(''));
  // La entrada: a mitad de camino y recién fijada.
  await at(-0.16); await page.waitForTimeout(900); await shot('0-entra-a'); await at(-0.07); await page.waitForTimeout(900); await shot('0-entra-b');
  await at(0); await page.waitForTimeout(350); await shot('1-asienta');
  await page.waitForTimeout(250); const s1 = await state();
  await page.waitForTimeout(900); const s2 = await state();
  await page.waitForTimeout(2600); await shot('2-pelicula');
  // A mitad de un giro, y el segundo caso corriendo.
  await at(1.5 / 9); await page.waitForTimeout(120); await shot('3-giro'); const s3 = await state();
  await at(3 / 9); await page.waitForTimeout(5200); await shot('4-caso4');
  await at(1); await page.waitForTimeout(900); await shot('5-final');
  const card = await page.evaluate(() => { const c = document.querySelector('#trabajo a'); return [c.offsetWidth, c.offsetHeight]; });
  console.log(name, `${w}×${h}`, 'tarjeta', card.join('×'), '| a 0,6 s:', s1, '| a 1,5 s:', s2, '| girando:', s3);
  await ctx.close();
}
await b.close();
