# FOCUS — Design System

FOCO/FOCUS is a fictional design agency. Concept: the agency doesn't build brands
from scratch — it reveals the angle that was already there. Central idea:
**el umbral** (the threshold) — the moment between two states, where an
identity has stopped being what it was but isn't yet what it will be.
Confirmed against the brand manual (`uploads/TP-Produ-Capella.pdf`). The
"partido gráfico" defines four concepts, all now represented in the system:
**refracción** (chromatic-aberration triplet, magenta/blue/green offset —
`--aberration-a/b/c`), **superposición** (two states overlapping, color born
where they cross — `mix-blend-mode:difference`, see
`guidelines/motif-superposicion.card.html`), **densidad** (concentric rings,
the closer you look the more there is), and **foco** (one sharp point per
piece, everything else dissolved). Sub-concepts also named in the manual:
**pasaje** (crossing from one identity to another) and **umbral/limen** (what
looks like a door turns out to be a world).

Brand values (manual, p.5): **Libertad** (no permission asked), **Profundidad**
(nothing superficial), **Atención** (to detail), **Curiosidad** (always moving).

Tagline: *"El punto donde todo cambia."*

**Source material:** 6 reference posters supplied by the user
(`uploads/posterfotografico1-3.jpg`, `uploads/postertrama1-3.jpg`, copied into
`assets/imagery/`). These posters are the ground truth for the visual system —
the isologotipo (FOCUS wordmark with a lens-aperture ring standing in for the
letter C), the color palette, and the focus/blur/grain treatment. No Figma or
codebase was attached; this is a from-scratch brand-identity build.

## Deliverable

The primary deliverable is a slide template: **cover + 6 section dividers**
for the FOCUS brand-identity presentation, at `templates/section-deck/`.
Sections: Brief/Manifiesto, Construcción de Marca, Sistema, Papelería,
Piezas Promocionales, Merchandising.

## Composition rule (applied on every slide)

- One sharp, in-focus point per piece — a circular "lens window" cropped from
  the reference image, always off-center (near an edge or a third), never
  centered.
- Everything else desaturated, blurred, and cool-toned (grayscale → slight
  sepia → hue-rotate for a cold cast) — simulating out-of-focus depth.
- Subtle analog grain (SVG feTurbulence noise overlay) on every slide.
- One of the two system vector resources — concentric rings (densidad) or
  viewfinder reticle (umbral) — placed at a corner, tinted in one accent
  color, blended with `mix-blend-mode: screen`. Alternated slide to slide.
- Logo sits untouched in a corner, always the same proportions/color.
- Clean, unpatterned negative space reserved for the section title.

## Fonts — IMPORTANT SUBSTITUTION, please read

Brand spec calls for **Rotis** (Semi Serif for display, Semi Sans for body) —
a licensed Monotype family; no font files were provided and it isn't on
Google Fonts. Substituted for now with the closest open-license pairing:
- Display → **Source Serif 4** (stand-in for Rotis Semi Serif — still not supplied)
- Body → **Rotis Semi Sans** (real OTFs supplied, `assets/fonts/rotis/`)
- Rotis Sans Serif also supplied (`assets/fonts/rotis/`), available as fallback/alt weight, not yet assigned a role
- Logo wordmark only → **Archivo Black** (bold geometric face for "FOCUS")

**Please attach the real Rotis Semi Serif / Semi Sans font files (OTF/TTF)
and I'll swap them in** — this is the single biggest fidelity gap right now.

## Index

- `styles.css` — root stylesheet, imports everything below.
- `tokens/colors.css` — primary palette (magenta/blue/green + black/white),
  neutral/cool grays, chromatic-aberration triplet.
- `tokens/typography.css` — font stacks + display/body type scale.
- `tokens/spacing.css` — spacing scale + canvas margins.
- `assets/logo/` — `focus-logo-light.png` (for dark surfaces),
  `focus-logo-dark.png` (for light surfaces). Never redraw or recolor outside
  these two variants.
