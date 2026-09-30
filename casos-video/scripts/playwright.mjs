/* Playwright no es dependencia del sitio: se usa el que ya esté instalado en
   alguno de los pipelines de contenido del repo. */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const dirs = ['casos-video', 'content', 'instagram/campana-ads-01/produccion'].map((d) => path.join(repo, d));
const home = dirs.find((d) => fs.existsSync(path.join(d, 'node_modules', 'playwright')));
if (!home) throw new Error('No hay Playwright instalado. Corré `npm i playwright && npx playwright install chromium` en casos-video/.');
export const { chromium } = createRequire(path.join(home, 'package.json'))('playwright');
