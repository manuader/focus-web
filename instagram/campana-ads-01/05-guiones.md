# 05 · Guiones, assets, captions y criterios de los 10 anuncios

Generado desde `produccion/ads/aNN.js` con `node produccion/build-docs.mjs`. Cada guion es el mismo objeto que dibuja el video: si se cambia un tiempo o un texto en el archivo del anuncio, este documento se regenera igual.

Convenciones del texto en pantalla: `/` separa frases que entran en momentos distintos; *itálica* es la palabra en Source Serif 4 Italic; `·` separa elementos de la placa de cierre. **No hay voz en off en esta tanda**: el texto en pantalla sostiene el mensaje sin sonido. Si se graba locución, el guion de voz es la columna "Texto en pantalla", leída a 2,2-2,6 palabras por segundo.

Formato de todos: 1080×1920 (9:16), 30 fps, 45 s, H.264 High + AAC 256 kbps 48 kHz, -14 LUFS integrados, true peak por debajo de -1 dBTP. Zonas seguras de Reels respetadas (texto entre y = 280 e y = 1240).

---

## A01 · Sin plantilla

`entregables/anuncios/focus_ad01_sin-plantilla.mp4` · portada `focus_ad01_sin-plantilla.jpg` (cuadro 29 s) · caption `focus_ad01_sin-plantilla.txt`

| | |
|---|---|
| **Etapa** | TOFU |
| **Fenómeno del atlas** | Superposición |
| **Audiencia** | P3 responsables de marketing y marca; P1 fundadoras que ya escalaron |
| **Objetivo** | Alcance y recordación: instalar la postura de FOCUS frente a la IA generativa y abrir la serie. |
| **Necesidad u objeción** | Objeción: "si todos usan IA, todo se ve igual; ¿para qué pagar un estudio?" |
| **Promesa verificable** | FOCUS usa IA para explorar y criterio para decidir; cada pieza se termina a mano. Verificable: esta campaña no usa plantillas (ver A06 y produccion/). |
| **Acción buscada** | Ver el anuncio completo y seguir la cuenta (serie de diez). |
| **Servicio destacado** | Contenido con inteligencia artificial · dirección de arte |
| **Referencia estratégica** | P10 Futura: una frase de posicionamiento clara rindió ~2,2 veces su base. P9 DixonBaxi: mostrar exploración antes de la elegida hace visible el criterio. |
| **CTA** | Seguí la serie: son diez. |
| **Destino del tráfico** | Perfil de Instagram (seguir) · secundario: focuscreatives.net |
| **Banda sonora** | Tonalidad Re, 88 BPM. Acordes: 0 s sus2 → 3.2 s min9 → 8.5 s min9 → 12 s maj9 → 16 s min9 → 24 s min9 → 31.4 s maj9 → 37 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Grilla de 9 piezas genéricas idénticas (rotuladas "Ejemplo genérico"); veladura oscura | Todo empieza a parecerse. | Entrada seca de la grilla; el texto entra en foco palabra por palabra | Corte en frío | Pad suspendido en Re, entra con un golpe grave suave | Impacto grave, vidrio | Gancho: el público reconoce el feed que ve todos los días |
| 3,2-8,5 | La pieza central desaparece; las ocho restantes convergen al centro en modo diferencia y se anulan a negro | Cuando todo se parece, / nada se ve. | Convergencia en 2,8 s con ease-in-out | Superposición hasta negro | El acorde se vacía hasta un tono | Clic al empezar; grave cuando llega a negro | Problema: la igualdad cancela a la marca |
| 8,5-16,0 | Negro. Dos discos (magenta y verde) se cruzan en diferencia; donde se tocan nace otro color | La IA hizo fácil producir. / Lo difícil ahora es distinguirse. | Discos a la deriva, lentos | Rack focus del texto | Re menor 9 abre a Si bemol mayor 9 | Tick de lente en cada frase | Tensión: el valor se movió de producir a distinguir |
| 16,0-24,0 | Grilla de 100 variaciones que se llena en cascada (anillos, espectro, retícula, serif) | Usamos IA para explorar / cien caminos. | Cascada acelerada; contador 001 → 100 | Subida de aire hacia el corte | Entra el pulso a 88 BPM, bajo y arpegio | Teclas en ráfagas | Capacidad: la IA como exploración, no como resultado |
| 24,0-31,4 | Todas salen de foco y a gris menos una; la retícula la fija; la elegida crece hasta ocupar el cuadro | Y criterio / para elegir uno. | Desenfoque selectivo; retícula que busca y fija; escala 1 → 7 | Corte al beat; crecimiento continuo | Sol menor 9; hats | Impacto al corte; tick al fijar | Diferencial: el juicio humano |
| 31,4-37,0 | Key visual real de FOCUS en foco; tres insertos al beat: una "a" en serif itálica refractada, un punto de luz, una onda de sonido | Después, lo terminamos a mano: / tipografía, luz, sonido. | Insertos de 1,5 s | Vidrio al revés antes de la imagen; cortes secos al beat | Campanas de vidrio | Clic en cada inserto | Oficio: lo que no automatiza nadie |
| 37,0-41,0 | Tinta; titular grande que se recompone desde tres capas RGB | Nada de esto / es *plantilla.* | Refracción que converge a blanco | Separación RGB → recomposición | Re lidio; se abre la luz | Impacto y subida | Giro: la propia pieza es la prueba |
| 41,0-45,0 | Placa de cierre común | Usamos IA. / No usamos *plantillas.* · Seguí la serie: son diez. · focuscreatives.net · Sin plantilla · 01/10 | Entrada desde desenfoque; logo | Veladura | Resolución en Re mayor 9 | Firma sonora de vidrio | Cierre TOFU: seguir la serie |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Grilla de piezas genéricas | DOM generado en el anuncio (paleta ajena a propósito, rotulado "ejemplo genérico") | Sin IA. Si se quiere una versión fotográfica: "nine identical generic social media ad posts, purple to orange gradient, bold white sans-serif headline, rounded CTA button, flat lay grid, top view, no brand names" |
| Cien variaciones | Canvas generado con elementos de la marca (anillos, retícula, espectro, serif, wordmark) | Variante con IA: "grid of 100 abstract minimal compositions, black background, thin white rings, magenta blue green light accents, swiss poster studies, top view, no text" |
| Superposición | Dos discos en mix-blend-mode difference (motivo del manual) | — |
| Key visual "Un foco entre la dispersión" | public/assets/img-03.jpg (propio) | — |
| Halo de luz | Shader glsl.halo | "single point of white light, chromatic aberration fringe magenta and green, pure black background, fine film grain, 35mm" |

### Caption

```text
Producir nunca fue tan fácil. Distinguirse, nunca tan difícil.

Usamos inteligencia artificial todos los días: para explorar cien caminos en lo que antes llevaba uno, para probar, para medir. Lo que no delegamos es el criterio: cuál de esos caminos es tuyo y cuál es de cualquiera.

Después, lo terminamos a mano. Tipografía, luz, sonido. Esta pieza, por ejemplo: ningún cuadro salió de una plantilla.

Es la primera de diez. Seguí la serie.

#focuscreatives #direcciondearte #identidaddemarca #inteligenciaartificial #buenosaires
```

### Criterio de éxito