- `assets/motifs/` — `rings.svg` (concentric rings / densidad), `reticle.svg`
  (viewfinder cross / umbral). Recolor via `color` (uses `currentColor`).
  No camera-diaphragm/iris-blade motif is used anywhere, by design.
  **Superposición** (the manual's 4th concept) is a CSS technique, not a
  static asset — two solid shapes, one on `mix-blend-mode:difference`
  (see `guidelines/motif-superposicion.card.html`).
- `assets/imagery/` — the 6 reference posters supplied by the user; used as
  the source crops for the focus/blur treatment across slides and cards.
- `guidelines/` — foundation specimen cards (colors, type, logo, motifs,
  tonal treatment, tagline, spacing) shown in the Design System tab.
- `templates/section-deck/SectionDeck.dc.html` — the cover + 6 section
  dividers template (the main deliverable).

## Content fundamentals

- Spanish (Argentina/Río de la Plata), second person implicit ("vos" register
  in agency voice, e.g. "Nos movemos para ver otro ángulo").
- Short, declarative, slightly aphoristic lines — one idea per sentence,
  often two-line headline + one-line subhead (e.g. "MIRAR / no alcanza",
  "NOS MOVEMOS / para ver otro ángulo", "UN FOCO / entre la dispersión").
  No exclamation points, no emoji.
- Section labels are numbered and uppercase-tracked ("01 — Sección").
- Tagline is a single sentence, no closing punctuation: "El punto que lo
  cambia todo."

## Visual foundations

- **Color:** three pure, saturated accents (magenta #FF00FF, blue #0033FF,
  green #00FF33) used sparingly against near-black (#0A0A0B) or paper
  (#F6F6F4) — never as flat color fields covering large areas.
- **Type:** Semi Serif for display/titles, Semi Sans for body/labels (see
  font substitution above); wordmark uses its own bold geometric face,
  never for running text.
- **Imagery:** desaturated, grainy, cool-toned photographic backgrounds with
  one small circular sharp "focus window," always off-center. No flat
  illustration, no gradients-as-backgrounds, no repeating background
  pattern/trama across the whole frame — negative space stays clean.
- **Effects:** subtle analog grain (SVG turbulence, ~30% opacity); occasional
  chromatic aberration (repeat one shape 3× in magenta/blue/green, few px
  offset, `mix-blend-mode: screen`); cool hue-rotate tint on blurred/out-of-
  focus zones.
- **Animation:** none specified — this is a static, print-oriented identity
  system. If a consuming project wants slide transitions, keep them minimal
  fades, no bounces.
- **Layout:** logo fixed to a corner every time, unaltered; title block
  bottom-left third; motif anchored to the opposite corner from the sharp
  focus point; generous, deliberately asymmetric margins (spec calls for the
  sharp point near a third/edge, never centered).
- **Corners/shadows/borders:** no rounded corners, no drop shadows, no
  borders as a system convention (the only "shadow" is the deep vignette
  under full-bleed slide canvases in presentation, not a UI card pattern —
  this is a print/poster brand, not a software product).

## Iconography

No icon system defined or needed — this is a brand-identity/print system,
not a digital product. The only two vector marks are the concentric-rings and
viewfinder-reticle motifs in `assets/motifs/`. No emoji, no unicode-as-icon
usage anywhere in the brand voice.

## Intentional additions

- **Archivo Black** as a dedicated logo-only face: the brief specifies a
  bold geometric wordmark treatment but names no display font for it
  specifically; Archivo Black is the closest open match to the reference
  posters' lettering weight.
- No component library (Button, Input, etc.) was built: the brief is a
  presentation/print identity system with no digital product surface, so a
  standard UI kit would be an invention with no source to justify it.

## Caveats / please help me iterate

1. **Fonts are substitutes, not Rotis.** Attach the real Rotis Semi Serif /
   Semi Sans files and I'll swap the `@font-face`/stack immediately — layout
   may shift slightly once real metrics are in.
2. The isologotipo (ring standing in for the letter "C") is my construction
   from your brief + the reference posters, not a supplied vector — flag if
   the ring proportions, weight, or position don't match your intended mark.
3. All 6 slide backgrounds reuse the 6 reference posters you sent (recolored/
   blurred/cropped) since no separate stock photography was provided. If you
   have a distinct photo library for this brand, send it and I'll replace
   these crops with real, purpose-shot imagery per section.
4. No component library — tell me if you actually need one (e.g. for a
   deck-building tool, a brand microsite) and I'll scope it properly.

---

## Ampliación v2 · campaña "Sin plantilla" (28/09/2026)

Suma lo que hacía falta para pasar de un sistema de identidad impreso a uno que también produce **anuncios en movimiento, con sonido y para la línea de software**. Nada de lo anterior cambia; todo lo nuevo se construye sobre los cuatro conceptos del manual.

**Fuente de verdad en caso de conflicto: el sitio publicado** (focuscreatives.net). En particular, los titulares van en Rotis Semi Sans Light (como el sitio) y el wordmark es siempre el archivo PNG; Source Serif 4 queda para una sola palabra en itálica por pieza.

### Concepto
- **Plataforma de campaña: "Sin plantilla".** IA para explorar, criterio para decidir, oficio para terminar. Una plantilla aplica una forma que ya existe a cualquier marca; FOCUS encuentra la forma que ya estaba en esa marca. Card: `guidelines/campana-sin-plantilla.card.html`.
- **Atlas óptico:** diez fenómenos (superposición, profundidad de campo, reflexión, difracción, densidad, exposición larga, cáustica, umbral, órbita, recomposición). Cada uno tiene significado para el cliente, servicio que ilustra, movimiento y sonido. Una pieza usa uno solo como gesto dominante. Card: `guidelines/atlas-optico.card.html`. Imágenes de referencia: `assets/optics/` (renders del motor, sin IA generativa).
- **Arquitectura de oferta (propuesta):** Marca · Imagen · Presencia · Producto. Ver `instagram/campana-ads-01/03-sistema-creativo.md`.

### Recursos nuevos
- `assets/glyphs/`: once **glifos ópticos**, uno por servicio (estrategia, identidad, voz, dirección de arte, audiovisual, social media, web, editorial y packaging, software, IA y agentes, umbral). No son íconos de interfaz: son diagramas de física óptica con el mismo trazo que los anillos y la retícula. Card: `guidelines/glifos-opticos.card.html`.
- `assets/optics/`: diez imágenes del atlas (1080×1920), reutilizables como fondos o referencias.
- `assets/logo/focus-logo-light@8x.png`: el wordmark a 8x, derivado del archivo oficial (reescalado del alfa con umbral suave, sin redibujar). Solo para planos macro.

### Tokens nuevos
- `tokens/motion.css`: curvas, duraciones y desenfoques de los cinco gestos.
- `tokens/ads.css`: lienzo de Reels, zonas seguras, zonas de composición y escala tipográfica de reel.
- `tokens/sound.md`: **identidad sonora** (firma de tres notas de vidrio, tonalidades por etapa, efectos de marca, master).

### Formatos nuevos
- **Anuncio en Reels 45 s:** estructura en cinco tramos, texto solo en la franja superior o inferior, imagen en el centro óptico, placa de cierre común. Cards: `guidelines/anuncio-zonas.card.html`, `guidelines/anuncio-cierre.card.html`.
- **Interfaz para la línea de software:** marco de 1 px, sin esquinas ni sombras, estados con un punto de luz, rótulo "Concepto" en todo prototipo. Card: `guidelines/interfaz-software.card.html`.

### Producción
El motor que aplica este sistema a video está en `instagram/campana-ads-01/produccion/` (HTML + GLSL + Three.js renderizado cuadro por cuadro, audio sintetizado). Es el renderer por defecto de FOCUS para piezas en movimiento.
