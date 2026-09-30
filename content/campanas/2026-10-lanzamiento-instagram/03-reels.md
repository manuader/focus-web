# 03 · Diez reels

> **Revisión de guion (30/09/2026):** tres rondas con un revisor independiente, con la rúbrica de `.claude/skills/focus-contenido/references/guion.md` (umbral 8,5). Puntajes finales: R01 8,40 → 8,5 con el CTA propio que ya está aplicado · R02 8,50 · R03 8,60 · R04 8,35 · R05 8,10 · R06 8,70 · R07 7,90 · R08 8,40 · R09 7,75 · R10 8,60. R04, R05, R07, R08 y R09 quedan por debajo por estructura, no por copy. Publicarlos así o rehacerlos es decisión del usuario (ver `06-matriz-y-calendario.md`).
>
> **Tipografía:** desde la versión del 30/09 las piezas usan la gramática del design system: titulares en ExtraBold mayúscula (`t-head`), énfasis en ExtraBold (`*palabra*`) y serif itálica solo en bajadas y eyebrows. En las tablas, `~texto~` indica serif itálica.

Los diez están **producidos**, más el borrador RX: `entregas/reels/*.mp4`, en 1080×1920, 30 fps, H.264 con AAC y alrededor de -14 LUFS, cada uno con su portada `.jpg` incrustada como cuadro 0. El código de cada uno está en `reels/rNN.js`. La música es original, sintetizada por pieza (`.claude/skills/focus-contenido/kit/audio.py`). **La voz en off no está grabada**: R01 y R09 tienen el guion listo, y todos funcionan sin sonido.

Regla de toda la tanda: la skill `.claude/skills/focus-identidad/`.

**Bloque de marca** (va al principio de cada prompt para Claude Design; en las fichas aparece como `[MARCA]`):

> FOCUS creatives, estudio de diseño, contenido y software de Buenos Aires. Fondo tinta #0A0A0B, texto #F6F6F4. Los acentos van solo como luz aditiva, nunca como fondo: magenta #FF00FF, azul #0033FF (en texto chico, #5B8CFF) y verde #00FF33, y entre el 85 y el 95 % del cuadro queda oscuro. Tipografía del sitio, Rotis Semi Sans: titulares en ExtraBold 800 mayúscula (tracking -3,5 %, interlineado 0,95); enunciados en Light 300 en caja normal, con una sola palabra en ExtraBold; eyebrows de sección y bajadas en Source Serif 4 Italic gris (eyebrow con filete de 54 px); micro-rótulos en Bold mayúscula con tracking 0,26 em. Grano fino y viñeta suave. Gestos permitidos: rack focus (blur de 16 a 0 px con cubic-bezier(0.16,1,0.3,1)), refracción en tres capas RGB en modo screen que convergen a blanco, haz y prisma, umbral (una línea de luz que barre el cuadro) y anillos concéntricos. Transiciones: desenfoque escalonado, separación RGB, barrido de umbral, iris o corte al beat. No usar exclamaciones, emojis ni rayas; voseo rioplatense. Logo: el archivo oficial focus-logo-light.png, nunca retipeado. Zona segura del reel: x entre 80 y 1000, y entre 250 y 1500.

**Plantilla /brag-slim** (se ejecuta desde la raíz del repo):

```text
/brag-slim --format vertical --duration <s> --tone "polished, FOCUS: dark ink, additive light magenta/blue/green, rack focus and RGB refraction only, Rotis Semi Sans Light, no exclamation marks, calm original ambient in D, ends in focus"
Before planning read .claude/skills/focus-identidad/SKILL.md and follow it over any /brag default.
<storyboard de la ficha>
```

---

## R01 · Manifiesto · "Mirar no alcanza"

`focus_reel01_manifiesto.mp4` · 22 s

- **Objetivo:** presentar la marca y su postura. Es el primer reel fijado del perfil.
- **Idea central:** no hace falta otra marca, hace falta foco. El ruido se va fuera del plano y queda el ángulo propio.
- **Público:** dueños y directores de marcas que ya existen y se ven más chicas de lo que son.
- **Formato:** manifiesto tipográfico sobre el key visual de campaña.
- **Gancho (0–2 s):** las manos del key visual `img-01`, con su intervención RGB, detrás de un "MIRAR" desenfocado que entra en foco con un tic de lente. Enseguida aparece "NO ALCANZA".
- **Guion:**

| Tiempo | Imagen | Texto en pantalla | Voz en off (opcional) |
|---|---|---|---|
| 0–3,2 | Key visual `img-01` atenuado, push-in lento. El lockup entra en foco. | MIRAR / *NO ALCANZA* | "Mirar no alcanza." |
| 3,2–6,6 | Igual. | Tu marca tiene un ángulo. / No se ve. | "Tu marca tiene un ángulo. No se ve." |
| 6,6–11,4 | Negro. Tres líneas que se desenfocan y pierden opacidad. | El ruido, / la tendencia, / la copia: → se van fuera del plano. | igual |
| 11,4–15,6 | Anillos que giran y se cierran como una lente. | No hace falta / otra marca. / Hace falta *foco.* (en ExtraBold, recompuesta desde RGB) | igual |
| 15,6–19,3 | Anillos. | Identidad, dirección de arte, / contenido y sitios. | igual |
| 19,3–22 | El logo se recompone desde tres capas de luz. | El punto donde todo cambia · Mostranos tu marca · focuscreatives.net | "FOCUS." |