Retención a 3 s por encima del promedio de la cuenta y ThruPlay (15 s) mayor al 25 % de las reproducciones; seguidores nuevos por cada 1.000 alcanzados.

### Hipótesis para la prueba A/B

Gancho: "Todo empieza a parecerse." (grilla de iguales) contra "Usamos IA. No usamos plantillas." en el cuadro 0. Hipótesis: la grilla genérica retiene más a 3 s porque el público se reconoce en el problema antes de escuchar la postura.

---

## A02 · Fuera de foco

`entregables/anuncios/focus_ad02_fuera-de-foco.mp4` · portada `focus_ad02_fuera-de-foco.jpg` (cuadro 13.6 s) · caption `focus_ad02_fuera-de-foco.txt`

| | |
|---|---|
| **Etapa** | TOFU |
| **Fenómeno del atlas** | Profundidad de campo (ventana de foco) |
| **Audiencia** | P1 fundadoras y dueños de marcas que ya facturan (gastronomía, vinos, estética, moda, arquitectura, servicios) |
| **Objetivo** | Alcance calificado: que la fundadora nombre su problema (la marca se ve más chica de lo que es) y asocie a FOCUS con la solución. |
| **Necesidad u objeción** | Dolor: "vendemos más de lo que mostramos". Objeción: "me da miedo perder lo que ya funciona". |
| **Promesa verificable** | FOCUS no reemplaza la marca: la enfoca, trabajando tres decisiones (qué decís, cómo te ven, cómo sonás). Verificable: el propio sistema de FOCUS se muestra como ejemplo. |
| **Acción buscada** | Guardar el anuncio (señal de intención) y visitar el sitio. |
| **Servicio destacado** | Identidad de marca · estrategia |
| **Referencia estratégica** | P4 Pentagram · Itaú: el caption y la pieza explican el porqué de cada decisión y eso convierte "rediseñaron el logo" en "hay un razonamiento detrás". |
| **CTA** | Guardalo para cuando revises tu marca. |
| **Destino del tráfico** | Guardado en Instagram · secundario: focuscreatives.net |
| **Banda sonora** | Tonalidad Mi, 84 BPM. Acordes: 0 s sus2 → 3.4 s min9 → 8.6 s min9 → 12.3 s maj9 → 17 s maj9 → 21.9 s min9 → 26.1 s sus4 → 29.6 s maj9 → 37.2 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,4 | Dos planos de texto: adelante, nítido; atrás, grande y desenfocado | Vendés como una marca grande. → ¿Te ves como *una?* | Rack focus a los 1,5 s: el primer plano se va, el fondo entra | Corte en frío | Pad suspendido en Mi | Tick de lente en el cambio de plano | Gancho en segunda persona: la pregunta que la fundadora ya se hizo |
| 3,4-8,6 | Tinta con una línea fina de umbral; texto en dos tiempos | Entre lo que vendés y lo que mostrás / hay una distancia. | Palabra por palabra; la línea se dibuja | Desenfoque cruzado | Mi menor 9 | Aire | Problema nombrado |
| 8,6-17,0 | Key visual propio (manos), desaturado y desenfocado; una ventana de foco circular lo recorre y fija en el gesto de las manos | No te vamos a inventar una marca. / Vamos a enfocar la que ya tenés. | La lente busca, frena, fija; blur y cromática en el borde | Entrada desde desenfoque | Entra el pulso suave a 84 BPM | Tick al fijar | Promesa: continuidad, no reemplazo |
| 17,0-29,6 | Sobre el póster de marca, la ventana salta a tres zonas; en cada una, un glifo óptico y una decisión | 01 · Qué decís: un posicionamiento en una frase. / 02 · Cómo te ven: un sistema, no un logo. / 03 · Cómo sonás: una voz que tu equipo puede escribir. | Saltos de lente al beat; glifos que entran en foco | Corte al beat | Do mayor 9 → La menor 9; arpegio | Clic por decisión | Criterio: el porqué, explicado (referencia Pentagram) |
| 29,6-37,2 | El sistema propio de FOCUS: tres pósters y el sitio en el teléfono, enmarcados | La nuestra, por ejemplo. | Push-in lento; entradas escalonadas | Barrido de umbral | Campanas | Vidrio al revés antes de la imagen | Prueba: la marca del estudio como caso verificable |
| 37,2-41,0 | Tinta; frase del sitio | Una marca no se inventa. / Se *enfoca.* | Rack focus de 16 a 0 px | Desenfoque cruzado | Mi lidio | Impacto suave | Giro: el credo del estudio |
| 41,0-45,0 | Placa de cierre común | ¿Tu marca se ve / del tamaño que *tiene?* · Guardalo para cuando revises tu marca. · focuscreatives.net · Sin plantilla · 02/10 | Entrada desde desenfoque | Veladura | Resolución en Mi mayor 9 | Firma sonora de vidrio | Cierre TOFU: guardado |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Key visual "Mirar no alcanza" | public/assets/img-01.jpg (propio), recortado sin su texto | — |
| Póster de marca (trama) | public/assets/img-06.jpg (propio, mostrado como obra dentro de la ventana) | — |
| Tratamiento de ventana de foco | CSS del design system: grayscale + sepia + hue-rotate frío + blur, y círculo nítido | — |
| Planos de texto con rack focus | Tipografía Rotis en dos profundidades | — |
| Sistema propio (logo, pósters, sitio) | public/assets/img-01..03.jpg, focus-logo-light.png, capturas/hero | — |
| Glifos estrategia, identidad, voz | design-system/assets/glyphs/ | — |
| Variante fotográfica del fondo | A producir | "black and white high contrast photograph, hand touching a glass surface, shallow depth of field, cool tone, heavy film grain, museum interior out of focus, 35mm, no text" |

### Caption

```text
Hay marcas que facturan como grandes y se ven como chicas. No por falta de talento: porque crecieron a parches. Un logo de un lado, el sitio de otro, las redes de un tercero.

No hace falta empezar de cero. Hace falta enfocar tres decisiones:
· Qué decís: un posicionamiento que entra en una frase.
· Cómo te ven: un sistema, no un logo suelto.
· Cómo sonás: una voz que cualquiera de tu equipo puede escribir.

Una marca no se inventa. Se enfoca.

Guardalo para cuando revises la tuya.

#identidaddemarca #branding #estrategiademarca #focuscreatives #buenosaires
```

### Criterio de éxito

Tasa de guardados por cada 1.000 reproducciones por encima del promedio de la cuenta; retención al 50 % (22 s).

### Hipótesis para la prueba A/B

Gancho: "Vendés como una marca grande. ¿Te ves como una?" contra "Tu marca vende más de lo que muestra." Hipótesis: la pregunta en segunda persona retiene más porque obliga a responder mentalmente en el primer segundo.

---

## A03 · Lo que queda

`entregables/anuncios/focus_ad03_lo-que-queda.mp4` · portada `focus_ad03_lo-que-queda.jpg` (cuadro 15.5 s) · caption `focus_ad03_lo-que-queda.txt`

