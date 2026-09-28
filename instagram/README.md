# FOCUS · lanzamiento de Instagram (primera tanda)

La primera tanda son 20 piezas: 10 reels, 5 carruseles y 5 secuencias de historias. Están producidas y se pueden revisar ya. Las reglas que siguen están en la skill `.claude/skills/focus-identidad/`, que sirve para cualquier pieza futura.

## Qué hay acá

| Archivo | Contenido |
|---|---|
| `01-marca.md` | Investigación de marca: propuesta, servicios, tono, identidad, casos verificados, portfolio a confirmar y qué falta |
| `02-investigacion.md` | Reels de estudios con fechas y métricas verificables, citas de Instagram, principios adaptados y auditoría de skills (incluida latent-spaces/brag) |
| `03-reels.md` | Ficha completa de los 10 reels: objetivo, guion plano por plano, arte, sonido, CTA, caption, prompt de /brag-slim y de Claude Design |
| `04-carruseles.md` | 5 carruseles cuadro por cuadro, con copy, visual, CTA, caption y prompt |
| `05-historias.md` | 5 secuencias con zona de sticker, copy y prompt |
| `06-matriz-y-calendario.md` | Matriz de las 20 piezas, orden de publicación y revisión de consistencia |
| `entregables/reels/` | 10 MP4 (1080×1920, 30 fps, H.264 y AAC, unos -14,5 LUFS), portada JPG y caption TXT de cada uno |
| `entregables/posts/` | 5 carpetas con los PNG de cada carrusel (1080×1350) y su `caption.txt` |
| `entregables/historias/` | 5 carpetas con los PNG de cada historia (1080×1920), limpios para agregarles el sticker nativo |
| `produccion/` | El motor que genera todo lo anterior |

## Regenerar o modificar una pieza

El método es el de `/brag-slim` (latent-spaces/brag): cada cuadro es una función pura del tiempo, se reutilizan el sitio real, sus fuentes y su logo, y la portada va incrustada en el cuadro 0.

```bash
# 1. el sitio real (para las capturas) y un servidor estático en la raíz del repo
npm ci && npm run build && npx next start -p 3100 &
python3 -m http.server 3300 --directory . &
pip install imageio-ffmpeg numpy scipy pillow

cd instagram/produccion
node capture.mjs                          # graba el sitio en un teléfono (capturas/, no versionado)
./stills.sh reels/r04 "1,4,9,15"          # cuadros de control de un reel
node render.mjs reels/r04 && python3 audio.py ../entregables/reels/focus_reel04_tres-capas.cues.json
./render-all.sh                           # los 10 reels
node render.mjs posts/c02 --png           # un carrusel o una historia
```

- Cada pieza es un archivo chico en `produccion/reels|posts|historias/`: textos, tiempos y el gesto.
- Los gestos de marca (rack focus, refracción RGB, haz y prisma, umbral, iris, anillos, lente) están en `produccion/engine/engine.js`.
- El audio lo genera `produccion/audio.py`. Es original, en Re, y mezcla música y efectos en una sola pieza.

## Pendiente

- **Voz en off** de R01 y R09. El guion está en `03-reels.md`; los videos funcionan sin ella.
- **Stickers nativos** en las historias (encuesta, quiz, pregunta, links, menciones). Posición y texto en `05-historias.md`.
- **Portfolio de software** (Music Box, Alquilalo, Fisu Evolution): no se pudo verificar que sean trabajos de FOCUS. El reel R-X queda reservado hasta tener material y permiso.
- **Del lado del estudio:**
  - handle de Instagram
  - confirmar la licencia de Rotis para redes
  - permiso de clientes para mencionarlos
  - sumar "software" al sitio
  - redirigir focus-creatives.com
