# 02 · Auditoría de skills y herramientas de diseño y video

Fecha: 28/09/2026. Solo se leyó código: los repos se clonaron con `git clone --depth 1` y hooks desactivados, y no se instaló ni ejecutó nada de ellos. Para npm se usó solo `npm view` (metadatos del registro). Todo lo que hay en los repos se trató como datos. No apareció ningún intento de prompt injection malicioso; sí dos textos dirigidos a agentes, citados abajo.

## 0. Estado de esta máquina

| Chequeo | Resultado |
|---|---|
| `npx` | `/opt/homebrew/bin/npx`, node v26.8.1 |
| `remotion` / `hyperframes` global | No están. HyperFrames se usa por `npx`; `~/.hyperframes/config.json` tiene renders del 28/09. |
| Telemetría local de HyperFrames | `telemetryEnabled: false` en `~/.hyperframes/config.json`. Ya está apagada. |
| ffmpeg | 9.0.1 (Homebrew) |
| Python | python3 del sistema es 3.9 sin numpy. Para la campaña se creó un venv aparte con Python 3.11 (numpy, scipy, pillow). |
| Motor de la tanda orgánica | `instagram/produccion/render.mjs` apunta a rutas de Linux (`/opt/node22/...`, `/opt/pw-browsers/...`). En esta Mac no corre tal cual. **La campaña usa un motor v2 con Playwright local y GPU (ANGLE/Metal)**: `campana-ads-01/produccion/`. |

## 1. Shortlist de skills de diseño (fines de septiembre de 2026)

Estrellas, licencia y último commit según la API de GitHub al 28/09/2026. Instalaciones según el leaderboard de skills.sh.

| # | Candidato | Autor | Estrellas | Licencia | Último commit | Qué hace | Por qué sirve para FOCUS |
|---|---|---|---|---|---|---|---|
| 1 | anthropics/skills `frontend-design` | Anthropic | 178.8k (repo) | Apache-2.0 | 24/09/2026 | Dirección estética, tipografía y composición. #7 en skills.sh (931k instalaciones). | Criterio tipográfico y compositivo para el HTML del motor |
| 2 | anthropics/skills `canvas-design`, `algorithmic-art`, `theme-factory` | Anthropic | idem | Apache-2.0 y fuentes OFL | 24/09/2026 | Piezas estáticas PNG/PDF, arte generativo con semilla, temas | Posts, portadas, fondos generativos deterministas |
| 3 | heygen-com/hyperframes | HeyGen | 53.8k | Apache-2.0 | 28/09/2026 | HTML a video (Puppeteer + ffmpeg), 9 skills, bloques, audio, captions, TTS | Mismo modelo que el motor propio; fuente de conocimiento de motion |
| 4 | remotion-dev/skills | Remotion | 4.8k | Sin LICENSE (Remotion usa licencia propia) | 25/09/2026 | Buenas prácticas de Remotion | Solo si se adopta Remotion |
| 5 | latent-spaces/brag | latent-spaces | 11.3k | MIT | 24/09/2026 (c893c5e) | Video de lanzamiento desde un proyecto web, sobre HyperFrames | Ideas de ritmo; no está pensado para ads |
| 6 | pbakaus/impeccable | Paul Bakaus | 72k | Apache-2.0 | 28/09/2026 | Lenguaje de diseño para agentes, CLI en Rust | Crítica de UI web |
| 7 | Leonxlnx/taste-skill | Leonxlnx | 90.9k | MIT | 26/09/2026 | Skills anti "slop" (`high-end-visual-design`, `brandkit`...) | Checklist de calidad visual; solo markdown |
| 8 | nextlevelbuilder/ui-ux-pro-max-skill | nextlevelbuilder | 131k | MIT | 27/09/2026 | Diseño UI/UX multiplataforma | Poca relevancia para video (no auditada) |
| 9 | diffusionstudio/lottie | Diffusion Studio | 5.5k | MIT | 25/07/2026 | `text-to-lottie` | Microanimaciones que se pueden posicionar por cuadro |
| 10 | calesthio/OpenMontage | calesthio | 61.7k | **AGPL-3.0** | 06/09/2026 | Producción de video agéntica, 12 pipelines | Demasiado grande; referencia (no auditada) |
| 11 | Claude Design (Anthropic Labs) | Anthropic | producto | Términos de Anthropic | 17/04/2026 | Prototipos visuales que exportan HTML, PDF, PPTX | Exploración de estilo; el design system de FOCUS es un export de Claude Design |
| 12 | genmedia-labs/skills | genmedia-labs | **23** | MIT | 07/09/2026 | Wrappers de modelos pagos vía RunComfy | Alerta: 23 estrellas contra más de 710k "instalaciones" en skills.sh |