| | |
|---|---|
| **Etapa** | TOFU |
| **Fenómeno del atlas** | Reflexión |
| **Audiencia** | P2 creadores e influencers medianos y grandes que ya monetizan y quieren construir una marca, un producto o una comunidad |
| **Objetivo** | Alcance y envíos: instalar la idea de que una marca propia es la forma de no depender de aparecer en cámara, y que FOCUS la construye. |
| **Necesidad u objeción** | Dolor: el negocio depende de su presencia y del algoritmo. Objeción: "mi marca soy yo" y "no quiero sonar a empresa". |
| **Promesa verificable** | FOCUS construye lo que queda cuando el creador no está: nombre y sistema visual, un tono que otros pueden escribir y productos propios. Verificable: FOCUS edita reels y videos de YouTube y gestiona las redes de @santatuca (caso publicado en el sitio). |
| **Acción buscada** | Enviar el anuncio a otro creador (envíos) y visitar el perfil. |
| **Servicio destacado** | Identidad para creadores · social media management · producto (software) |
| **Referencia estratégica** | P2 Wolff Olins · LG: la marca tratada como un personaje que se mueve y tiene comportamiento propio; aquí, la marca como el reflejo que sigue existiendo. |
| **CTA** | Mandáselo a quien ya es más que su cara. |
| **Destino del tráfico** | Envío por DM · secundario: perfil y focuscreatives.net |
| **Banda sonora** | Tonalidad Re, 80 BPM. Acordes: 0 s sus2 → 3.5 s min9 → 9 s maj9 → 13 s lyd → 17 s min9 → 21 s maj9 → 25 s sus4 → 29 s maj9 → 35 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,5 | Columna de vidrio con un hilo de luz, sobre espejo negro; su reflejo abajo | Tenés una audiencia. / ¿Tenés una *marca?* | Cámara que se acerca lento; la columna gira | Entrada desde negro | Vidrio y aire, sin pulso (Re suspendido) | Vidrio al entrar; tick en la pregunta | Gancho: la pregunta que separa audiencia de marca |
| 3,5-9,0 | La columna ocupa el centro; el reflejo se estira | Hoy tu negocio depende / de que aparezcas en *cámara.* | Rack focus del texto | Desenfoque cruzado | Re menor 9 | Respiración | Dolor: la dependencia |
| 9,0-17,0 | La columna sube y sale del cuadro; en el espejo aparece un anillo de vidrio con filo magenta | Una marca es lo que queda / cuando no estás en el *cuadro.* | Subida de 3 s; el anillo crece desde 0,6 | Continuo | Si bemol mayor 9 | Grave cuando la columna sale; vidrio cuando nace el anillo | Idea central |
| 17,0-29,0 | El anillo gira sobre el espejo; tres capas, cada una con su glifo | Un nombre y un sistema visual propios. / Un tono que otro puede escribir sin sonar a otro. / Productos: un drop, una comunidad, una app. | Glifos que entran en foco; cortes al beat | Corte al beat | Entra un pulso suave a 80 BPM | Clic por capa | Qué construye FOCUS |
| 29,0-35,0 | Tarjeta real del sitio: @santatuca, enmarcada | Editamos sus reels, / su YouTube y sus *redes.* (junto a la tarjeta de @santatuca) | Push-in lento | Barrido de umbral | Campanas | Obturador | Prueba verificable (confirmar permiso) |
| 35,0-41,0 | Vuelve el espejo; el anillo se ilumina entero | Para que tu negocio / no dependa de tu próximo *video.* | El anillo pasa de magenta a blanco | Desenfoque cruzado | Re lidio | Impacto suave | Beneficio |
| 41,0-45,0 | Placa de cierre común | Sos más que / tu *cara.* · Mandáselo a quien ya es más que su cara. · focuscreatives.net · Sin plantilla · 03/10 | Entrada desde desenfoque | Veladura | Re mayor 9 | Firma sonora de vidrio | Cierre TOFU: envío |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Columna de vidrio y espejo negro | Escena 3D engine/scenes/mirror.js (vidrio físico con dispersión, Reflector, bloom) | "single glass cylinder with a thin vertical line of white light inside, standing on a black mirror floor, perfect reflection, pure black studio, rim light, magenta and green refractions at the edges, 3d render, octane, no text" |
| Anillo de marca en el reflejo | Misma escena (toroide de vidrio con filo magenta) | — |
| Glifos identidad, voz, software | design-system/assets/glyphs/ | — |
| Caso real @santatuca | public/assets/clients/santa-tuca-card.jpg (del sitio). Confirmar permiso para pauta. | — |

### Caption

```text
Una audiencia se construye apareciendo. Una marca se construye para cuando no aparecés.

Si tu negocio depende de tu próximo video, depende de vos, de tu energía y de un algoritmo que no controlás. Una marca propia cambia eso: un nombre y un sistema visual que se reconocen sin tu cara, un tono que tu equipo puede escribir sin sonar a otro y productos que venden aunque no estés online.

Con @santatuca ya hacemos la edición de reels y videos de YouTube y la gestión de redes. Lo que sigue es construir lo que queda.

Mandáselo a quien ya es más que su cara.

#creadoresdecontenido #marcapersonal #identidaddemarca #focuscreatives #buenosaires
```

### Criterio de éxito

Envíos por cada 1.000 reproducciones por encima del promedio de la cuenta; retención al 75 % (34 s).

### Hipótesis para la prueba A/B

Gancho: "Tenés una audiencia. ¿Tenés una marca?" contra "¿Qué queda de tu marca cuando no estás en cámara?". Hipótesis: el contraste audiencia/marca en dos tiempos retiene más que una pregunta larga en una sola placa.

---

## A04 · A medida

`entregables/anuncios/focus_ad04_a-medida.mp4` · portada `focus_ad04_a-medida.jpg` (cuadro 20.5 s) · caption `focus_ad04_a-medida.txt`

