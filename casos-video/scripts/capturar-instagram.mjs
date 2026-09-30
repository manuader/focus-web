/* Baja lo que un perfil público de Instagram muestra sin iniciar sesión: la
   cabecera, las destacadas, la grilla y los reels elegidos en caso.json.

   uso: node casos-video/scripts/capturar-instagram.mjs <id> [<id>…]
   sale: casos-video/casos/<id>/media/ig/{perfil.json, avatar.jpg, post_NN.jpg, dest_N.jpg}
         casos-video/casos/<id>/media/reel_N.mp4

   Los perfiles con restricción de edad (bares, cannabis) no se ven sin
   sesión: para esos hay que pasar --estado <archivo> con el storageState de
   una sesión de Playwright ya iniciada por una persona. Este script nunca
   escribe credenciales. */
import { chromium } from './playwright.mjs';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const iEstado = args.indexOf('--estado');
const storageState = iEstado >= 0 ? args.splice(iEstado, 2)[1] : undefined;
const soloReels = args.includes('--solo-reels') && args.splice(args.indexOf('--solo-reels'), 1);

/** Duración de cada recorte de reel, en segundos. */
const REEL = 3.8;

const b = await chromium.launch({ headless: true });
for (const id of args) {
  const dir = path.join(ROOT, 'casos', id);
  const caso = JSON.parse(fs.readFileSync(path.join(dir, 'caso.json'), 'utf8'));
  const out = path.join(dir, 'media', 'ig');
  fs.mkdirSync(out, { recursive: true });

  if (!soloReels) {
    const ctx = await b.newContext({
      viewport: { width: 1280, height: 2600 }, deviceScaleFactor: 2, locale: 'es-AR', storageState,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    });
    const page = await ctx.newPage();
    await page.goto(`https://www.instagram.com/${caso.handle}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(6000);
    const close = page.locator('div[role="dialog"] [aria-label="Cerrar"]').first();
    if (await close.count()) await close.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(800);
    for (let i = 0; i < 3; i++) { await page.mouse.wheel(0, 1600); await page.waitForTimeout(1800); }

    const info = await page.evaluate(() => {
      const best = (img) => {
        const set = (img.getAttribute('srcset') || '').split(',').map((s) => s.trim().split(' ')).filter((p) => p[0]);
        set.sort((a, c) => parseInt(c[1]) - parseInt(a[1]));
        return set[0]?.[0] || img.currentSrc || img.src;
      };
      const posts = [...document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')].map((a) => {
        const img = a.querySelector('img');
        return img ? { href: a.getAttribute('href'), src: best(img), reel: a.getAttribute('href').includes('/reel/') } : null;
      }).filter(Boolean);
      const header = document.querySelector('header');
      const destacadas = [...document.querySelectorAll('ul li')].map((li) => {
        const img = li.querySelector('img');
        const nombre = li.innerText.trim();
        return img && nombre ? { src: img.src, nombre } : null;
      }).filter(Boolean).slice(0, 6);
      return {
        header: header?.innerText.split('\n').map((s) => s.trim()).filter(Boolean),
        avatar: header?.querySelector('img')?.src,
        meta: document.querySelector('meta[property="og:description"]')?.content || document.querySelector('meta[name="description"]')?.content,
        posts, destacadas,
      };
    });
    if (!info.posts.length) throw new Error(`${id}: el perfil @${caso.handle} no mostró publicaciones (¿restringido?)`);

    const seen = new Set();
    info.posts = info.posts.filter((p) => !seen.has(p.href) && seen.add(p.href)).slice(0, 12);
    const save = async (url, file) => fs.writeFileSync(path.join(out, file), await (await ctx.request.get(url)).body());
    for (const [i, p] of info.posts.entries()) { p.file = `post_${String(i).padStart(2, '0')}.jpg`; await save(p.src, p.file); delete p.src; }
    for (const [i, d] of info.destacadas.entries()) { d.file = `dest_${i}.jpg`; await save(d.src, d.file); delete d.src; }
    if (info.avatar) { await save(info.avatar, 'avatar.jpg'); delete info.avatar; }

    // Las cifras del perfil no se guardan: no se muestran métricas de clientes.
    info.header = info.header.filter((l) => !/^[\d.,]+\s?(mil|[kKmM])?\s+(seguidores|publicaciones)$/.test(l));
    delete info.meta;
    fs.writeFileSync(path.join(out, 'perfil.json'), JSON.stringify(info, null, 2));
    console.log(id, `${info.posts.length} publicaciones, ${info.destacadas.length} destacadas`);
    await ctx.close();
  }

  // Reels: se baja el original a work/ y se versiona solo el recorte.
  const work = path.join(ROOT, 'work', id, 'reels');
  fs.mkdirSync(work, { recursive: true });
  const perfilPath = path.join(out, 'perfil.json');
  const perfil = JSON.parse(fs.readFileSync(perfilPath, 'utf8'));
  perfil.reels = [];
  for (const [i, r] of (caso.reels || []).entries()) {
    const src = path.join(work, `${r.code}.mp4`);
    const url = `https://www.instagram.com/reel/${r.code}/`;
    if (!fs.existsSync(src)) execFileSync('yt-dlp', ['-q', '--no-warnings', '-f', 'best[height<=1280]/best', '-o', src, url]);
    let texto = '';
    try { texto = execFileSync('yt-dlp', ['-q', '--no-warnings', '--skip-download', '--print', '%(description)s', url], { encoding: 'utf8' }); } catch {}
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(r.desde), '-t', String(REEL), '-i', src, '-an',
      '-vf', 'scale=432:768:force_original_aspect_ratio=increase,crop=432:768,fps=30', '-c:v', 'libx264', '-crf', '21', '-preset', 'slow', '-g', '15', '-pix_fmt', 'yuv420p',
      path.join(dir, 'media', `reel_${i + 1}.mp4`)]);
    perfil.reels.push({ code: r.code, texto: texto.split('\n')[0].trim() });
    console.log(id, 'reel', i + 1, r.code, JSON.stringify(perfil.reels[i].texto.slice(0, 70)));
  }
  fs.writeFileSync(perfilPath, JSON.stringify(perfil, null, 2));
  await new Promise((r) => setTimeout(r, 2000));
}
await b.close();
