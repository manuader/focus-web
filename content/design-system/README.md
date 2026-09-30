# FOCUS · design system para contenido

Este es el design system de FOCUS creatives para producir contenido.
- **Base:** el sitio focuscreatives.net (repo `focus-web`). Sus tokens (`src/app/globals.css`) son una copia exacta del Design System original hecho en Claude Design, y los estilos de texto salen de los módulos CSS de cada sección.
- **Fuente de verdad:**
  - si el sitio cambia, se actualiza esto;
  - si algo de esta carpeta contradice al sitio, gana el sitio.
- **Reglas de dirección de arte y criterio de pertenencia:** skill [`focus-identidad`](../.claude/skills/focus-identidad/SKILL.md).

```
design-system/
  README.md        este brand book
  tokens.json      color, tipografía, espacio, movimiento y formatos
  fonts/           Rotis Semi Sans (OTF de la marca) + Source Serif 4 Italic
  logos/           wordmark claro/oscuro, animación oficial (webp, mp4)
  assets/          key-visuals/ (campaña y póster) · clientes/ (tarjetas 4:5) · graficos/ (anillos, retícula) · CATALOGO.md
  guidelines/      10 movimiento y sonido · 20 evidencia · 30 carruseles · 35 historias · 50 imagen · 60 redacción
  plantillas/      motor de piezas: brand.css + engine.js + piece.html (reel, carrusel e historia desde un .js)
  MUSICA.md        banda sonora original por pieza
  voz/             voz de marca (pendiente de casting)
```

## Idea

**FOCUS revela el ángulo que ya estaba ahí.** No inventa marcas: las enfoca. El concepto madre es el **umbral**: "el punto donde una identidad dejó de ser lo que era y todavía no es lo que será".

Todo el sistema visual sale de la óptica:
- **foco y desenfoque:** entre el ruido, un punto nítido;
- **refracción:** estrategia, imagen y voz separadas y recompuestas;
- **haz y prisma:** siete disciplinas que entran y un solo haz que sale, "TU MARCA";
- **umbral:** la línea que, al cruzarla, deja el nuevo estado.

**Cada pieza termina resuelta**: en foco, en luz blanca recompuesta o en el logo.

## Color

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0A0A0B` | Fondo por defecto |
| `ink-2` | `#17181B` | Planos secundarios, tarjetas, paneles de código |
| `paper` | `#F6F6F4` | Texto principal; fondo **solo** en la variante papel (ver abajo) |
| `magenta` `blue` `green` | `#FF00FF` `#0033FF` `#00FF33` | Luz aditiva: acentos, halos, capas RGB |
| `blue-text` | `#5B8CFF` | El azul en texto chico sobre tinta |
| grises | `#E7E9EC` `#A7ACB4` `#7C818A` `#3A3D42` | Zonas fuera de foco, texto secundario (sobre tinta, como mínimo `#7C818A`) |
| espectro | `#FF00FF` → `#00FF33` en 7 pasos | Solo el haz de siete bandas, una por servicio |

- **Proporción:** entre el 85 y el 95 % del cuadro es oscuridad. El color es luz, nunca un fondo plano.
- **Blanco como momento de marca:** los tres acentos en modo `screen` suman blanco. Ese blanco es el cierre de la refracción.
- **Variante papel:** fondo `#F6F6F4` con la trama de colores de la marca. La usa el reel de presentación v3 y los key visuals `kv-trama-*`. Se usa como contraste en la grilla, a lo sumo una pieza de cada ocho.
- **Colores del póster:** el póster y las tramas incluyen rojo, amarillo y cian. Son obra: se muestran tal cual y esos colores no se extienden al resto del sistema.

## Tipografía

**Familia:** Rotis Semi Sans en todo. Source Serif 4 Italic es la compañera para eyebrows y bajadas.

| Estilo | Cómo se ve | Dónde lo usa el sitio | Clase del motor |
|---|---|---|---|
| **Titular** | ExtraBold 800, mayúsculas, tracking -3,5 %, interlineado 0,95 | QUÉ HACEMOS · CASOS · MIRAR / NO ALCANZA · ENFOQUEMOS | `t-head` |
| **Bajada serif** | Source Serif 4 Italic 400, caja normal, gris 300 | "lo que ya es tuyo" (Contacto) | `t-subserif` |
| **Enunciado** | Light 300, caja normal, tracking -2,5 %, con **una** palabra en ExtraBold | "Una marca no se inventa. Se **enfoca**." · "No la pedimos, la **capturamos**." | `t-title` + `*palabra*` |
| **Eyebrow de sección** | Source Serif 4 Italic, gris, con filete de 54 px a la izquierda | "— Servicios", "— Trabajo seleccionado" | `t-eyebrow` |
| **Micro-rótulo** | Bold 700, mayúsculas, tracking 0,26 em, gris | "TU DEDO ES LA LENTE · ENFOCÁ LO QUE IMPORTA" | `t-label` |
| **Lockup de campaña** | TITULAR en Bold/ExtraBold mayúsculas + bajada en Light Italic mayúsculas al 40 % | Key visuals: MIRAR / *NO ALCANZA* | `t-head` + `t-light-it t-caps` |
| **Cuerpo** | Light 300, interlineado 1,32 | Párrafos | `t-body` |

