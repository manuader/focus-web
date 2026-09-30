# 05 · Cinco secuencias de historias

**Producidas:** `entregas/historias/<nombre>/NN.png` (1080×1920). El código está en `historias/sNN.js`.

Cada secuencia agrega algo que el feed no tiene: interacción, detrás de escena, links o respuestas. No son recortes de otras piezas. Los PNG salen **limpios**: el sticker nativo (encuesta, quiz, pregunta, link o mención) se agrega en la app, en la zona libre que indica cada ficha.

Zona segura de historias: y entre 220 y 1580. Cada prompt para Claude Design empieza con el **[MARCA]** de `03-reels.md` y usa formato 1080×1920.

---

## S01 · Bienvenida (día 1, junto con R01 y C01)

| # | Visual y copy final | Sticker (se agrega en la app) |
|---|---|---|
| 1 | Anillos, el logo recompuesto desde RGB, "Abrimos." y "Este es el Instagram de FOCUS." | — |
| 2 | Acá vas a ver / cómo pensamos. · No solo lo que hacemos. (en gris) | — |
| 3 | ¿Qué querés / ver primero? | **Encuesta** en y 950–1250: "El proceso" / "Los casos" |
| 4 | Key visual `img-02` tal cual (NOS MOVEMOS / PARA VER OTRO ÁNGULO) · Todo empieza en / focuscreatives.net | **Link** en y 560–700 → focuscreatives.net |

- **Objetivo:** presentar la cuenta y medir el interés con la encuesta. El resultado define si después va primero R05 (proceso) o R07 (casos).
- **CTA:** votar y visitar el sitio.
- **Prompt Claude Design:**
  > [MARCA] Secuencia de 4 historias.
  > (1) Anillos concéntricos grises centrados; el logo oficial a 520 px recompuesto desde tres capas RGB; "Abrimos." en Light 96 px centrado y la bajada en gris.
  > (2) Titular en Light 112 px con la segunda frase en gris.
  > (3) Pregunta en 112 px en y 420, dejando libre la zona y 950–1250 para la encuesta.
  > (4) La foto de campaña img-02 a sangre (anclada a la derecha para que el lockup propio de la foto quede entero), degradé de tinta arriba y "Todo empieza en / focuscreatives.net" en 72 px en y 250.

## S02 · Test de foco (quiz; después de R06)

| # | Visual y copy final | Sticker |
|---|---|---|
| 1 | Test de / 10 segundos. · Sin trampa. | — |
| 2 | ¿Cuál se lee / primero? · Dos tarjetas: **A**, saturada, con Arial y seis mensajes; **B**, tinta, un halo verde y "Una sola idea." | **Quiz** en y 1180–1500: A / **B** (correcta) |
| 3 | **B.** (recompuesta desde RGB) · Un solo punto de foco. / El ojo va a donde / hay menos ruido. | — |
| 4 | La versión larga / está en el último reel. · Compartíselo a quien arma los posteos de tu marca. | **Compartir reel** R06 en y 1050–1350 |

- **Objetivo:** interacción y un empujón de tráfico hacia R06. **CTA:** responder el quiz y compartir.
- **Prompt Claude Design:**
  > [MARCA] 4 historias.
  > (2) Dos tarjetas de 440×560 en y 570. La A tiene fondo #17181B y Arial: "¡NUEVO!" en magenta, "CALIDAD · DISEÑO · INNOVACIÓN", líneas en verde, azul y amarillo, y "¡Promo de lanzamiento!". La B es tinta, con un halo verde radial y "Una sola idea." en Rotis Light 52 px. Rótulos "A" y "B" en mono.
  > (3) "B." en Rotis Bold 300 px con una leve separación RGB y la explicación en 76 px.
  > Dejar libres las zonas de sticker.

## S03 · Detrás del sitio (junto con R05)