| | |
|---|---|
| **Etapa** | TOFU |
| **Fenómeno del atlas** | Difracción |
| **Audiencia** | P3 responsables de operaciones, negocio, producto o marketing en empresas medianas; P1 fundadoras con operación propia |
| **Objetivo** | Presentar la nueva línea de software a medida y generar tráfico calificado al sitio o conversaciones por DM. |
| **Necesidad u objeción** | Dolor: procesos que viven en planillas, mails y apps que no se hablan. Objeción: "el software a medida es caro, lento y feo". |
| **Promesa verificable** | FOCUS diseña y desarrolla herramientas a medida, con el mismo criterio de diseño que una identidad, y suma flujos con IA para el trabajo repetido. Verificable: el código que se ve es real (del sitio de FOCUS); la interfaz está rotulada "Concepto". |
| **Acción buscada** | Mandar un DM contando qué proceso los frena. |
| **Servicio destacado** | Software a medida · flujos con IA y agentes |
| **Referencia estratégica** | P8 Metalab: en producto digital se vende con el producto funcionando (recorrido de pantalla de 20 a 40 s), no con estética. |
| **CTA** | Contanos por DM qué proceso te frena. |
| **Destino del tráfico** | DM de Instagram · secundario: focuscreatives.net |
| **Banda sonora** | Tonalidad Mi, 90 BPM. Acordes: 0 s min7 → 3.2 s min9 → 9.4 s sus2 → 12.8 s maj9 → 16 s min9 → 25 s maj9 → 31 s min9 → 37 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Ondas de interferencia caóticas; ventanas genéricas (planilla, mail, chat) que tiemblan | Tu operación corre en planillas, / mails y apps que no se *hablan.* | Fragmentos que entran escalonados y vibran | Corte en frío | Pad tenso en Mi | Teclas y clics sueltos | Gancho de dolor reconocible |
| 3,2-9,4 | El caos sigue; los fragmentos se superponen | Cada proceso que no entra / en un software genérico / se paga en *horas.* | Rack focus por frase | Desenfoque de salida | Mi menor 9 | Aire | Costo del problema |
| 9,4-16,0 | Las ondas se alinean en una rejilla: la difracción ordena la luz | Hay otra forma: / software diseñado / para cómo trabaja tu *equipo.* | uOrder 0 → 1 en 3 s | La interferencia se vuelve grilla | Entra el pulso cuantizado a 90 BPM | Subida hacia la grilla; tick al quedar ordenada | Solución |
| 16,0-25,0 | Sobre la grilla se construye el panel (concepto): los pedidos pasan de "En espera" a "Conciliado" | Diseñamos la herramienta / que tu operación ya está pidiendo. | Filas que cambian de estado en secuencia | Entrada desde desenfoque | Arpegio ascendente | Blip por fila conciliada | Demo: el producto funcionando |
| 25,0-31,0 | Código real del sitio que se escribe | La desarrollamos. / *Código real:* el de nuestro sitio. | Tipeo a 40 caracteres por segundo | Barrido de umbral | Bajo y hats | Teclas | Capacidad técnica verificable |
| 31,0-37,0 | Ventana "Flujo con IA": cuatro pasos que se tildan | Y le sumamos agentes / para el trabajo *repetido.* | Líneas que se escriben y se tildan | Corte al beat | Campanas | Blips | IA aplicada, con persona que decide |
| 37,0-41,0 | La grilla se ilumina; lockup de la nueva línea con glifo de difracción | NUEVA LÍNEA / *SOFTWARE A MEDIDA* | Refracción que converge | Separación RGB → recomposición | Mi lidio | Impacto | Anuncio de la línea |
| 41,0-45,0 | Placa de cierre común | ¿Qué proceso / te está *frenando?* · Contanos por DM. · focuscreatives.net · Sin plantilla · 04/10 | Entrada desde desenfoque | Veladura | Mi mayor 9 | Firma sonora de vidrio | Cierre TOFU: conversación |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Interferencia que se ordena en grilla | Shader glsl.interference (uOrder 0 → 1) | "diffraction grating light pattern, interference fringes resolving into a precise grid, black background, thin white lines, magenta blue green spectral fringes, macro, no text" |
| Fragmentos de herramientas genéricas | DOM en gris (planilla, mail, chat), sin marcas reales | — |
| Panel de operaciones (concepto) | DOM con reglas de interfaz de la marca (03, B8) | Variante con IA para moodboard: "minimal dark operations dashboard UI, black background, thin 1px gray borders, no rounded corners, single green status dots, Rotis-like sans serif, editorial layout, no logos" |
| Código real | src/lib/locale.ts (detectLang) del sitio de FOCUS | — |
| Glifo software | design-system/assets/glyphs/software.svg | — |

### Caption

```text
Hay procesos que no entran en ningún software genérico. Entonces viven en planillas, mails y tres apps que no se hablan, y se pagan en horas del equipo.

Sumamos una línea nueva: software a medida. Diseñamos y desarrollamos la herramienta que tu operación ya está pidiendo, con el mismo criterio con el que diseñamos una marca: que se entienda sola y que nadie tenga que adaptarse a ella.

Y donde hay trabajo repetido, le sumamos flujos con IA que lo hacen, con una persona que decide lo que importa.

(La interfaz del video es un concepto. El código es real: es parte de nuestro sitio.)

¿Qué proceso te está frenando? Contanos por DM.

#softwareamedida #transformaciondigital #inteligenciaartificial #focuscreatives #buenosaires
```

### Criterio de éxito

Conversaciones iniciadas por DM y clics al sitio por cada 1.000 impresiones en el segmento P3.

### Hipótesis para la prueba A/B

Gancho de dolor ("Tu operación corre en planillas...") contra gancho de producto (el panel funcionando desde el cuadro 0). Hipótesis: en TOFU el dolor retiene más a 3 s; en retargeting, el producto convierte más.

---

## A05 · Una decisión

`entregables/anuncios/focus_ad05_una-decision.mp4` · portada `focus_ad05_una-decision.jpg` (cuadro 7 s) · caption `focus_ad05_una-decision.txt`

| | |
|---|---|
| **Etapa** | MOFU |
| **Fenómeno del atlas** | Densidad |
| **Audiencia** | P1 fundadoras evaluando un rebrand; P3 responsables de marca que comparan estudios |
| **Objetivo** | Consideración: mostrar qué significa "sistema" con un caso verificable (la identidad de FOCUS) y llevar tráfico al sitio. |
| **Necesidad u objeción** | Objeción: "¿por qué pagar un sistema si solo necesito un logo?" y "¿cómo sé que lo que diseñan se sostiene en todas las piezas?" |
| **Promesa verificable** | Una decisión de identidad bien tomada se replica en todas las piezas. Verificable: todas las aplicaciones que se ven son de FOCUS (sitio, pósters, deck y perfil del design system). |
| **Acción buscada** | Visitar focuscreatives.net para ver el sistema aplicado. |
| **Servicio destacado** | Sistema de identidad · editorial · web · dirección de arte |
| **Referencia estratégica** | P2 Studio Dumbar/OpenAI: la identidad presentada por partes, en secuencia, con sonido sincronizado a cada elemento. P3 Koto OFF Brand: darle vocabulario al comprador ("sistema", "densidad"). |
| **CTA** | Mirá el sistema completo en focuscreatives.net |
| **Destino del tráfico** | focuscreatives.net (sección Servicios y Trabajo) |
| **Banda sonora** | Tonalidad La, 92 BPM. Acordes: 0 s maj9 → 2.6 s add9 → 9.6 s maj9 → 13.1 s min9 → 16.4 s lyd → 19.7 s maj9 → 23 s min9 → 26.3 s sus4 → 29.6 s lyd → 37 s maj9 → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-2,6 | Macro de la C abierta del wordmark, desenfocada; entra en foco | Esto es una *decisión.* | Rack focus de 26 px a 0 | Entrada desde desenfoque | La mayor 9, pad solo | Tick de lente | Gancho abstracto: ¿qué es esto? |
| 2,6-9,6 | El plano se abre (zoom exponencial) y aparece la palabra FOCUS entera; nacen anillos desde la C | Un anillo abierto / en lugar de una C. | Zoom de 2,2x a 0,25x en 4,6 s | Continuo | Arpegio que suma una voz | Aire hacia el corte | Revelación del detalle |
| 9,6-29,6 | Zoom infinito en anillos; cada 3,3 s una aplicación real entra en foco al centro, enmarcada: logo, póster, sitio, presentación, perfil, campaña | El logo. / El póster. / El sitio. / La presentación. / El perfil profesional. / La campaña. | Anillos que avanzan una octava por aplicación | Desenfoque de salida y entrada al beat | Pulso a 92 BPM, bajo, hats | Clic por aplicación; un anillo se ilumina en azul | Prueba: el sistema aplicado, verificable |
| 29,6-37,0 | Los anillos se detienen; en el centro, la C pequeña y nítida | Eso es un sistema: / cuanto más te acercás, / más *hay.* | Desaceleración del zoom a 0 | Rack focus | Do lidio | Vidrio | Vocabulario de criterio (densidad, del manual) |
| 37,0-41,0 | Tinta; frase de cierre | Una decisión bien tomada / aparece en todos *lados.* | Palabra por palabra | Desenfoque cruzado | La mayor 9 | Impacto suave | Idea para recordar |
| 41,0-45,0 | Placa de cierre común | Una decisión. / Todos los *lugares.* · Mirá el sistema completo en focuscreatives.net · Sin plantilla · 05/10 | Entrada desde desenfoque | Veladura | Resolución | Firma sonora de vidrio | Cierre MOFU: tráfico |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Wordmark en alta | assets/focus-logo-light@8x.png: derivado del archivo oficial (reescalado del alfa con umbral suave, sin redibujar) | — |
| Anillos en zoom infinito | Shader glsl.density centrado en la C | "infinite zoom into concentric thin white rings, black background, dotted rings, one ring glowing blue, macro lens, fine grain, no text" |
| Aplicaciones reales | img-02, img-03 (key visuals), capturas/prisma (sitio), assets/ds-deck-portada.jpg y ds-linkedin-freelance-es-full.png (design system) | — |

