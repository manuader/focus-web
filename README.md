# FOCUS — sitio en Next.js

Migración del sitio de FOCUS (originalmente un `FOCUS Site.dc.html` hecho con
Claude Design) a **Next.js 15 (App Router) + React 19 + TypeScript**, con el
diseño y el sistema de marca intactos.

## Correr

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
npm run lint
```

## Qué se migró y cómo

El `.dc.html` era un único componente con todo el markup inline y un `boot()`
imperativo. Acá se descompuso en piezas con responsabilidad única:

```
src/
  app/
    layout.tsx        # fuentes (next/font), metadata, providers, chrome global
    page.tsx          # composición de las secciones, en orden
    globals.css       # design tokens + base + keyframes
    fonts/            # Rotis Semi Sans (OTFs reales de la marca)
  context/
    LanguageContext   # i18n real ES/EN (reemplaza el toggle display:none)
    PointerContext    # un único mousemove + rAF compartido (raw + suavizado)
  hooks/              # useReveal, useCountUp, useMagnetic, useHeroLens,
                      # useChromaticFlicker, useWindowScroll, useMediaQuery…
  components/
    chrome/           # grano, viñeta, scanline, cursor, barra de progreso, nav
    ui/               # Eyebrow, MagneticLink, Marquee, RingsMotif, Reveal
    sections/         # Hero(A/B/C), Ticker, Manifiesto, Valores, Superposición,
                      # Refracción, Umbral, Servicios, Trabajo, Proceso, Foco,
                      # Cifras, Testimonio, Contacto, Footer
  lib/
    content.ts        # todo el copy ES/EN + datos (servicios, casos, valores…)
    config.ts         # HERO_DIRECTION ('A' por defecto)
```

### Decisiones clave

- **Estilos:** CSS Modules por sección + design tokens (variables CSS) en
  `globals.css`, tomados 1:1 de `Design System/tokens/*`. Máxima fidelidad y
  mantenibilidad, sin inline-style sprawl.
- **Fuentes reales:** Rotis Semi Sans vía `next/font/local` (los 5 cortes de la
  marca) y Archivo Black (wordmark) vía `next/font/google`.
- **Interactividad de alta frecuencia** (lente del hero, spotlight, superposición,
  refracción, cursor): se maneja con `refs` + un `PointerContext` que corre un
  solo `requestAnimationFrame` y notifica por `subscribe`, sin re-renders de React.
- **Scroll-driven** (manifiesto, umbral, trabajo horizontal, parallax): listeners
  pasivos con throttle por frame (`useWindowScroll`).
- **Reveals:** `IntersectionObserver` (`useReveal`) en vez del rect-sweep manual.
- **i18n:** diccionario co-localizado ES/EN + `useTranslate`; persiste en
  `localStorage` y refleja `<html lang>`.
- **`data-magnet` / `style-hover`:** el runtime de Claude Design nunca los
  aplicaba; acá se implementan como efecto magnético real (`useMagnetic`) e
  `:hover` en CSS, respetando la intención del diseño.
- **Accesibilidad / rendimiento:** `prefers-reduced-motion` desactiva animaciones
  y efectos de cursor; los efectos de puntero se activan solo en `pointer: fine`.

### Cambiar el hero

El diseño ofrecía tres direcciones de hero (A · Umbral, B · Pasaje, C · Densidad).
Las tres están implementadas; se elige en `src/lib/config.ts`:

```ts
export const HERO_DIRECTION: HeroDirection = 'A';
```

## Assets

Imágenes, logos, motifs (`rings.svg`, `reticle.svg`) y fuentes se copiaron a
`public/assets/` y `src/app/fonts/` desde el proyecto original.