| # | Visual y copy final | Sticker |
|---|---|---|
| 1 | Captura del prisma en un teléfono · 34 commits para que / esto funcione en / tu teléfono. | — |
| 2 | `src/components/sections/spectrum.ts` · el bloque real del array `SPECTRUM` con su comentario, coloreado · Siete colores, uno por servicio. / Solo magenta, azul y verde: / el manual no permite otros. | — |
| 3 | Captura de Refracción · Y se prueba con el dedo, / no solo con el mouse. | — |
| 4 | ¿Qué interacción / querés que / desarmemos? | **Pregunta** en y 900–1250 |

- **Objetivo:** mostrar el oficio técnico y juntar temas para próximos contenidos. **CTA:** responder la pregunta.
- **Prompt Claude Design:**
  > [MARCA] 4 historias.
  > (1) Captura del prisma del sitio a sangre, degradé de tinta abajo y el titular en 76 px en y 1250.
  > (2) Panel #17181B con filete #3A3D42, de 960×640 en y 360, con el código real de spectrum.ts en mono 30 px: comentario en gris y cada hex en su color. Encima, la ruta del archivo en mono gris y debajo la explicación en Light 50 px.
  > (3) Captura de Refracción con degradé de tinta arriba y el titular en 70 px.
  > (4) Pregunta en 112 px, dejando libre la zona y 900–1250.

## S04 · Casos en 15 segundos (junto con R07)

| # | Visual y copy final | Sticker |
|---|---|---|
| 1 | Grilla de 3×3 con los nueve logos · Nueve trabajos. / Tocá para verlos. | — |
| 2 | SITIOS · Ader Studio · OUSHY Studio · Top Láser (tarjeta y nombre) | **3 links** junto a cada nombre: ader-studio.vercel.app · oushy-web.vercel.app · toplaserimprenta.com |
| 3 | SOCIAL MEDIA · @chillin1390bar · @chuchones_wines · @rsh_consultora · @esteticaintegralfernanda | **Menciones** sobre cada handle (confirmar antes con cada cliente) |
| 4 | Tu caso *acá.* · 30 minutos para contarnos / qué querés construir. · logo | **Link** en y 1050–1300 → calendly.com/focus-creatives-info/30min |

- **Objetivo:** que el portfolio se pueda navegar y derive en reuniones. **CTA:** visitar los casos y agendar.
- **Prompt Claude Design:**
  > [MARCA] 4 historias.
  > (1) Grilla de 3×3 con las tarjetas de cliente a 290×300 desde y 300 y el titular en y 1320.
  > (2) y (3) Lista vertical: tarjeta a la izquierda (300×340 o 240×260) y nombre a la derecha en Light 60 o 44 px, con eyebrow magenta o azul. Espacio a la derecha de cada nombre para el sticker.
  > (4) Cierre con "acá" en Serif Italic.

## S05 · Hablemos (junto con C05, cierre del mes)

| # | Visual y copy final | Sticker |
|---|---|---|
| 1 | Antes de / escribirnos, / tres cosas. | — |
| 2 | 01 · Trabajamos / en español / y en *inglés.* | — |
| 3 | 02 · Marca, contenido, / web y software. · En un mismo equipo. (en gris) | — |
| 4 | 03 · Se empieza con / una llamada / de 30 minutos. · O por WhatsApp: +54 9 11 5926 4267 | **Link** en y 1000–1250 → Calendly |

- **Objetivo:** bajar la fricción del primer contacto. Toda la información está en el sitio: bilingüe, servicios, reunión de 30 minutos, WhatsApp. **CTA:** agendar.
- **Nota:** "software" en el cuadro 3 responde al brief del estudio (ver supuesto en `01-marca.md`).
- **Prompt Claude Design:**
  > [MARCA] 4 historias tipográficas.
  > Número en mono gris sobre cada titular en Light 104–128 px, con una palabra en Serif Italic en el cuadro 2 ("inglés").
  > Cuadro 4 con anillos arriba a la derecha y una marca verde.
  > Dejar libre la zona y 1000–1250.