### Caption

```text
Una identidad no es un logo. Es una decisión que se repite con criterio en todas partes.

La nuestra empieza en un detalle: una C abierta, como un anillo de lente que deja pasar la luz. Esa sola decisión se vuelve el logo, la retícula y los anillos de todas nuestras piezas, los pósters de campaña, el prisma del sitio, la presentación y el perfil profesional.

Cuando un sistema está bien hecho, cuanto más te acercás, más hay. Y cualquiera de tu equipo puede aplicarlo sin romperlo.

Mirá el sistema completo en focuscreatives.net

#identidadvisual #sistemadeidentidad #branding #focuscreatives #diseñoargentino
```

### Criterio de éxito

Clics al enlace por cada 1.000 impresiones y tiempo en el sitio de quienes llegan desde el anuncio; retención al 75 %.

### Hipótesis para la prueba A/B

Apertura en macro de la C (abstracta) contra apertura con el logo completo y la pregunta "¿Qué es un sistema de identidad?". Hipótesis: el macro abstracto sostiene más la curiosidad en MOFU porque el público ya conoce la marca por TOFU.

---

## A06 · El flujo

`entregables/anuncios/focus_ad06_el-flujo.mp4` · portada `focus_ad06_el-flujo.jpg` (cuadro 34.6 s) · caption `focus_ad06_el-flujo.txt`

| | |
|---|---|
| **Etapa** | MOFU |
| **Fenómeno del atlas** | Exposición larga |
| **Audiencia** | P3 responsables de marketing, marca y negocio que evalúan cómo incorporar IA sin perder calidad ni control |
| **Objetivo** | Consideración y demanda: mostrar el flujo de trabajo con agentes y control humano, y convertir en reuniones de demostración. |
| **Necesidad u objeción** | Objeciones: "la IA hace todo igual", "¿quién controla la calidad?", "¿es seguro?". |
| **Promesa verificable** | FOCUS combina agentes (investigar, auditar, producir, componer) con decisiones humanas en cada etapa. Verificable: esta campaña se produjo así; todo el proceso, los datos y el código están documentados (instagram/campana-ads-01/). |
| **Acción buscada** | Agendar una demo de 30 minutos del flujo aplicado a su marca. |
| **Servicio destacado** | Flujos con IA y agentes · contenido audiovisual |
| **Referencia estratégica** | P9 DixonBaxi: hacer visible el proceso (tests, exploraciones) justifica el honorario. P3 Koto: contenido que educa al comprador y le da vocabulario. |
| **CTA** | Agendá una demo de 30 minutos. |
| **Destino del tráfico** | calendly.com/focus-creatives-info/30min |
| **Banda sonora** | Tonalidad Do, 86 BPM. Acordes: 0 s min7 → 3.2 s maj9 → 9.4 s maj9 → 13.4 s min9 → 17.4 s lyd → 21.4 s maj9 → 25.4 s sus4 → 29.4 s min9 → 33 s lyd → 37 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Terminal: se escribe el comando real de render y corre el contador de cuadros | Este anuncio no se editó / en una app. → Se *escribió.* | Tipeo; contador 0001 → 1350 | Corte en frío | Pulso de teclas sobre pad en Do | Teclas; tick | Gancho meta: ver cómo se hizo lo que estás viendo |
| 3,2-9,4 | El código real de este anuncio se escribe en una ventana | Cada cuadro es una función del tiempo. / Cada sonido, *también.* | Tipeo a 60 caracteres por segundo | Barrido de umbral | Do mayor 9 | Teclas | Prueba técnica |
| 9,4-29,4 | Cinco trazos de luz se exponen en el tiempo; cada 4 s se ilumina una etapa y su rótulo | 01 Investigación · 02 Auditoría · 03 Guion y diseño · 04 Render · 05 Sonido (con una línea verificable cada una) | Exposición progresiva; resaltado por etapa | Continuo; clic por etapa | Pulso a 86 BPM, arpegio en loop | Clic y blip por etapa | El flujo, etapa por etapa |
| 29,4-37,0 | Los cinco trazos convergen en un punto blanco: la decisión | Agentes para investigar, comparar y producir. / Personas para decidir qué sale / y qué *no.* | Convergencia en 2,5 s; destello | Continuo | La menor 9 → Fa lidio | Grave en la convergencia | Diferencial: control humano |
| 37,0-41,0 | Punto blanco que respira | Más velocidad. / El mismo *criterio.* | Rack focus | Desenfoque cruzado | Do lidio | Impacto suave | Beneficio |
| 41,0-45,0 | Placa de cierre común | Tu marca, / con este *flujo.* · Agendá una demo de 30 minutos. · calendly.com/focus-creatives-info/30min · Sin plantilla · 06/10 | Entrada desde desenfoque | Veladura | Do mayor 9 | Firma sonora de vidrio | Cierre MOFU: reunión |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Terminal de render | DOM con la interfaz de la marca; el comando es el real (node render.mjs a06) | — |
| Código del propio anuncio | Serialización del objeto real del gancho de este archivo | — |
| Trayectorias de luz | Shader glsl.trails con cinco recorridos y resaltado por etapa | "long exposure photograph of five light trails converging into a single bright point, magenta to green spectrum, pure black background, fine film grain, no text" |
| Datos de las etapas | 01-investigacion-competitiva.md, 02-auditoria-skills-y-herramientas.md, produccion/ | — |

### Caption

```text
Esta campaña la hicimos con un flujo de agentes y personas. Así funciona:

· Investigación: agentes relevaron 12 estudios premium y sus videos, con métricas públicas y fecha de consulta.
· Auditoría: antes de usar cualquier herramienta o skill de IA, otro agente revisó su código buscando riesgos.
· Guion y diseño: una idea y un fenómeno óptico por pieza, decididos con criterio.
· Render: cada cuadro se escribe en código (1.350 por anuncio). Nada de plantillas.
· Sonido: una banda original para cada pieza.

En cada etapa, una persona decide qué sigue y qué no. La IA nos da velocidad; el criterio sigue siendo nuestro.

¿Querés ver el flujo aplicado a tu marca? Agendá una demo de 30 minutos.

#inteligenciaartificial #agentesdeia #marketingdigital #focuscreatives #buenosaires
```

