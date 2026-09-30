# Producción: el motor de piezas

Una pieza es un `.js` que llama a `F.mount(spec)` (reel) o a `F.deck(spec)` (carrusel o historia). El motor está en `design-system/plantillas/engine.js` y cada cuadro es una función pura del tiempo.

## Spec de un reel

```js
F.mount({
  name: 'focus_reel11_slug',  // nombre del archivo de salida
  dur: 20,                     // segundos
  cover: 2.4,                  // segundo de la portada (va en el cuadro 0)
  items: [ … ],
  audio: { chords: [[0,'min'],[15,'maj']], bpm: 84, pulse: [3, 15], events: [[0.2,'tick'], [5,'swell'], [15,'resolve']] },
});
```

## Items (todos con `t0` y `t1` en segundos; `fin` y `fout` son la duración de la entrada y la salida)

| Item | Qué hace | Opciones clave |
|---|---|---|
| `text` | Texto que entra en foco por palabra, línea o todo junto | `lines`, `cls` (`t-head`, `t-subserif`, `t-title`, `t-body`, `t-eyebrow`, `t-label`, `t-mono`), `size`, `x`, `y`, `w`, `by`, `stagger`, `lineDelay`, `rgb` (refracción), `rgbCurve(t)`, `defocus(t,li,i)`, `dim(t,li,i)`, `lens` (enfoque por distancia a la retícula), `color` |
| `image` | Imagen con foco de entrada y push-in | `src`, `treat` (`bg`, `dim`, `gray`), `zoom`, `pos`, `frame`, `focusAt` |
| `seq` | Secuencia de una captura del sitio | `dir: '/work/capturas/<toma>'`, `count`, `rate`, `offset`, `pos`, `zoom` |
| `rings` | Anillos concéntricos que giran | `cx`, `cy`, `size`, `period`, `accentRing`, `accent`, `time(t)` para frenar |
| `reticle` | Retícula que se mueve | `path(t) → {x,y,s,r}` |
| `beam` | Haz y prisma | `mode` (`split` o `merge`), `source`, `prism`, `targets`, `colors`, `beam`, `bands` |
| `group` | Contenedor con máscara | `clip` (`iris`, `sweepX`, `sweepY` o una función), `clipIn`, `children` |
| `box` | Caja libre (velos, paneles, HTML) | `html`, `style`, `anim(t,e)` |
| `logo` | Wordmark oficial | `w`, `rgb` (recomposición), `sub` (tagline) |

**Marcado de texto**
- `*palabra*`: énfasis en ExtraBold.
- `~frase~`: serif itálica.
- `**x**`: bold.
- `{m:x}` `{b:x}` `{g:x}` `{s:x}`: magenta, azul, verde o gris.

## Carruseles e historias

```js
F.deck({ name: 'focus_car06_slug', format: 'post', frames: [ (i) => [ …items con t0: i… ], … ] });
```

Para historias, `format` se omite (1080×1920) y se pasa `counter: false`.

## Captura del sitio

Con focus-web corriendo (`npm run build && npx next start -p 3100`), `./focus capture prisma refraccion` graba en `work/capturas/<toma>/NNNN.jpg`. La captura es de 1080×1920, a 30 fps y con tiempo virtual. Las tomas están definidas en `kit/capture.mjs` (`SHOTS`); para agregar una, se suma su scroll y su toque.

## Audio

`audio.py` lee los `cues` que deja el render y compone una pieza original en Re: pad, aire, pulso y los eventos `tick`, `click`, `swell`, `resolve` y `low`. La mezcla sale a unos -14 LUFS. Ver `design-system/MUSICA.md`.

## Trampas conocidas

- Los key visuals traen texto horneado: hay que recortarlos con `pos` y `zoom`.
- La barra superior del sitio cae en la zona de la interfaz de Instagram: tapala con un degradé de tinta (ver r03).
- Un crossfade entre dos layouts cargados ensucia la imagen: sacá primero uno y después entrá el otro.
- El texto en `t-head` es más ancho que en Light: bajá el `size` entre un 15 y un 20 % respecto de un enunciado.
- `./focus render` levanta un servidor en :3300. Si otro proceso ocupa el puerto, usá `FOCUS_PORT`.