**Reglas**
- En un mismo cuadro, un solo titular. El enunciado y el titular no compiten entre sí.
- La jerarquía sale de la escala y el peso, no del color.
- Nunca menos de 40 px en algo que haya que leer en un reel.
- Máximo 14 palabras en pantalla a la vez.
- La serif itálica no va **dentro** de un enunciado: ahí el énfasis se hace con ExtraBold.

## Logo

- **Archivos:** `logos/focus-logo-light.png` (sobre oscuro), `focus-logo-dark.png` (sobre claro), `focus-logo-anim.webp` y `focus-logo-animacion.mp4` (la animación oficial: la apertura que gira hasta formar el wordmark).
- **Tamaño:** firma de 200 px al cierre de cada pieza; hasta 440 px en piezas de presentación. Área de respeto: la altura de la O.
- **Prohibido:** deformarlo, recolorearlo en acentos, ponerle sombra o contorno. Se permite que entre desde desenfoque o que se recomponga desde tres capas RGB.
- **Lockup:** FOCUS + *creatives*.

## Recursos gráficos

- **Anillos concéntricos** (`graficos/anillos.svg`), de 1,5 px, con una marca de color que hace legible la rotación.
- **Retícula de enfoque** (`graficos/reticula.svg`).
- **Grano** y **viñeta** permanentes.
- **Filete de 1 px** en los marcos.
- **Rótulos técnicos** en gris: `01 / 03`, fechas de commit, rutas de archivo.

**Prohibido:** stickers, flechas a mano, mockups de teléfono genéricos, stock de "equipo trabajando", degradés decorativos, texto con contorno, sombras.

## Imagen

- **Fotografía de campaña** (`key-visuals/kv-*`):
  - blanco y negro de alto contraste;
  - un gesto humano (manos en un vidrio, un ojo detrás de una lupa);
  - la intervención RGB u holográfica **solo sobre el gesto**.
- **Fondo tratado:** `grayscale(1) brightness(.3) contrast(1.25) blur(7px)`.
- **Trabajo de clientes:** en su color y nítido, enmarcado y sin intervenir.
- **Pantallas:** capturas reales del producto funcionando. Para el sitio se usa `./focus capture`, que graba con tiempo virtual; no se usan mockups.
- **IA:** solo para luz, prismas, cáusticas y texturas. Nunca para simular trabajo de un cliente, personas reales o un equipo.

## Movimiento y sonido

Ver `guidelines/10-movimiento-y-sonido.md`.
- **Curva:** `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Carácter:** lento para entrar, preciso para resolver.
- **Sonido:** ambient original en Re, con un tic de lente en cada enfoque y el acorde que resuelve en la recomposición. Mezcla a -14 LUFS.

## Voz

- **Registro:** rioplatense con voseo, corto y aforístico.
- **Nunca:** signos de exclamación, rayas ni emojis.
- **Tono:** afirmar, no vender.
- **Frases de marca:** "Mirar no alcanza", "Una marca no se inventa. Se enfoca.", "Nos movemos para ver otro ángulo", "Un foco entre la dispersión", "Siete disciplinas, un solo criterio", "Enfoquemos lo que ya es tuyo", "El punto donde todo cambia".
- **Detalle y lista de prohibidos:** skill `focus-identidad` §3 y `guidelines/60-redaccion-para-redes.md`.

## Formatos

| Pieza | Lienzo | Zona segura | Motor |
|---|---|---|---|
| Reel | 1080×1920, 30 fps, -14 LUFS | x 80–1000 · y 250–1500 | `./focus render` |
| Carrusel | 1080×1350 (4:5) | x 80–1000 · y 80–1270 (portada: titular dentro del recorte 3:4) | `./focus pieza` |
| Historia | 1080×1920 | y 220–1580 (sticker nativo en su zona libre) | `./focus pieza` |