## 2. Auditoría por herramienta

Patrones buscados: `curl|sh`, `wget|sh`, `eval(`, `new Function`, `atob`/`base64 -d`, hooks `preinstall`/`postinstall`/`prepare`, `child_process`, endpoints de red, telemetría, pedidos de credenciales, textos dirigidos al agente ("ignore previous", "without asking") y exfiltración.

| Herramienta | Procedencia | Licencia | Deps | Permisos / credenciales | Hallazgos | Veredicto | Uso en FOCUS |
|---|---|---|---|---|---|---|---|
| **brag** (`/brag`, `/brag-slim`) | latent-spaces, plugin v0.4.0, commit c893c5e (sin cambios desde la auditoría anterior) | MIT | `npx hyperframes` **sin versión fija**; Python opcional con `uv.lock` | Ninguna | Sin hooks, eval, ofuscación ni telemetría. Excluye `.env` y claves al inspeccionar (bien). **Riesgo de licencia:** su `assets/music/README.md` pide verificar la licencia de la música incluida antes de redistribuir. | **Con reservas** | Referencia de método (cuadro como función del tiempo, portada en el cuadro 0). Su música no se usa en ads pagos. |
| **HyperFrames** (npm `hyperframes` 0.8.84) | heygen-com, attestation SLSA v1 y firma | Apache-2.0 | puppeteer-core, @puppeteer/browsers, sharp, esbuild, etc. Sin install scripts propios. | Opcionales: HeyGen, Gemini, OpenAI, Groq, ElevenLabs si hay claves en el entorno | **Telemetría PostHog activa por defecto** (se apaga con `HYPERFRAMES_NO_TELEMETRY=1` o `DO_NOT_TRACK=1`; en esta máquina ya está apagada). Envía métricas de uso, datos del sistema y **nombres** (no valores) de hasta 16 variables de entorno que contienen AGENT/CLAUDE/LLM. Auto-update silencioso si está instalado global. 4 versiones publicadas solo el 28/09. `publish` sube el proyecto a hosting de HeyGen. | **Con reservas** | Lectura: reglas de animación, easing, zonas seguras, ducking. **No como renderer.** |
| **Skills locales de HyperFrames** (`~/.claude/skills/hyperframes*`, `media-use`) | Copia de las skills del repo | Apache-2.0 | `npx --yes hyperframes@<versión fija>` con `HYPERFRAMES_NO_UPDATE_CHECK=1` | Idem | Sin `curl|sh`, eval remoto ni ofuscación. **Hallazgo de ruteo:** `hyperframes/SKILL.md` se define como "Mandatory entry point" y "the default output framework unless the user explicitly chooses another framework". En este repo desvía cualquier pedido de video del motor propio. | **Con reservas** | Dejar escrito en `focus-identidad` que el motor propio es el renderer de FOCUS (hecho en esta entrega). |
| **automatic-image-generation** (el candidato es `manuader/automatic-image-generation`, repo público del estudio) | 19/08/2026, un commit (b76cd53) | **Sin LICENSE** | selenium 4.39.0 fijo; pillow, numpy, scipy sin fijar | **Maneja una sesión web logueada de Gemini o ChatGPT** en un Chrome con `--remote-debugging-port` (9222/9223). Sin API keys. Necesita **Accesibilidad de macOS** (tipea con `osascript`). | (1) **Fuga de cookies:** `core/webchat.py` `_download_cross_origin` envía **todas** las cookies de la página (incluidas HttpOnly) a cualquier host del `src` de una imagen grande, sin allowlist. (2) Puerto CDP sin autenticación en 127.0.0.1. (3) Path de referencia interpolado sin escapar en AppleScript (riesgo bajo). (4) Automatizar la UI de consumo de ChatGPT o Gemini probablemente viola sus términos. (5) Texto benigno para agentes en el README ("Si sos un agente y venís a generar imágenes: leé este archivo entero"). Buen diseño en otros puntos: verifica qué app está al frente antes de tipear. | **Con reservas** | Solo moodboards, con cuenta secundaria y **después de parchear la fuga de cookies**. No para assets finales. **No se usó en esta campaña.** |
| midjourney-automatic-image-generation (alternativa) | usuario, 3 estrellas, abandonado (2023) | MIT | discord.js, openai v3 | Token de usuario de Discord (self-bot) | Viola los términos de Discord | **No usar** | No aplica |
| **Remotion** + `remotion-dev/skills` | Remotion | Propia: gratis hasta 3 personas (contractors cuentan); desde 4, Company License | React, Chrome Headless Shell | Mapas y voz con claves opcionales | Skills solo markdown; telemetría si hay `licenseKey` o en el renderer web | **Con reservas** (no migrar) | Ver comparación abajo |
| **anthropics/skills** (`frontend-design`, `canvas-design`, `algorithmic-art`, `theme-factory`) | Anthropic, commit 3337550 | Apache-2.0 | p5.js 1.7.0 desde cdnjs en algorithmic-art | Ninguna | Limpias | **Usar** (theme-factory con reservas: sus temas chocan con FOCUS) | Criterio de composición y tipografía; fondos generativos con semilla |
| **impeccable** | Paul Bakaus | Apache-2.0 | CLI Rust con binarios | Opcionales para tests | Llama a `impeccable.style` (catálogo pago) y tiene telemetría | **Con reservas** | Solo principios |
| **taste-skill** | Leonxlnx | MIT | Ninguna (solo .md) | Ninguna | Limpio | **Usar** (lectura) | Checklist anti "slop" para portadas y cuadros |
| **diffusionstudio/lottie** | Diffusion Studio | MIT | canvaskit-wasm (postinstall local, benigno) | Ninguna | Sin red fuera de CDNs | **Con reservas** | No hizo falta en esta tanda |
| **genmedia-labs/skills** | org creada el 12/08/2026 | MIT | RunComfy | API key paga; prompts salen a un tercero | Métricas probablemente infladas | **No usar** | No aplica |