### Criterio de éxito

Reuniones agendadas en Calendly atribuidas al anuncio (UTM) y clics al enlace; retención al 50 %.

### Hipótesis para la prueba A/B

Gancho meta ("Este anuncio no se editó en una app.") contra gancho de beneficio ("Más velocidad. El mismo criterio."). Hipótesis: el gancho meta retiene más en P3 porque promete ver algo que no ve en otras agencias: el detrás de escena real.

---

## A07 · La primera reunión

`entregables/anuncios/focus_ad07_primera-reunion.mp4` · portada `focus_ad07_primera-reunion.jpg` (cuadro 11.5 s) · caption `focus_ad07_primera-reunion.txt`

| | |
|---|---|
| **Etapa** | MOFU |
| **Fenómeno del atlas** | Cáustica |
| **Audiencia** | P1 fundadoras cuya web no está a la altura; P3 responsables de marketing que renuevan el sitio |
| **Objetivo** | Consideración: demostrar el nivel de diseño y desarrollo web con un producto real, y llevar a que lo prueben en su teléfono. |
| **Necesidad u objeción** | Objeción: "un sitio lindo es una plantilla cara" y "las agencias de diseño no saben desarrollar". |
| **Promesa verificable** | FOCUS diseña y desarrolla sitios que se comportan como producto: interacción, rendimiento, idioma y SEO. Verificable: todo lo que se ve es focuscreatives.net grabado en un teléfono. |
| **Acción buscada** | Abrir focuscreatives.net en el teléfono. |
| **Servicio destacado** | Páginas web: diseño, desarrollo, SEO y mantenimiento |
| **Referencia estratégica** | P8 Metalab: mostrar el producto funcionando en un recorrido de pantalla real de 20 a 40 s. |
| **CTA** | Abrí focuscreatives.net en tu teléfono. |
| **Destino del tráfico** | focuscreatives.net |
| **Banda sonora** | Tonalidad La, 90 BPM. Acordes: 0 s add9 → 3.4 s maj9 → 8.6 s maj9 → 13.8 s min9 → 19 s lyd → 24.2 s maj9 → 29.4 s lyd → 34.6 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,4 | El hero del sitio en un teléfono (marco de 1 px) sobre una red de luz cáustica | Tu sitio es la primera reunión / con tu *cliente.* | La captura corre; la cáustica deriva | Entrada desde desenfoque | Pad acuoso en La | Vidrio; clic de interfaz | Gancho de negocio |
| 3,4-8,6 | La cáustica se intensifica; el teléfono se desenfoca | Ahí decide si sos / del tamaño que *decís.* | Rack focus | Desenfoque cruzado | La mayor 9 | Aire | Por qué importa |
| 8,6-24,2 | Tres detalles reales, 5,2 s cada uno: el prisma con scroll, la refracción siguiendo el dedo, la galería de casos en foco | El prisma responde al *scroll.* / La luz sigue tu *dedo.* / Los casos entran en *foco.* | Capturas a velocidad real o acelerada; rótulo técnico por detalle | Desenfoque de salida y entrada al beat | Pulso a 90 BPM, arpegio | Clic por detalle; teclas suaves | Prueba: producto funcionando |
| 24,2-29,4 | Dos teléfonos: el mismo hero en español y en inglés | Te habla en tu *idioma.* | Entradas escalonadas | Barrido de umbral | Campanas | Blip | Oficio invisible: idioma según el navegador |
| 29,4-34,6 | La sección Foco con la lente táctil | Lo que importa, / bajo tu *lente.* | Captura con toque simulado | Desenfoque cruzado | Fa lidio | Tick | Cierre del recorrido |
| 34,6-41,0 | La cáustica ocupa todo; texto grande | Diseño, desarrollo y SEO. / Una sola *mano.* | Refracción que converge | Separación RGB → recomposición | La lidio | Impacto | Promesa |
| 41,0-45,0 | Placa de cierre común | Tu sitio, / a la altura de tu *marca.* · Abrí focuscreatives.net en tu teléfono. · focuscreatives.net · Sin plantilla · 07/10 | Entrada desde desenfoque | Veladura | La mayor 9 | Firma sonora de vidrio | Cierre MOFU: probar el sitio |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Capturas reales del sitio en teléfono | produccion/capture.mjs (Playwright, 432×768 a 2,5x, reloj virtual, toques simulados): hero, hero_en, prisma, refraccion, casos, foco | — |
| Cáustica | Shader glsl.caustic | "caustic light pattern from sunlight through rippling water on a dark surface, iridescent magenta and green fringes, macro, black background, no text" |
| Marco de teléfono | Marco de 1 px gris (regla de la marca: sin mockups de dispositivo) | — |

### Caption

```text
Antes de la primera llamada, tu cliente ya estuvo en tu sitio. Ahí decidió si sos del tamaño que decís.

Nuestro sitio es nuestra primera prueba. Lo que ves en el video pasa de verdad, en un teléfono:
· el prisma de servicios responde al scroll;
· la refracción sigue tu dedo;
· los casos entran en foco a medida que pasan;
· y te habla en tu idioma según tu navegador.

Diseño, desarrollo y SEO con una sola mano. Abrilo en tu teléfono y probalo.

#diseñoweb #desarrolloweb #experienciadeusuario #focuscreatives #buenosaires
```

### Criterio de éxito

Clics al enlace por cada 1.000 impresiones y porcentaje de sesiones móviles con scroll hasta "Trabajo".

### Hipótesis para la prueba A/B

Apertura con la frase de negocio ("Tu sitio es la primera reunión...") contra apertura con la interacción más vistosa (el prisma) sin texto los primeros 1,5 s. Hipótesis: la frase retiene más a P3; el prisma, a P1.

---

## A08 · El proceso

`entregables/anuncios/focus_ad08_el-proceso.mp4` · portada `focus_ad08_el-proceso.jpg` (cuadro 11.2 s) · caption `focus_ad08_el-proceso.txt`

