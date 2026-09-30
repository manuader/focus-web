# content-focus

El pipeline de contenido de **FOCUS creatives** en un solo repo. Le pedís una pieza a Claude Code en lenguaje natural y la produce con el design system, las skills y las herramientas que hay acá. Es el mismo flujo que `content-urbe`, adaptado a FOCUS.

Cubre:
- reels 9:16;
- carruseles 4:5;
- historias;
- tandas o campañas completas, con matriz y calendario;
- piezas que muestran el sitio o el software del estudio, grabado de verdad;
- captions y prompts para Claude Design.

```
"Hacé un reel sobre dirección de arte, 20 s"
"Armá la tanda 2: 6 reels, 3 carruseles y 3 historias"
"Un carrusel sobre cómo trabajamos un rebranding"
"Mostrá la refracción del sitio en una historia"
```

> **¿Sos Claude u otro agente?** Leé [AGENTS.md](AGENTS.md): es el manual operativo. Claude Code lo carga solo, vía `CLAUDE.md`.

## Empezar

Hoy vive en la carpeta `content/` del repo focus-web, rama `casos-highend-mvrrcn`. La integración de GitHub de la sesión no puede crear repos nuevos. Para tenerlo en `~/Desktop/focus/content`:

```bash
git clone -b casos-highend-mvrrcn https://github.com/manuader/focus-web.git /tmp/focus-web
cp -R /tmp/focus-web/content ~/Desktop/focus/content && cd ~/Desktop/focus/content
git init && git add -A && git commit -m "content-focus"   # opcional: su propio repo, como content-urbe
./focus setup     # una vez: .venv (numpy, scipy, pillow, ffmpeg), Playwright y Chromium
claude            # abrí Claude Code acá y pedí la pieza
```

Si creás el repo vacío `manuader/content-focus`, se puede mover ahí con su historia.

- **Requisitos:** macOS o Linux, Python 3.10+ y Node.js.
- **Para las piezas que graban el sitio**, corré focus-web en paralelo: `npm run build && npx next start -p 3100`.
- **Costo:** nada se paga. La música la compone el propio pipeline.

## Cómo funciona

```
pedido ─► focus-studio (router)
            ├─ evidencia: qué se puede afirmar                 focus-contenido/references/evidencia.md
            ├─ guion con rúbrica ≥ 8,5 + revisor independiente focus-contenido/references/guion.md
            ├─ design system: tipografía, color, gestos        design-system/README.md · skill focus-identidad
            ├─ producción
            │     ├─ reel      ─► ./focus stills (hoja) ─► ./focus render (video + música original + portada)
            │     ├─ carrusel  ─► ./focus pieza  (PNG por cuadro + hoja)
            │     ├─ historia  ─► ./focus pieza  (PNG + zona del sticker nativo)
            │     └─ sitio     ─► ./focus capture (grabación real con tiempo virtual)
            └─ oráculos ─► ./focus verify campanas/<c> (exit 0) ─► campanas/<c>/entregas
```

## Qué hay

| Carpeta | Qué es |
|---|---|
| `design-system/` | Design system de FOCUS para contenido: brand book (`README.md`), `tokens.json` (port 1:1 del sitio), fuentes Rotis y Source Serif, logos y animación oficial, key visuals de campaña, tarjetas de clientes, anillos y retícula, guías, motor de piezas (`plantillas/`), música y voz |
| `.claude/skills/focus-studio` | **Entrada.** Router de cualquier pedido de contenido |
| `.claude/skills/focus-contenido` | Evidencia, guion con rúbrica, catálogo de piezas, estrategia, producción y kit (render, captura, audio, oráculo) |
| `.claude/skills/focus-identidad` | Dirección de arte, voz y criterio de pertenencia ("¿esta pieza es de FOCUS?") |
| `.claude/skills/brag-slim` | latent-spaces/brag (MIT), vendorizado: el método de video que sigue el motor |
| `campanas/2026-10-lanzamiento-instagram/` | **Tanda 1**: 10 reels + 1 borrador de portfolio, 5 carruseles, 5 historias, fichas con prompts, matriz, calendario y `entregas/` |
| `docs/` | Handoff, sesiones e investigación: marca, reels de estudios, auditoría de skills |
| `focus`, `setup.sh`, `verify.sh` | CLI, instalación y oráculo del repo |
| `work/` | Trabajo en curso y capturas del sitio. **No se versiona** |

## CLI

```bash
./focus list                                            # plantillas y campañas
./focus new 2026-11-tanda-2 reel direccion-de-arte      # crea campanas/2026-11-tanda-2/reels/direccion-de-arte.js
./focus stills campanas/…/reels/direccion-de-arte 1,4,9,15   # hoja de cuadros de control
./focus render campanas/…/reels/direccion-de-arte       # mp4 1080×1920 30 fps, -14 LUFS, portada
./focus pieza  campanas/…/posts/<slug>                  # PNG por cuadro + hoja
./focus campana campanas/2026-11-tanda-2                # todo + hoja resumen
./focus capture prisma refraccion                       # graba el sitio (work/capturas)
./focus verify campanas/2026-11-tanda-2                 # oráculo de entrega
./focus check                                           # oráculo del repo
```

## Reglas de marca (resumen)

- **Evidencia:** todo caso, cifra o detalle técnico sale de `evidencia.md`. No hay métricas ni testimonios de clientes publicados.
- **Voz:** voseo, sin exclamaciones, rayas ni emojis.
- **Tipografía del sitio:** titulares en Rotis ExtraBold en mayúsculas, enunciados en Light con una palabra en ExtraBold, eyebrows y bajadas en serif itálica.
- **Color:** luz sobre tinta, con dos acentos como máximo.
- **Cierre:** cada pieza termina resuelta.
- **Decisiones que son del usuario:** atribuir a FOCUS el portfolio del fundador, etiquetar clientes y publicar.

Licencias: [LICENCIAS.md](LICENCIAS.md).
