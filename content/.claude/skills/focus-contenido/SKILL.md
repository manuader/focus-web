---
name: focus-contenido
description: >-
  Producción de contenido de FOCUS creatives: guion con rúbrica y revisor
  independiente, evidencia (lo que se puede afirmar), catálogo de piezas
  existentes, estrategia de la cuenta y el kit de render (motor de piezas,
  captura del sitio con tiempo virtual, banda sonora original, oráculo de
  entrega). La llama focus-studio; usala directo para escribir o corregir un
  guion, verificar una afirmación, o producir/renderizar reels, carruseles e
  historias con ./focus.
---

# FOCUS · contenido

## Referencias

| Archivo | Para qué |
|---|---|
| [references/evidencia.md](references/evidencia.md) | Lo que se puede afirmar, con su etiqueta: estudio, clientes, el sitio como caso de software, portfolio del fundador y decisiones abiertas |
| [references/guion.md](references/guion.md) | Estructura de 18–22 s, estilo, rúbrica (umbral 8,5) y prompt del revisor independiente |
| [references/catalogo-piezas.md](references/catalogo-piezas.md) | Lo que ya existe: reels de presentación v1/v3 y tanda 1. No repetir ideas, ganchos ni CTA |
| [references/estrategia.md](references/estrategia.md) | Público, ejes, cadencia y métricas de la cuenta |
| [references/produccion.md](references/produccion.md) | API del motor (`text`, `image`, `seq`, `rings`, `beam`, `group`, `logo`, `deck`…), captura del sitio y audio |

## Kit (`kit/`)

| Archivo | Qué hace |
|---|---|
| `render.mjs` | Renderiza una pieza (`.js`): video, cuadros de control o PNG por cuadro |
| `capture.mjs` | Graba focuscreatives.net en un teléfono con tiempo virtual y toques simulados |
| `audio.py` | Compone la banda sonora original de cada reel desde sus `audio.chords` y `audio.events` y la mezcla a -14 LUFS |
| `sheet.py` · `grid.py` · `resumen.py` | Hojas de contacto de cuadros, de carruseles y de la campaña |
| `verify-campana.sh` | Oráculo de entrega: formato, duración, loudness, portadas, captions y reglas de copy |

Todo se corre con `./focus` (ver `AGENTS.md` §4).

## Plantillas (`templates/`)

`reel.js`, `carrusel.js` e `historia.js` son el punto de partida de `./focus new`. Las piezas de la tanda 1 (`campanas/2026-10-lanzamiento-instagram/`) son ejemplos completos de cada gesto: haz (r02), captura (r03), refracción (r04), foco por línea (r05), umbral (r06), iris (r07), lente (r08), puerta (r09) y anillos (r10).