| | |
|---|---|
| **Etapa** | BOFU |
| **Fenómeno del atlas** | Umbral |
| **Audiencia** | P3 responsables de marketing y negocio listos para contratar; P1 fundadoras que comparan estudios |
| **Objetivo** | Conversión: bajar la incertidumbre sobre cómo se trabaja y llevar a agendar una primera reunión de 30 minutos. |
| **Necesidad u objeción** | Objeciones de cierre: "¿cómo es el proceso?", "¿me van a hacer elegir entre mil opciones?", "¿quién responde?", "¿qué pasa después de la entrega?". |
| **Promesa verificable** | Cuatro etapas claras (Diagnóstico, Dirección, Sistema, Acompañamiento), un equipo y un interlocutor. A confirmar por el estudio antes de pautar (ver 03, C1). |
| **Acción buscada** | Agendar 30 minutos en Calendly. |
| **Servicio destacado** | Método de trabajo (todos los frentes) |
| **Referencia estratégica** | P5 JKR: el contenido que muestra la visión de negocio le habla al CMO y rindió ~4 veces más que los anuncios de premios. P4: explicar el porqué de cada decisión. |
| **CTA** | Agendá 30 minutos. |
| **Destino del tráfico** | calendly.com/focus-creatives-info/30min |
| **Banda sonora** | Tonalidad Re, 84 BPM. Acordes: 0 s sus2 → 3.4 s min9 → 8.2 s min9 → 14.2 s maj9 → 20.2 s lyd → 26.2 s sus4 → 32.2 s maj9 → 37.2 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,4 | Negro total; una línea vertical de luz de 1 px | Qué pasa / después de *escribirnos.* | La línea respira | Entrada desde negro | Re suspendido, sin pulso | Aire; tick | Gancho de BOFU: la pregunta del que ya casi decide |
| 3,4-8,2 | La rendija empieza a abrirse; polvo en suspensión | Cuatro etapas. / Sin *sorpresas.* | Apertura lenta | Continuo | Re menor 9 | Swell de aire | Promesa: claridad |
| 8,2-32,2 | Cuatro umbrales, 6 s cada uno: la rendija se abre en un tercio distinto, el numeral enorme y la etapa con su glifo; al final de cada una, un barrido cruza al siguiente | 01 Diagnóstico · 02 Dirección · 03 Sistema · 04 Acompañamiento (con dos líneas cada una) | Apertura, sostén, barrido | Barrido de umbral en cada cambio | Pulso a 84 BPM; cambia el acorde en cada etapa | Impacto grave en cada cruce; clic en el numeral | El método, etapa por etapa |
| 32,2-37,2 | Las cuatro rendijas abiertas a la vez, luz blanca | Un equipo. / Un criterio. / Un *interlocutor.* | Frases al beat | Corte al beat | Re mayor 9 | Clic por frase | Diferencial: un solo responsable |
| 37,2-41,0 | La luz se cierra en un punto | Enfoquemos lo que / ya es *tuyo.* | Iris de luz a punto | Iris | Re lidio | Vidrio | Frase del sitio |
| 41,0-45,0 | Placa de cierre común | Agendá / 30 *minutos.* · La primera conversación es para entender tu marca. · calendly.com/focus-creatives-info/30min · Sin plantilla · 08/10 | Entrada desde desenfoque | Veladura | Re mayor 9 | Firma sonora de vidrio | Cierre BOFU: reunión |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Rendija de luz volumétrica | Shader glsl.slit (apertura, polvo en suspensión, filo espectral) | "a thin vertical slit of white light opening in a pitch black wall, volumetric light rays and dust particles, subtle magenta and green chromatic edges, cinematic, 35mm, no text" |
| Numerales de etapa | Rotis Semi Sans Light a 520 px, tinta sobre luz | — |
| Glifos por etapa | estrategia, identidad, editorial-packaging, social-media (design-system/assets/glyphs/) | — |

### Caption

```text
Qué pasa después de escribirnos:

01 · Diagnóstico. Una reunión y muchas preguntas: qué ya es tuyo, qué sobra, qué falta.
02 · Dirección. Un solo camino, argumentado. No te damos diez opciones para que elijas vos: te damos la que defendemos.
03 · Sistema. Marca, contenido, web o software, todo sale del mismo criterio.
04 · Acompañamiento. Lo sostenemos en el tiempo.

Un equipo, un criterio, un interlocutor. Sin coordinar proveedores.

Agendá 30 minutos: la primera conversación es para entender tu marca.

#branding #estrategiademarca #marketing #focuscreatives #buenosaires
```

### Criterio de éxito

Reuniones agendadas por cada 1.000 impresiones en audiencias de retargeting; tasa de asistencia a la reunión.

### Hipótesis para la prueba A/B

Cierre con "Agendá 30 minutos" contra cierre con "Escribinos por WhatsApp". Hipótesis: P3 prefiere agendar (formal, con calendario); P1 prefiere WhatsApp (inmediato). Segmentar la prueba por audiencia.

---

## A09 · Todos los meses

`entregables/anuncios/focus_ad09_todos-los-meses.mp4` · portada `focus_ad09_todos-los-meses.jpg` (cuadro 12.6 s) · caption `focus_ad09_todos-los-meses.txt`