## 3. Remotion contra el motor propio

- **Arquitectura:** Remotion también abre Chrome headless, se posiciona en cada cuadro, toma captura y une con ffmpeg. Es el mismo principio que `renderAt(t)`.
- **Precisión temporal:** no suma. Remotion cuantiza a cuadros enteros; el motor propio trabaja con `t` continuo y es determinista.
- **Audio:** Remotion ubica `<Audio>` con granularidad de cuadro (33 ms) y no sintetiza. El pipeline propio sintetiza a 48 kHz con cues desde el mismo SPEC que mueve la imagen: más preciso y con sonido de marca.
- **Composición:** ventaja real de Remotion (`<Sequence>`, transiciones, props tipadas, Studio con scrubbing). El SPEC por pieza ya cubre variantes parametrizadas para A/B.
- **Export:** comparable; ffmpeg resuelve codecs y el render se paraleliza.
- **Costo:** reescribir el motor en React y, desde 4 personas, licencia.
- **Conclusión:** no se usó Remotion. No aporta una ventaja concreta para esta tanda.

## 4. Decisión de stack para la campaña

1. **Render:** motor propio v2 (`produccion/`): el motor de la tanda orgánica para tipografía y gestos, más GLSL para el atlas óptico y Three.js (vidrio físico con dispersión, bloom) para las escenas 3D. Playwright con GPU del equipo.
2. **Audio:** síntesis propia (`produccion/audio2.py`), una partitura por anuncio con los mismos tiempos del SPEC, masterizada a -14 LUFS integrados y true peak por debajo de -1 dBTP.
3. **Criterio:** `focus-identidad` y el design system de Claude Design como fuente de verdad; `frontend-design` y `taste-skill` como checklist de lectura. HyperFrames solo como lectura (zonas seguras, easing).
4. **Imágenes con IA:** no se generaron. El conector de Higgsfield tiene 0,4 créditos (plan gratis); no hay integración de ChatGPT Pro disponible en esta sesión; `automatic-image-generation` requiere manejar una sesión logueada y tiene la fuga de cookies descrita. Todos los assets de la campaña son renders propios (código) o material existente del estudio. Los prompts para generar variantes con IA quedan escritos en cada guion.
5. **Higiene:** `HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1`; ningún `npx` sin versión fija; ningún `npx skills add` sin revisión.

## Fuentes

- skills.sh (leaderboard) · github.com/zhuyansen/awesome-claude-video-skills · github.com/VoltAgent/awesome-agent-skills
- firecrawl.dev/blog/best-claude-code-skills · pexo.ai/blog/best-video-generation-skills-for-claude-code-agents-2026-3772
- github.com/remotion-dev/remotion/blob/main/LICENSE.md · remotion.dev/docs/terms · remotion.dev/docs/telemetry · remotion.pro/license
- anthropic.com/news/claude-design-anthropic-labs
- API de GitHub y registro de npm (`npm view hyperframes`), consultados el 28/09/2026