- **Dirección de arte:** tinta, el key visual solo en el gancho, anillos en gris 700 con una marca magenta. El único color fuerte está en las manos y en el logo.
- **Movimiento y sonido:** rack focus de texto y push-in. Pad en Re menor 9 que se resuelve a Re mayor 9 justo sobre "enfoca". Tics de lente en cada enfoque, un swell al disolverse el ruido y un grave en el cambio de escena.
- **Cierre:** logo y tagline. **CTA:** "Mostranos tu marca · focuscreatives.net".
- **Caption:**
  > Mirar no alcanza. Una marca que ya existe no necesita inventarse de nuevo: necesita que alguien encuentre el ángulo que ya tiene y lo ponga en foco.
  > Somos FOCUS, un estudio de identidad de marca, dirección de arte, contenido y software en Buenos Aires.
  > Hablemos · focuscreatives.net
  > #focuscreatives #identidaddemarca #direcciondearte #buenosaires
- **Prompt /brag-slim:** plantilla con `--duration 22` y el storyboard de la tabla; componentes: `public/assets/img-01.jpg`, `rings.svg`, logo. Voz: `--voice` solo si hay locutor elegido.
- **Prompt Claude Design:**
  > [MARCA] Reel vertical 1080×1920, 22 s, 30 fps. Manifiesto tipográfico.
  > (1) 0–3,2 s: la foto de campaña img-01 (manos con halo RGB) al 50 % de brillo, con push-in de 1,55 a 1,7. "MIRAR" en Rotis Bold mayúscula 210 px entra de blur 26 a 0; a 1,25 s entra "NO ALCANZA" en Light Italic mayúscula 92 px.
  > (2) 3,2–6,6 s: "Tu marca tiene un ángulo. / No se ve." en 54 px, la segunda línea en gris.
  > (3) 6,6–11,4 s: sobre negro, "El ruido, / la tendencia, / la copia:" en 120 px, línea por línea; a los 8,9 s las tres se desenfocan a 14 px y bajan al 45 % mientras entra, palabra por palabra, "se van fuera del plano."
  > (4) 11,4–15,6 s: anillos concéntricos girando (trazo de 1,5 px, gris #3A3D42, una marca magenta); "No hace falta / otra marca." en Rotis Light 124 px; a 13,1 s "Hace falta **foco.**" en 132 px, con "foco" en Rotis ExtraBold, recompuesta desde tres capas RGB separadas 34 px.
  > (5) 15,9–19,3 s: "Identidad, dirección de arte, / contenido y sitios." en 96 px.
  > (6) 19,4–22 s: el logo se recompone desde tres copias magenta, azul y verde desplazadas 40 px; debajo, "EL PUNTO DONDE TODO CAMBIA" en Light Italic y "focuscreatives.net".
  > Salidas en desenfoque, nunca en crossfade. Grano. Audio: pad ambient en Re que resuelve a mayor en el paso 4. Entregá el MP4 y la portada en el segundo 2,6.

---

## R02 · Demostración visual · "Un solo prisma"

`focus_reel02_siete-disciplinas.mp4` · 20 s

- **Objetivo:** explicar la oferta completa sin enumerarla como un menú.
- **Idea central:** una marca armada por siete proveedores se ve partida. Un solo estudio, un solo criterio, un solo haz.
- **Público:** marcas que hoy tienen el logo con uno, el sitio con otro y las redes con un tercero.
- **Formato:** demostración visual. Un haz se abre en abanico y después aparece el prisma real del sitio.
- **Gancho:** un haz blanco cae sobre un prisma y se abre en siete bandas desparejas, mientras entra "Un logo por acá. / El sitio, por allá. / Los posteos, de otro."
- **Guion:**

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–5,6 | Haz y prisma dibujados; siete bandas del espectro caen a destinos desparejos, cada una con el nombre de su servicio. | Un logo por acá. / El sitio, por allá. / Los posteos, de otro. → Armada por partes. |
| 5,6–13 | El prisma de Servicios de focuscreatives.net en un teléfono: el espectro entra y sale un haz con la etiqueta "TU MARCA". | UN SOLO PRISMA. → ~sale una sola marca~ |
| 13,2–17,8 | Lista con puntos de luz en los siete colores del espectro. | Identidad de marca · Dirección de arte · Social media · Audiovisual · Estrategia · Páginas web · Editorial y packaging → Un estudio. No siete. |
| 17,9–20 | Negro y logo. | ¿QUÉ PARTE FALTA? · ~Escribinos.~ |

- **Dirección de arte:** es el único reel que usa el espectro de siete tonos (`#FF00FF` a `#00FF33`). En el resto se usan tres acentos.
- **Movimiento y sonido:** haz que avanza, bandas escalonadas y captura real. Pulso a 84 BPM desde la captura. El acorde se resuelve cuando aparece "TU MARCA".
- **Cierre / CTA:** "¿QUÉ PARTE FALTA? · Escribinos." Invita a escribir por DM.
- **Caption:**
  > Un logo por acá, el sitio por allá, los posteos de otro. Cada pieza puede estar bien hecha y aun así la marca se ve partida.
  > Hacemos identidad, dirección de arte, social media, audiovisual, estrategia, web y packaging con un solo criterio, para que todo salga como un solo haz.
  > ¿Qué banda le falta a tu marca? Escribinos.
  > #focuscreatives #brandingestrategico #diseñodemarca #agenciacreativa
- **Prompt /brag-slim:** plantilla con `--duration 20`. "Reuse src/components/sections/Servicios.tsx + PrismaMovil.tsx (mobile prism, scroll-driven) and spectrum.ts. Hook: white beam splits into 7 uneven bands labeled with SERVICES titles…" y el storyboard.
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 20 s.
  > (1) 0–5,6 s: un haz blanco con glow cae desde el borde superior hasta un prisma triangular de líneas blancas (centro 540,700) y se abre en siete bandas con los colores #FF00FF #C010FF #8020FF #0033FF #0080DD #00C088 #00FF33 hacia destinos desparejos entre y 930 e y 1250. Cada banda lleva el nombre de un servicio en Rotis Bold mayúscula 28 px, en su color. Arriba, línea por línea: "Un logo por acá. / El sitio, por allá. / Los posteos, de otro." Abajo, en gris: "Así se ve una marca armada por partes."
  > (2) 5,6–13 s: grabación del sitio en un teléfono, en la sección Servicios: siete bandas convergen en el prisma y sale un haz blanco "TU MARCA". Recorte central de 1080×880. Arriba "UN SOLO PRISMA." en ExtraBold mayúscula; debajo, a 8,6 s, "sale una sola marca" en Source Serif Italic
  > (3) 13,2–17,2 s: lista de los siete servicios en 66 px, con un punto de luz de su color a la izquierda; debajo, "Contratás un estudio. / No siete."
  > (4) 17,9–20 s: "¿QUÉ PARTE FALTA?" en ExtraBold mayúscula 104 px, "Escribinos." en Source Serif Italic 88 px y el logo chico.
  > Audio: pulso a 84 BPM; el acorde se resuelve cuando aparece el haz blanco.

---

## R03 · Software y experiencia interactiva · "Tocá la pantalla"

`focus_reel03_toca-la-pantalla.mp4` · 20 s

- **Objetivo:** abrir el frente de software y experiencias interactivas con una prueba que se puede verificar.
- **Idea central:** lo que parece motion editado es un sitio respondiendo a un dedo, y FOCUS lo diseñó y lo programó.
- **Público:** marcas y startups que necesitan un sitio o un producto que se sienta diferente.
- **Formato:** demostración de producto, con tres interacciones reales grabadas en un teléfono.
- **Gancho:** "Esto es un sitio, / no un render." sobre la Superposición del sitio moviéndose. Enseguida: "Es focuscreatives.net, grabado en pantalla." (Las capturas usan la vista de teléfono con toques simulados: por eso no se dice "sin editar" ni "un dedo real".)
- **Guion:**

| Tiempo | Imagen (capturas reales del sitio en un teléfono) | Texto |
|---|---|---|
| 0–3,3 | Superposición: dos discos en modo diferencia, arrastrados con el dedo. | Esto es un sitio, / no un render. · Es focuscreatives.net, grabado en pantalla. |
| 3,3–5,9 | Igual. | 01 Superposición · El color nace al cruzarse. |
| 5,9–10,8 | Refracción: la palabra se separa en tres capas y se recompone. | 02 Refracción · Tres capas de luz se separan y vuelven a ser blanco. |
| 10,8–15,4 | Foco: la lente sigue al dedo sobre el párrafo. | 03 Foco · El dedo es la lente. Lo que toca, se lee. |
| 15,6–20 | Negro. | Diseñamos / y *programamos* / experiencias así. · Probalo en focuscreatives.net, desde el teléfono. |

- **Dirección de arte:** la captura va a sangre y las etiquetas técnicas en un panel de tinta translúcida con reglas de 1 px, como una ficha de cámara.
- **Movimiento y sonido:** el ritmo lo marca el dedo. Pulso a 92 BPM, un clic en cada etiqueta y un swell en cada cambio de sección.
- **CTA:** "Probalo en focuscreatives.net, desde el teléfono.".
- **Caption:**
  > No es un render ni una animación aparte: es focuscreatives.net grabado en la vista de teléfono. La superposición, la refracción y la lente responden al toque.
  > Además de marcas, diseñamos y programamos sitios, productos digitales y experiencias interactivas.
  > Probalo desde el celular: focuscreatives.net
  > #focuscreatives #diseñoweb #desarrolloweb #experienciainteractiva #creativecoding
- **Prompt /brag-slim:** plantilla con `--duration 20`. "Record the real site (npm run build && next start) on a 432×768 touch viewport at 2.5x with virtual time; sections Superposicion, Refraccion, Foco driven by simulated touch drags…" (así se hizo: `.claude/skills/focus-contenido/kit/capture.mjs`).
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 20 s, armado sobre tres grabaciones de pantalla de focuscreatives.net en un teléfono: Superposición, Refracción y Foco, cada una con un dedo arrastrando.
  > 0–2,9 s: la grabación bajo un velo de tinta al 72 %; "Esto es un sitio, / no un render." en 108 px y "Es focuscreatives.net, grabado en pantalla." en gris.
  > Cada sección lleva un panel en y 250–400, con fondo rgba(10,10,11,.78), reglas de 1 px #3A3D42, número y nombre en Rotis Bold mayúscula y la explicación en Light 38 px gris.
  > Cierre: "Diseñamos / y *programamos* / experiencias así." y el CTA.
  > Cortes con desenfoque; pulso a 92 BPM.

---

## R04 · Criterio y estrategia · "Tres capas"

`focus_reel04_tres-capas.mp4` · 20 s

- **Objetivo:** mostrar el método de diagnóstico y que el video se guarde.
- **Idea central:** toda marca tiene tres capas: estrategia, imagen y voz. Cuando una se corre, la marca se ve borrosa.
- **Público:** responsables de marca que sienten que "algo no cierra" y no saben qué.
- **Formato:** explicativo tipográfico sobre una sola palabra refractada.
- **Gancho:** "Tres capas. / ¿Cuál se corrió?" mientras la palabra IDENTIDAD, blanca, se abre en magenta, azul y verde.
- **Guion:**

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–2,6 | IDENTIDAD, blanca, se separa en tres capas. | Tres capas. / ¿Cuál se corrió? |
| 3–8,8 | Capas abiertas. | ESTRATEGIA ¿Qué lugar ocupa? · IMAGEN ¿Cómo se reconoce? · VOZ ¿Cómo suena? |
| 9–12,8 | Las capas quedan corridas y se desenfocan. | Una capa corrida / y todo se ve borroso. |
| 12,9–15,6 | Las capas convergen. | En FOCUS miramos cada una / por separado. |
| 15,7–20 | Vuelve a ser blanca. | Después las alineamos / hasta volver al *blanco.* · Guardalo para tu próxima revisión. |

- **Dirección de arte:** una sola palabra de 220 px en Rotis Bold, con las capas en modo screen. Los rótulos de cada capa van en su color. Es la versión explicada de la sección Refracción del sitio.
- **Movimiento y sonido:** refracción controlada en tiempo. Acorde suspendido, luego menor en el desenfoque, luego mayor en la recomposición. Un tic por cada capa que se nombra.
- **CTA:** guardar. Es un video de consulta.
- **Caption:**
  > Toda marca está hecha de tres capas: estrategia (qué lugar ocupa), imagen (cómo se reconoce) y voz (cómo suena).
  > Cuando una se corre, la marca no se rompe: se ve borrosa, y eso es peor, porque cuesta darse cuenta.
  > Nosotros las separamos para ver de qué está hecha y las volvemos a juntar hasta que la luz es blanca otra vez.
  > Guardalo para tu próxima revisión de marca.
  > #focuscreatives #estrategiademarca #identidaddemarca #branding
- **Prompt /brag-slim:** plantilla con `--duration 20`. "Reuse the three-layer screen-blend technique from src/components/sections/Refraccion.tsx on the word MARCA…" y el storyboard.
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 20 s. La palabra "IDENTIDAD" en Rotis ExtraBold mayúscula 168 px, centrada en y 790 (MARCA ya se usó en el reel v1), formada por tres copias (#FF00FF, #0033FF, #00FF33) en mix-blend-mode screen.
  > Juntas se leen blancas. De 1,2 a 2,6 s se separan hasta 95 px, cada una en su dirección; a los 9 s se desenfocan 9 px; de 13,2 a 15,4 s convergen de nuevo a blanco.
  > Arriba: "Tres capas. / ¿Cuál se corrió?". De 3 a 8,8 s, tres filas: rótulo en mayúscula de color (ESTRATEGIA / IMAGEN / VOZ) y pregunta en Light 48 px.
  > Después, cada frase de la tabla en la zona y 1180, con entrada en foco línea por línea.
  > Audio: acorde suspendido, menor, mayor.

---

## R05 · Proceso · "Un commit a la vez"

`focus_reel05_un-commit-a-la-vez.mp4` · 22 s

- **Objetivo:** mostrar cómo se trabaja por dentro y ganar confianza técnica.
- **Idea central:** cada detalle del sitio fue una decisión escrita en el historial: 34 commits entre el 3 de agosto y el 28 de septiembre de 2026 (verificado con `git log`).
- **Público:** clientes que valoran el oficio, y perfiles técnicos que recomiendan proveedores.
- **Formato:** proceso con documento real (el historial de git) y resultado en el teléfono.
- **Gancho:** "DALE AL TELÉFONO / UN PRISMA DE VERDAD" en ExtraBold mayúscula, con el rótulo mono "commit · 28/09 · Give phones a real prism", y "Esta línea rehízo el prisma."
- **Guion:**

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–3,4 | Mensaje del commit en grande. | DALE AL TELÉFONO / UN PRISMA DE VERDAD · commit · 28/09 · Give phones a real prism · Esta línea rehízo el prisma. |
| 3,5–13 | Nueve commits reales con fecha; todos desenfocados salvo el que se explica. | 08/19 Rebuild Servicios as an inverted prism → El prisma de servicios, dado vuelta. · 08/25 Give phones a pointer… → Le dimos un puntero al teléfono. · 08/25 Stop measuring five sections a frame… → Medía cinco secciones para animar una. Ya no. |
| 13,2–18,6 | El hero del sitio, grabado en un teléfono. | 34 commits entre el 3 de agosto / y el 28 de septiembre. |
| 18,8–22 | Negro. | Diseño y código / en la misma *mesa.* · Seguí el próximo commit. |

- **Dirección de arte:** los commits en inglés (son los reales) funcionan como textura; la explicación en español es lo que se lee. Hay foco selectivo por línea.
- **Movimiento y sonido:** rack focus entre líneas. Pulso a 88 BPM y un tic en cada cambio de foco.
- **CTA:** seguir la cuenta ("mostramos cómo se hace cada pieza").
- **Caption:**
  > "Give phones a real prism." Así se llama uno de los 34 commits que llevó focuscreatives.net entre el 3 de agosto y el 28 de septiembre.
  > Cada línea del historial es una decisión: dar vuelta el prisma de servicios, darle un puntero al teléfono, dejar de medir cinco secciones para animar una.
  > Diseño y código en la misma mesa. Seguinos para ver el proceso de cada pieza.
  > #focuscreatives #procesocreativo #desarrolloweb #nextjs #diseñoweb
- **Prompt /brag-slim:** plantilla con `--duration 22`. "Use the real git log of this repo (only commit subjects and dates, nothing else)…" y el storyboard.
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 22 s.
  > Gancho: "DALE AL TELÉFONO / UN PRISMA DE VERDAD" en Rotis ExtraBold mayúscula 104 px, con el rótulo "commit · 28/09 · Give phones a real prism" en mono gris.
  > De 3,5 a 13 s: lista de nueve commits reales (fecha gris + mensaje, Light 36 px). En cada momento, una línea en foco y el resto con blur de 7 px al 35 %. Debajo, la explicación en español en Light 46–52 px.
  > De 13,2 a 18,6 s: grabación del prisma del sitio en un teléfono, con degradé de tinta abajo y el dato "34 commits…".
  > Cierre: "Diseño y código / en la misma *mesa.*"
  > Pulso a 88 BPM.

---

## R06 · Contraste antes/después · "Esto lo firma cualquiera"

`focus_reel06_esto-lo-firma-cualquiera.mp4` · 18 s · **candidato a trial reel**

- **Objetivo:** alcance entre no seguidores; que se comparta.
- **Idea central:** la misma idea, contada sin criterio y con criterio. La diferencia no es de gusto.
- **Público:** dueños de marca que hacen sus propios posteos y equipos de marketing chicos.
- **Formato:** antes/después sobre una pieza propia. El "antes" es un pastiche genérico armado por FOCUS y está rotulado así: no pertenece a ningún cliente ni a otra agencia.
- **Gancho:** una placa en degradé violeta y naranja con "¡LLEVÁ TU MARCA AL SIGUIENTE NIVEL!" y, debajo, "Esto lo firma cualquiera."
- **Guion:**

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–2,8 | Placa genérica: degradé, Arial Black, botón amarillo. | EJEMPLO GENÉRICO ARMADO POR FOCUS · Esto lo firma / cualquiera. |
| 2,8–4,2 | Una línea de luz barre la placa y deja la versión de FOCUS: tinta, un halo magenta, "Tu marca / ya es grande." | |
| 4,3–12,6 | Versión de FOCUS. | La misma idea, bien dicha: 01 Sin signos de exclamación. 02 Una idea por frase. 03 El color es luz, no fondo. 04 Un solo punto de foco. |
| 12,8–18 | Negro. | La diferencia / no es gusto. / Es *criterio.* · Mandáselo a quien decide / cómo habla. |

- **Dirección de arte:** es la única pieza de la tanda donde aparecen colores, tipografías y exclamaciones fuera de marca, y solo en el "antes", rotulado.
- **Movimiento y sonido:** barrido de umbral de 1 px. Un clic por regla. El acorde se resuelve en "criterio".
- **CTA:** enviar ("Mandáselo a…"). Los envíos pesan más con no seguidores.
- **Caption:**
  > Mismo mensaje, dos versiones. La primera la podría firmar cualquier marca; la segunda, solo la tuya.
  > No es una cuestión de gusto: sin exclamaciones, una idea por frase, el color como luz y un solo punto de foco.
  > Mandáselo a quien está por escribir el próximo posteo de tu marca.
  > #focuscreatives #direcciondearte #diseñografico #contenidodemarca
- **Prompt /brag-slim:** plantilla con `--duration 18`. "Before: a clearly labeled generic pastiche card (not any real brand)…" y el storyboard.
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 18 s.
  > Tarjeta de 960×820 en (60,290). Antes: degradé 135° #7B2FF7 → #F107A3 → #FF7B00, "AGENCIA CREATIVA 360°", "¡LLEVÁ TU MARCA AL SIGUIENTE NIVEL!" en Arial Black 96 px blanco con sombra, "Soluciones integrales · Calidad premium · ¡Resultados garantizados!" y un botón amarillo "¡CONTACTANOS YA!". Debajo, rótulo mono "EJEMPLO GENÉRICO ARMADO POR FOCUS" y "Esto lo firma / cualquiera." en Rotis Light 104 px.
  > De 2,8 a 4,2 s: una línea blanca de 2 px con glow barre de izquierda a derecha y revela la versión FOCUS: fondo #0A0A0B, halo radial magenta arriba a la derecha, eyebrow "IDENTIDAD DE MARCA", "Tu marca / ya es grande." en Light 92 px y "Todavía no se nota." en gris.
  > Debajo, las cuatro reglas numeradas, apareciendo una cada 1,7 s.
  > Cierre tipográfico: "La diferencia / no es gusto. / Es **criterio.**" con "criterio" en Rotis ExtraBold recompuesto desde RGB.

---

## R07 · Portfolio verificado · "Ocho marcas"

`focus_reel07_nueve-trabajos.mp4` · 22 s

- **Objetivo:** prueba social con casos reales, sin inventar resultados.
- **Idea central:** rubros muy distintos, entre la arquitectura y el vino boutique, con el mismo criterio.
- **Público:** prospectos que quieren ver con quién trabajó FOCUS.
- **Formato:** portfolio por capítulos, con transición de iris.
- **Gancho:** una grilla de 3×3 con los nueve logos que entran en foco uno por uno, y después "OCHO MARCAS. / Ningún rubro se repite."
- **Guion:**

| Tiempo | Capítulo | Contenido (solo lo que dice `content.ts`) |
|---|---|---|
| 0–3,2 | Gancho | Grilla con los nueve logos · OCHO MARCAS. / Ningún rubro se repite. |
| 3,2–7,2 | PÁGINAS WEB | Ader Studio (Arquitectura), OUSHY Studio (Estudio creativo), Top Láser (Imprenta) · Tres sitios, / tres rubros. |
| 7,2–11,8 | SOCIAL MEDIA MANAGEMENT | @chillin1390bar (Bar), @chuchones_wines (Vinos boutique), @rsh_consultora (Seguridad e higiene), @esteticaintegralfernanda (Estética y salud) |
| 11,8–15,2 | IDENTIDAD · SOCIAL MEDIA · AUDIOVISUAL | Top Láser · Imprenta · identidad, redes, video y web |
| 15,2–18,4 | EDICIÓN DE VIDEO · SOCIAL MEDIA | @santatuca: edición de reels y videos de YouTube |
| 18,4–22 | Cierre | Galería "Casos" del sitio, grabada en un teléfono · ¿EL PRÓXIMO RUBRO? · Agendá 30 minutos. |

- **Dirección de arte:** las tarjetas de cliente se muestran tal cual, sin filtros de FOCUS encima. El eyebrow de cada capítulo cambia de acento: magenta, azul, verde, magenta.
- **Movimiento y sonido:** iris en cada capítulo. Pulso a 96 BPM, el más rápido de la tanda, y un clic por capítulo.
- **CTA:** "¿El próximo rubro?" y agendar 30 minutos por Calendly.
- **Caption:**
  > Una imprenta, un bar, vinos boutique, un estudio de arquitectura, un creador de contenido, una consultora de seguridad e higiene, un centro de estética. Ocho marcas, ningún rubro repetido.
  > Sitios, social media, identidad y edición de video, con el mismo criterio.
  > Todos los casos están en focuscreatives.net. El tuyo puede ser el próximo: agendá 30 minutos desde el link del perfil.
  > #focuscreatives #portfolio #socialmedia #diseñoweb #buenosaires
- **Etiquetas sugeridas:** @chillin1390bar @santatuca @chuchones_wines @rsh_consultora @esteticaintegralfernanda @toplaserimprenta (confirmar antes con cada cliente).
- **Prompt /brag-slim:** plantilla con `--duration 22`. "Only the cases in WORKS (src/lib/content.ts), with their real services and card artwork in public/assets/clients/. No metrics, no testimonials…"
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 22 s. Usar solo las nueve tarjetas de /public/assets/clients/*-card.jpg, sin intervenirlas.
  > Gancho: grilla de 3×3 (tarjetas de 300×375 con separación de 30 px) que entran en foco escalonadas cada 70 ms; velo de tinta al 66 %; "OCHO MARCAS." en ExtraBold mayúscula 124 px y "Ningún rubro se repite."
  > Cuatro capítulos con transición de iris (círculo que se abre desde el centro): eyebrow de color, tarjetas y nombre en Bold 34 px, rubro en gris.
  > Cierre sobre la grabación de la galería del sitio con velo al 88 %: "¿EL PRÓXIMO RUBRO?" y "Agendá 30 minutos."
  > Pulso a 96 BPM.

---

## R08 · Pieza tipográfica · "Tu marca dice demasiado"

`focus_reel08_tu-marca-dice-demasiado.mp4` · 18 s · **candidato a trial reel**

- **Objetivo:** generar comentarios y conversación.
- **Idea central:** un párrafo de 22 palabras que cualquier marca usa. Nadie las recuerda todas; se recuerda una.
- **Público:** cualquiera que escriba la bio o el "sobre nosotros" de su marca.
- **Formato:** tipografía cinética con una retícula de enfoque que busca y no encuentra.
- **Gancho:** "Veintidós palabras. / Ninguna es tuya." sobre un párrafo gris de clichés: calidad, innovación, pasión, compromiso…
- **Guion:**

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–2,5 | Párrafo de 22 palabras nítido. | Veintidós palabras. / Ninguna es tuya. |
| 2,6–9,4 | Todo se desenfoca; una retícula recorre el párrafo en S y solo enfoca lo que toca. | Nadie las recuerda / todas. |
| 9,8–12,8 | Negro. | Se quedan con *una.* |
| 12,9–18 | La pregunta se recompone desde RGB. | ¿Cuál es la tuya? · Dejala en comentarios. / Elegirla es nuestro trabajo. |

- **Dirección de arte:** párrafo en Light 74 px gris y la retícula oficial (`reticle.svg`) invertida. No hay color hasta la pregunta final.
- **Movimiento y sonido:** la lente enfoca cada palabra según su distancia a la retícula. Tres tics mientras busca y un acorde que se resuelve en "una".
- **CTA:** comentar la palabra.
- **Caption:**
  > Calidad, innovación, pasión, compromiso, excelencia. Si tu marca dice todo, no se queda con nada.
  > La gente no recuerda veintidós palabras. Recuerda una, y el trabajo de una marca es elegir cuál y ocuparla en serio.
  > ¿Cuál es la de tu marca? Dejala en los comentarios y la pensamos con vos.
  > #focuscreatives #estrategiademarca #posicionamiento #copywriting
- **Prompt /brag-slim:** plantilla con `--duration 18`. "Lens effect: each word's blur is a function of its distance to the moving reticle (public/assets/reticle.svg)…"
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 18 s. Párrafo en Rotis Light 74 px gris #A7ACB4 (x 80, y 560, ancho 920): "calidad innovación pasión compromiso excelencia soluciones confianza experiencia resultados creatividad calidez tradición vanguardia cercanía profesionalismo trayectoria diseño estrategia impacto energía propósito valor".
  > De 2,6 a 9,4 s: una retícula de enfoque de 380 px (círculo, cruz y marcas) recorre el párrafo en S de arriba hacia abajo. Cada palabra tiene un blur de 0 a 13 px según su distancia a la retícula, en un radio de 170 px.
  > Después, sobre negro: "Se quedan con *una.*" y "¿Cuál es la tuya?", recompuesta desde tres capas RGB. CTA a comentar.

---

## R09 · Narrativa abstracta · "El umbral"

`focus_reel09_el-umbral.mp4` · 20 s

- **Objetivo:** dejar huella emocional y cerrar la primera tanda.
- **Idea central:** el umbral, el punto donde una identidad dejó de ser lo que era y todavía no es lo que será. Es el concepto madre del sitio.
- **Público:** audiencia general de la cuenta.
- **Formato:** narrativa abstracta. Luz, una puerta y el mundo de la marca.
- **Gancho:** oscuridad total y una línea vertical de luz que crece en el centro, sin texto durante el primer segundo y medio. Después: "Lo que parece / una puerta".
- **Guion y voz en off (opcional):**

| Tiempo | Imagen | Texto / voz en off |
|---|---|---|
| 0–1,8 | Una línea de luz crece. | (silencio) |
| 1,4–5 | La línea se abre en una puerta de luz. | "Lo que parece / una puerta" … "resulta ser / un *mundo.*" |
| 5–9,4 | La puerta se abre al póster de marca (`img-06`), que entra en foco con zoom out. | (música) |
| 9,2–13,4 | La sección Umbral del sitio, grabada en un teléfono. | (el sitio dice lo mismo: rima visual) |
| 13,6–16,8 | Negro. | "Una marca deja de ser / lo que era." · ~Todavía no es otra.~ |
| 17–20 | Logo. | "Ahí hacemos / *identidad.*" · ¿Estás ahí? Mandanos un mensaje. |

- **Dirección de arte:** la puerta es la única luz blanca plena de la tanda. El póster aparece con sus colores originales, como obra.
- **Movimiento y sonido:** umbral y apertura. Acorde suspendido que se abre a mayor en la puerta, se vuelve menor en la duda y regresa a mayor en "Ahí trabajamos".
- **CTA:** "¿Estás ahí? Mandanos un mensaje."
- **Caption:**
  > Hay un momento en que una marca deja de ser lo que era y todavía no es otra. Parece una puerta. Resulta ser un mundo.
  > Ahí hacemos identidad.
  > ¿Tu marca está en ese punto? Mandanos un mensaje.
  > #focuscreatives #rebranding #identidaddemarca #direcciondearte
- **Prompt /brag-slim:** plantilla con `--duration 20 --voice` (si hay voz). "Door of light built from a 2px line that widens to 360×900 and then to full frame, clipping public/assets/img-06.jpg…"
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 20 s.
  > Una línea vertical de 2 px, blanca con glow y un leve halo magenta, crece hasta 900 px de alto entre 0,2 y 1,8 s. De 1,9 a 4,6 s se abre en un rectángulo de luz de 360×900 con degradé blanco perla. De 5 a 6,8 s el rectángulo crece hasta el cuadro completo y funciona como máscara del póster de marca img-06, que entra con zoom de 1,25 a 1.
  > Texto arriba: "Lo que parece / una puerta"; abajo: "resulta ser / un *mundo.*"
  > Luego, 4 s de la sección Umbral del sitio en un teléfono y un cierre tipográfico con "Ahí hacemos / *identidad.*"
  > Voz en off tranquila, rioplatense, de 2,2 a 2,6 palabras por segundo.

---

## R10 · Software y oficio · "Nadie lo va a notar"

`focus_reel10_nadie-lo-va-a-notar.mp4` · 20 s

- **Objetivo:** demostrar nivel de ejecución en web y producto.
- **Idea central:** tres detalles invisibles del sitio, reales en el código: el idioma se elige según el navegador (`src/lib/locale.ts`); un azul propio para texto chico, que pasa de 2,47:1 a 6,2:1 de contraste (`globals.css`); y respeto por "reducir movimiento" (`prefers-reduced-motion` en las secciones animadas).
- **Público:** marcas que están por encargar un sitio y equipos de producto.
- **Formato:** lista de 3 detalles, con numeración técnica.
- **Gancho:** "Nadie lo va / a notar." Enseguida: "Por eso lo hicimos."
- **Guion:**

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–2,8 | Negro. | Nadie lo va / a notar. · Por eso lo hicimos. |
| 2,9–7 | "ES" y "EN" gigantes, con el foco pasando de una a otra. | 01 / 03 · Te habla en tu idioma, / según tu navegador. · Escrito para cada lector. |
| 7,1–11,6 | Dos muestras "Aa": #0033FF (2,47:1) y #5B8CFF (6,2:1). | 02 / 03 · Nuestro azul no se leía / en texto chico. · Hicimos un azul solo para eso. |
| 11,7–15,9 | Anillos que giran rápido y se detienen con suavidad. | 03 / 03 · ¿Tu teléfono pide menos movimiento? / Las animaciones se frenan. |
| 16,1–20 | Negro. | El oficio está / en lo que no se *ve.* · ¿Tu sitio está a esta altura? |

- **Dirección de arte:** numeración mono de ficha técnica. El azul es el protagonista de la pieza.
- **Movimiento y sonido:** rack focus ES↔EN y anillos que se detienen. Pulso a 80 BPM que se corta cuando los anillos paran.
- **CTA:** "¿Tu sitio está a esta altura?"
- **Caption:**
  > Tres cosas de focuscreatives.net que casi nadie va a notar: te habla en tu idioma según tu navegador, tiene un azul propio para que el texto chico se lea sobre negro y frena sus animaciones si tu teléfono pide menos movimiento.
  > Nadie lo nota. Todos lo sienten.
  > ¿Tu sitio está a esta altura? Escribinos por DM.
  > #focuscreatives #diseñoweb #accesibilidad #desarrolloweb #ux
- **Prompt /brag-slim:** plantilla con `--duration 20`. "Three real details from the code: src/lib/locale.ts (Accept-Language), --focus-blue-text #5B8CFF (6.2:1 vs 2.47:1), prefers-reduced-motion…"
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 20 s, en cuatro bloques con rótulo "0N / 03" en mono gris.
  > (1) "ES" blanco y "EN" en #5B8CFF en Rotis Bold 380 px; el foco pasa de ES a EN a los 4,6 s.
  > (2) Dos cuadros de 440 px con "Aa" en 150 px: #0033FF con la etiqueta "#0033FF · 2,47:1" y #5B8CFF con "#5B8CFF · 6,2:1".
  > (3) Anillos concéntricos que giran rápido y desaceleran hasta detenerse a los 13,4 s.
  > Cierre: "El oficio está / en lo que no se *ve.*"
  > Pulso a 80 BPM.

---

## RX · BORRADOR · Portfolio de software · "De fisura a Dios" (FisuEvolution)

`focus_reelRX_borrador_fisuevolution.mp4` · 20 s · **no publicar hasta que decidas la atribución** (`evidencia.md` §5). Lleva la marca BORRADOR en pantalla.

- **Objetivo:** mostrar un producto de software propio del equipo, además del sitio de FOCUS.
- **Idea central:** un juego para iPhone con oficio de producto: economía simulada, Swift 6, 121 tests, sitio bilingüe.
- **Público:** fundadores y marcas con un producto digital en camino.
- **Formato:** caso de producto, con capturas reales de adergames-site corriendo en local. No se usa la galería, porque sus capturas del juego todavía son placeholders.
- **Verificado:**
  - el copy del sitio (`content/copy.ts`): "De fisura a Dios", "Muy pronto en la App Store", 30 niveles, "Economías a mano", "Sin cuentas y sin rastreo", ES/EN;
  - el estado del repo público `manuader/fisuevolution`, en su `ESTADO.md` del 19/07/2026: Swift 6, 121 tests en verde.
- **Declarado:** que es un "producto del fundador de FOCUS", según el brief del usuario.
- **No se afirma:** lanzamiento, descargas, usuarios ni ingresos.
- **Gancho:** el ícono real del juego y "DE FISURA A DIOS." en ExtraBold.

| Tiempo | Imagen | Texto |
|---|---|---|
| 0–3,6 | Página de FisuEvolution (ícono, título) | DE FISURA A DIOS. · Un juego para iPhone, / en camino a la App Store. |
| 3,8–8,2 | Sigue el scroll hasta "Características" | FISUEVOLUTION · MERGE / IDLE · IOS 17 O POSTERIOR · Treinta niveles, / una economía simulada / y balanceada a mano. |
| 8,5–12,2 | Negro | manuader/fisuevolution · ESTADO.md · 19/07/2026 · Swift 6. / **121 tests** en verde. · Sin cuentas y sin rastreo. |
| 12,2–16 | Home de Ader Games | Y el sitio del estudio, / en español y en inglés. |
| 16,2–20 | Negro y logo | ¿TENÉS UN PRODUCTO / EN CAMINO? · ~Lo diseñamos y lo programamos.~ · ADER GAMES · PRODUCTO DEL FUNDADOR DE FOCUS |

- **Sonido:** pulso a 96 BPM, grave en el cambio al dato técnico y resolución en el cierre.
- **CTA:** "¿Tenés un producto en camino?", para seguir por DM.
- **Caption (borrador):**
  > FisuEvolution es un juego para iPhone que va de "fisura" a Dios en treinta niveles: Swift 6, economía simulada y balanceada a mano, sin cuentas y sin rastreo. Todavía no salió; está en camino a la App Store.
  > Además de marcas y sitios, diseñamos y programamos productos. ¿Tenés uno en camino? Escribinos.
  > #focuscreatives #desarrolloios #productodigital #gamedev
- **Prompt Claude Design:**
  > [MARCA] Reel 1080×1920, 20 s, sobre grabaciones reales de adergames-site en vista de teléfono. Usar la página /es/fisuevolution (ícono y título) y la home; nunca la galería de capturas.
  > Degradé de tinta en el tercio inferior. Titular "DE FISURA A DIOS." en Rotis ExtraBold 104 px.
  > Bloque técnico sobre negro, con el rótulo mono "manuader/fisuevolution · ESTADO.md · 19/07/2026" y "Swift 6. / **121 tests** en verde."
  > Cierre "¿TENÉS UN PRODUCTO / EN CAMINO?" con la bajada serif "Lo diseñamos y lo programamos."
  > Marca "BORRADOR" (magenta, recuadro de 2 px) arriba a la derecha hasta que se apruebe.

**MusicBoxd y Alquilalo:** no hay pieza. Son proyectos de autoría compartida (curso PAW del ITBA, repo de MatiSapino) y no tienen demo pública. Ver `evidencia.md` §4.