| | |
|---|---|
| **Etapa** | BOFU |
| **Fenómeno del atlas** | Órbita |
| **Audiencia** | P1 fundadoras que necesitan presencia constante; P2 creadores que quieren un equipo sin armarlo; P3 empresas que quieren un solo proveedor mensual |
| **Objetivo** | Conversión: presentar el acompañamiento mensual como forma de contratación y abrir conversaciones por WhatsApp. |
| **Necesidad u objeción** | Dolor: coordinar freelancers y proveedores todos los meses; calidad despareja. Objeción: "un estudio premium es solo para proyectos grandes". |
| **Promesa verificable** | Un estudio completo cada mes (contenido, redes, web y flujos con IA) con la misma mano que diseñó la marca. Verificable: las seis cuentas que se muestran son casos de social media publicados en focuscreatives.net. Qué incluye exactamente: a confirmar por el estudio. |
| **Acción buscada** | Escribir por WhatsApp. |
| **Servicio destacado** | Acompañamiento mensual: social media management, contenido, mantenimiento web y flujos con IA |
| **Referencia estratégica** | P6 Koto Reel 2026: credenciales verificables funcionan con compradores que ya están comparando. P7: en el segmento premium las redes son credencial, no el único canal. |
| **CTA** | Escribinos por WhatsApp. |
| **Destino del tráfico** | wa.me/5491159264267 |
| **Banda sonora** | Tonalidad Re, 90 BPM. Acordes: 0 s maj9 → 3.4 s min9 → 9.2 s maj9 → 14.4 s min9 → 19.6 s lyd → 24.8 s sus4 → 30 s lyd → 36.2 s lyd → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,4 | Cuatro anillos de vidrio en órbita, vistos en perspectiva; sin puntos encendidos | Un estudio entero. / Todos los *meses.* | Rotación lenta; cámara que se acerca | Entrada desde desenfoque | Re mayor 9, pulso suave desde el inicio | Vidrio; tick | Gancho: la oferta en dos líneas |
| 3,4-9,2 | Los anillos giran; se encienden los puntos de luz | Sin armar un equipo interno. / Sin coordinar *proveedores.* | Palabra por palabra | Desenfoque cruzado | Si menor 9 | Aire | Dolor resuelto |
| 9,2-30,0 | Cada 5,2 s se ilumina un anillo y su frente: Contenido, Redes y comunidad, Web, Flujos con IA | Nombre del frente + dos líneas de qué incluye | El anillo activo brilla, los demás se atenúan | Corte al beat | Pulso a 90 BPM, bajo y hats; campana en cada vuelta | Clic por frente; campana | Qué incluye (a confirmar) |
| 30,0-36,2 | Grilla de seis casos reales de social media, enmarcados | Casos de social media: | Entradas escalonadas | Barrido de umbral | Sol lidio | Obturador | Prueba verificable |
| 36,2-41,0 | Vuelven los anillos, todos encendidos | Con la misma mano / que diseñó tu *marca.* | Rack focus | Desenfoque cruzado | Re lidio | Impacto suave | Diferencial: coherencia |
| 41,0-45,0 | Placa de cierre común | Un estudio, / todos los *meses.* · Escribinos por WhatsApp. · +54 9 11 5926 4267 · Sin plantilla · 09/10 | Entrada desde desenfoque | Veladura | Re mayor 9 | Firma sonora de vidrio | Cierre BOFU: conversación |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Anillos de vidrio en órbita | Escena 3D engine/scenes/orbit.js (cuatro toroides con marcas y un punto de luz por anillo) | "four concentric thin glass rings orbiting in the dark, one small glowing orb on each ring, magenta blue green and white, black studio, soft reflections, 3d render, no text" |
| Glifos de cada frente | direccion-de-arte, social-media, web, ia-agentes | — |
| Casos reales de social media | public/assets/clients/*-card.jpg (los seis de WORKS con social media). Confirmar permiso para pauta. | — |

### Caption

```text
Un estudio entero, todos los meses.

Contenido diseñado (no plantillas), redes y comunidad, mantenimiento y mejoras de tu web, y flujos con IA para lo repetido. Con la misma mano que diseñó tu marca, así nada se desordena de un mes al otro.

Sin armar un equipo interno. Sin coordinar proveedores.

Nuestros casos de social media van de bares y vinos a estética, industria y creadores. Están en focuscreatives.net.

Escribinos por WhatsApp y te contamos cómo funciona.

#socialmediamanagement #contenidodigital #marketingdigital #focuscreatives #buenosaires
```

### Criterio de éxito

Conversaciones de WhatsApp iniciadas y calificadas (con presupuesto mensual declarado) por cada 1.000 impresiones.

### Hipótesis para la prueba A/B

Destino WhatsApp contra formulario de contacto del sitio. Hipótesis: WhatsApp genera más conversaciones y el formulario, menos pero más calificadas; medir costo por conversación calificada, no por mensaje.

---

## A10 · Próximo caso

`entregables/anuncios/focus_ad10_proximo-caso.mp4` · portada `focus_ad10_proximo-caso.jpg` (cuadro 8.6 s) · caption `focus_ad10_proximo-caso.txt`

| | |
|---|---|
| **Etapa** | BOFU |
| **Fenómeno del atlas** | Dispersión y recomposición |
| **Audiencia** | Retargeting de las tres personas: quienes vieron el 75 % de un MOFU, visitantes del sitio y quienes interactuaron por DM |
| **Objetivo** | Conversión: consolidar la confianza con el portfolio real y pedir el brief (reunión o mensaje). |
| **Necesidad u objeción** | Última objeción: "¿con quién trabajaron?" y "¿lo mío entra en lo que hacen?". |
| **Promesa verificable** | Siete disciplinas con un solo criterio, y una línea nueva de software. Verificable: los nueve trabajos, sus rubros y servicios son los de focuscreatives.net; las cifras (8 marcas, 9 trabajos, 7 disciplinas) salen del sitio. |
| **Acción buscada** | Contar qué quieren construir: agendar 30 minutos o escribir. |
| **Servicio destacado** | Todo el estudio |
| **Referencia estratégica** | P6 Koto Reel 2026: credenciales con cifras verificables para quien ya compara estudios; la galería reproduce el gesto de la sección Trabajo del sitio (foco selectivo). |
| **CTA** | Agendá 30 minutos o escribinos. |
| **Destino del tráfico** | focuscreatives.net (sección Contacto: mail, WhatsApp y Calendly) |
| **Banda sonora** | Tonalidad Re, 92 BPM. Acordes: 0 s sus2 → 3.2 s min9 → 6.8 s maj9 → 10.4 s maj9 → 14.5 s min9 → 18.6 s lyd → 22.7 s maj9 → 26.8 s sus4 → 28.9 s lyd → 36.4 s maj9 → 41 s maj9 |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Siete bandas de luz caen desde arriba hacia un prisma de vidrio (3D, vertical); lista de disciplinas que se enciende en el color de cada banda | Siete *disciplinas.* | Las bandas avanzan escalonadas | Entrada desde negro | Re suspendido | Vidrio; tick | Gancho: el espectro completo |
| 3,2-10,4 | El prisma recompone: sale un solo haz blanco hacia abajo | Un solo haz. / Que la pieza no se pueda confundir / con la de nadie *más.* | Haz blanco con bloom | Continuo | Re menor 9 → Si bemol mayor 9 | Subida; grave cuando sale el haz | Idea: criterio único (frase del sitio) |
| 10,4-28,9 | Galería con foco selectivo: nueve trabajos reales, uno cada 2 s; el del centro nítido y en color, los vecinos desenfocados; rubro, cliente y servicios debajo | Rubro · 0N / 09 · cliente · servicios | Deslizamiento suave con pausa en cada caso | Foco selectivo | Pulso a 92 BPM, hats, arpegio | Clic por caso | Prueba: portfolio verificable |
| 28,9-36,4 | El cuadro vacío con marcas de corte ("Próximo caso · Tu marca") entra al centro | El próximo cuadro está vacío / a *propósito.* | Asentamiento | Foco selectivo | Re lidio | Vidrio al revés | Proyección: el lugar del cliente |
| 36,4-41,0 | Tinta; cifras del sitio, una por línea | 8 marcas · 9 trabajos · 7 disciplinas · 1 línea nueva: software | Rótulos que entran al beat | Corte al beat | Re mayor 9 | Clic por cifra | Credenciales verificables |
| 41,0-45,0 | Placa de cierre común, con el logo recompuesto desde RGB | Contanos qué / querés *construir.* · Agendá 30 minutos o escribinos. · focuscreatives.net · Sin plantilla · 10/10 | Recomposición RGB del logo | Veladura | Re mayor 9 resuelto | Firma sonora de vidrio | Cierre BOFU y de la serie |

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
| Prisma de vidrio en recomposición | Escena 3D engine/scenes/prism.js, modo merge, luz vertical | "vertical composition, seven beams of colored light (magenta to violet to blue to green) falling from above into a clear glass prism and exiting below as one single white beam, black studio, volumetric light, 3d render, no text" |
| Tarjetas de casos | public/assets/clients/*-card.jpg (los nueve de WORKS). Confirmar permiso para pauta. | — |
| Cuadro vacío "Tu marca · Próximo caso" | DOM con marcas de corte (el cierre de la galería del sitio) | — |

### Caption

```text
Siete disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más.

Arquitectura, estudios creativos, imprenta, bares, vinos, estética, consultoría y creadores de contenido. Nueve trabajos de rubros que no se parecen en nada, hechos con la misma mano. Y ahora, también, software a medida.

El próximo cuadro está vacío a propósito.

Contanos qué querés construir: agendá 30 minutos o escribinos a info@focus-creatives.com.

#portfolio #identidaddemarca #diseñoweb #focuscreatives #buenosaires
```

### Criterio de éxito

Clientes potenciales (reuniones + conversaciones) por cada 1.000 impresiones de retargeting; costo por reunión agendada.

### Hipótesis para la prueba A/B

Portfolio completo (9 trabajos a 2 s cada uno) contra portfolio corto (3 trabajos a 5 s, con el porqué de cada uno). Hipótesis: el completo transmite amplitud y convierte mejor en retargeting frío; el corto, en quienes ya visitaron el sitio.

