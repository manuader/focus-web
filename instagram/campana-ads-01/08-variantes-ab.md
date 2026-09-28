# 08 · Variantes para pruebas A/B (primera ronda)

Una variante B por anuncio. Cada una cambia **una sola variable** (gancho, apertura, galería o CTA) y hereda todo lo demás de la A: composición, sonido, duración y cierre. Así la diferencia de resultado se puede atribuir a esa variable. Las dos versiones salen del mismo archivo (`produccion/ads/aNN.js`, con `F.B`); se renderizan con `./ad.sh aNN` y `./ad.sh aNNb`.

**Cómo correr cada prueba:** prueba A/B nativa de Meta (Experimentos) con el mismo presupuesto, la misma audiencia y la misma ubicación para A y B, al menos 7 días y sin tocar nada durante la prueba. Se declara ganadora la versión con mejor métrica principal si la diferencia es estadísticamente significativa según el reporte de Meta; si no lo es, se mantiene la A y se prueba la siguiente variable. Nunca se prueban dos variables a la vez.

| # | Variable | Archivo A | Archivo B | Métrica principal |
|---|---|---|---|---|
| A01 | Gancho (0-3,2 s) | `focus_ad01_sin-plantilla.mp4` | `focus_ad01_sin-plantilla_b.mp4` | Retención a 3 s por encima del promedio de la cuenta y ThruPlay (15 s) mayor al 25 % de las reproducciones |
| A02 | Gancho (0-3,4 s) | `focus_ad02_fuera-de-foco.mp4` | `focus_ad02_fuera-de-foco_b.mp4` | Tasa de guardados por cada 1.000 reproducciones por encima del promedio de la cuenta |
| A03 | Gancho (0-3,5 s) | `focus_ad03_lo-que-queda.mp4` | `focus_ad03_lo-que-queda_b.mp4` | Envíos por cada 1.000 reproducciones por encima del promedio de la cuenta |
| A04 | Gancho (0-3,2 s) | `focus_ad04_a-medida.mp4` | `focus_ad04_a-medida_b.mp4` | Conversaciones iniciadas por DM y clics al sitio por cada 1.000 impresiones en el segmento P3. |
| A05 | Apertura (0-7,2 s) | `focus_ad05_una-decision.mp4` | `focus_ad05_una-decision_b.mp4` | Clics al enlace por cada 1.000 impresiones y tiempo en el sitio de quienes llegan desde el anuncio |
| A06 | Gancho (0-3,2 s) y giro (37-41 s) intercambiados | `focus_ad06_el-flujo.mp4` | `focus_ad06_el-flujo_b.mp4` | Reuniones agendadas en Calendly atribuidas al anuncio (UTM) y clics al enlace |
| A07 | Apertura (0-3,4 s) | `focus_ad07_primera-reunion.mp4` | `focus_ad07_primera-reunion_b.mp4` | Clics al enlace por cada 1.000 impresiones y porcentaje de sesiones móviles con scroll hasta "Trabajo". |
| A08 | Cierre (41-45 s) | `focus_ad08_el-proceso.mp4` | `focus_ad08_el-proceso_b.mp4` | Reuniones agendadas por cada 1.000 impresiones en audiencias de retargeting |
| A09 | CTA y destino (41-45 s) | `focus_ad09_todos-los-meses.mp4` | `focus_ad09_todos-los-meses_b.mp4` | Conversaciones de WhatsApp iniciadas y calificadas (con presupuesto mensual declarado) por cada 1.000 impresiones. |
| A10 | Galería (10,4-28,9 s) | `focus_ad10_proximo-caso.mp4` | `focus_ad10_proximo-caso_b.mp4` | Clientes potenciales (reuniones + conversaciones) por cada 1.000 impresiones de retargeting |

---

## A01 · Sin plantilla (TOFU)

- **Hipótesis:** Gancho: "Todo empieza a parecerse." (grilla de iguales) contra "Usamos IA. No usamos plantillas." en el cuadro 0. Hipótesis: la grilla genérica retiene más a 3 s porque el público se reconoce en el problema antes de escuchar la postura.
- **Qué cambia en la B:** Gancho (0-3,2 s): la postura en frase, "Usamos IA. / No usamos plantillas.", con refracción RGB sobre tinta, en lugar de la grilla de piezas genéricas. La grilla entra a los 3,2 s y se anula igual.
- **Archivos:** A `entregables/anuncios/focus_ad01_sin-plantilla.mp4` · B `entregables/anuncios/focus_ad01_sin-plantilla_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** Perfil de Instagram (seguir) · secundario: focuscreatives.net
- **Métrica principal:** Retención a 3 s por encima del promedio de la cuenta y ThruPlay (15 s) mayor al 25 % de las reproducciones; seguidores nuevos por cada 1.000 alcanzados.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Tinta con un punto de luz; titular en dos tiempos que se recompone desde RGB | Usamos IA. / No usamos *plantillas.* | Refracción que converge | Corte en frío | Pad suspendido en Re con golpe grave | Impacto; vidrio | Gancho de postura |
| 3,2-8,5 | Entra la grilla genérica (rotulada) y converge hasta anularse | Cuando todo se parece, / nada se ve. | Convergencia en 2,4 s | Superposición hasta negro | Re menor 9 | Clic; grave | Problema |

---

## A02 · Fuera de foco (TOFU)

- **Hipótesis:** Gancho: "Vendés como una marca grande. ¿Te ves como una?" contra "Tu marca vende más de lo que muestra." Hipótesis: la pregunta en segunda persona retiene más porque obliga a responder mentalmente en el primer segundo.
- **Qué cambia en la B:** Gancho (0-3,4 s): la afirmación "Tu marca vende más de lo que muestra." en un solo plano que entra en foco, en lugar de la pregunta en dos planos con rack focus.
- **Archivos:** A `entregables/anuncios/focus_ad02_fuera-de-foco.mp4` · B `entregables/anuncios/focus_ad02_fuera-de-foco_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** Guardado en Instagram · secundario: focuscreatives.net
- **Métrica principal:** Tasa de guardados por cada 1.000 reproducciones por encima del promedio de la cuenta; retención al 50 % (22 s).

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,4 | Un plano de texto sobre tinta; la segunda línea entra desde desenfoque | Tu marca vende más / de lo que *muestra.* | Rack focus de 26 px a 0 | Corte en frío | Pad suspendido en Mi | Vidrio; tick | Gancho afirmativo |

---

## A03 · Lo que queda (TOFU)

- **Hipótesis:** Gancho: "Tenés una audiencia. ¿Tenés una marca?" contra "¿Qué queda de tu marca cuando no estás en cámara?". Hipótesis: el contraste audiencia/marca en dos tiempos retiene más que una pregunta larga en una sola placa.
- **Qué cambia en la B:** Gancho (0-3,5 s): una sola pregunta larga, "¿Qué queda de tu marca cuando no estás en cámara?", en lugar del contraste en dos tiempos audiencia/marca.
- **Archivos:** A `entregables/anuncios/focus_ad03_lo-que-queda.mp4` · B `entregables/anuncios/focus_ad03_lo-que-queda_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** Envío por DM · secundario: perfil y focuscreatives.net
- **Métrica principal:** Envíos por cada 1.000 reproducciones por encima del promedio de la cuenta; retención al 75 % (34 s).

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,5 | Columna de vidrio sobre espejo negro | ¿Qué queda de tu marca / cuando no estás / en *cámara?* | Palabra por palabra | Entrada desde negro | Vidrio y aire, sin pulso | Vidrio; tick | Gancho en una pregunta |

---

## A04 · A medida (TOFU)

- **Hipótesis:** Gancho de dolor ("Tu operación corre en planillas...") contra gancho de producto (el panel funcionando desde el cuadro 0). Hipótesis: en TOFU el dolor retiene más a 3 s; en retargeting, el producto convierte más.
- **Qué cambia en la B:** Gancho (0-3,2 s): el panel de concepto conciliando pedidos desde el cuadro 0, con "Así se ve un proceso hecho a medida.", en lugar del dolor (planillas, mails y apps). El caos entra a los 3,2 s.
- **Archivos:** A `entregables/anuncios/focus_ad04_a-medida.mp4` · B `entregables/anuncios/focus_ad04_a-medida_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** DM de Instagram · secundario: focuscreatives.net
- **Métrica principal:** Conversaciones iniciadas por DM y clics al sitio por cada 1.000 impresiones en el segmento P3.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Panel de concepto: los pedidos pasan a "Conciliado" en secuencia | Así se ve un proceso / hecho a *medida.* | Filas que cambian de estado | Corte en frío | Pad en Mi | Blips | Gancho de producto |
| 3,2-9,4 | Entran los fragmentos genéricos (planilla, mail, chat) | Cada proceso que no entra / en un software genérico / se paga en *horas.* | Fragmentos que vibran | Desenfoque | Mi menor 9 | Teclas | El contraste: cómo es hoy |

---

## A05 · Una decisión (MOFU)

- **Hipótesis:** Apertura en macro de la C (abstracta) contra apertura con el logo completo y la pregunta "¿Qué es un sistema de identidad?". Hipótesis: el macro abstracto sostiene más la curiosidad en MOFU porque el público ya conoce la marca por TOFU.
- **Qué cambia en la B:** Apertura (0-7,2 s): el logo completo con la pregunta "¿Qué es un sistema de identidad?" y después un zoom hacia la C, en lugar del macro abstracto que se abre al logo.
- **Archivos:** A `entregables/anuncios/focus_ad05_una-decision.mp4` · B `entregables/anuncios/focus_ad05_una-decision_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** focuscreatives.net (sección Servicios y Trabajo)
- **Métrica principal:** Clics al enlace por cada 1.000 impresiones y tiempo en el sitio de quienes llegan desde el anuncio; retención al 75 %.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-2,6 | Logo completo, entra en foco | ¿Qué es un sistema / de *identidad?* | Rack focus | Entrada desde desenfoque | La mayor 9 | Tick | Gancho explícito |
| 2,6-9,6 | Zoom exponencial hacia la C abierta; nacen los anillos | Un anillo abierto / en lugar de una *C.* | Zoom de 0,25x a 0,82x | Continuo | Arpegio | Aire | Revelación del detalle |

---

## A06 · El flujo (MOFU)

- **Hipótesis:** Gancho meta ("Este anuncio no se editó en una app.") contra gancho de beneficio ("Más velocidad. El mismo criterio."). Hipótesis: el gancho meta retiene más en P3 porque promete ver algo que no ve en otras agencias: el detrás de escena real.
- **Qué cambia en la B:** Gancho (0-3,2 s) y giro (37-41 s) intercambiados: abre con el beneficio "Más velocidad. El mismo criterio." sobre la terminal y cierra el desarrollo con "Este anuncio no se editó en una app. Se escribió."
- **Archivos:** A `entregables/anuncios/focus_ad06_el-flujo.mp4` · B `entregables/anuncios/focus_ad06_el-flujo_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** calendly.com/focus-creatives-info/30min
- **Métrica principal:** Reuniones agendadas en Calendly atribuidas al anuncio (UTM) y clics al enlace; retención al 50 %.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,2 | Terminal: el comando real de render y el contador de cuadros | Más velocidad. / El mismo *criterio.* | Tipeo; contador | Corte en frío | Pad en Do | Teclas | Gancho de beneficio |
| 37,0-41,0 | Punto blanco que respira | Este anuncio no se editó / en una app. → Se *escribió.* | Rack focus | Desenfoque cruzado | Do lidio | Impacto suave | Giro meta |

---

## A07 · La primera reunión (MOFU)

- **Hipótesis:** Apertura con la frase de negocio ("Tu sitio es la primera reunión...") contra apertura con la interacción más vistosa (el prisma) sin texto los primeros 1,5 s. Hipótesis: la frase retiene más a P3; el prisma, a P1.
- **Qué cambia en la B:** Apertura (0-3,4 s): el prisma del sitio respondiendo al scroll, sin texto durante 1,5 s, y recién después la frase de negocio. En la A abre el hero con la frase desde el cuadro 0.
- **Archivos:** A `entregables/anuncios/focus_ad07_primera-reunion.mp4` · B `entregables/anuncios/focus_ad07_primera-reunion_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** focuscreatives.net
- **Métrica principal:** Clics al enlace por cada 1.000 impresiones y porcentaje de sesiones móviles con scroll hasta "Trabajo".

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 0,0-3,4 | El prisma del sitio en un teléfono, acelerado; sin texto hasta 1,5 s | (1,5 s) Tu sitio es la primera reunión / con tu *cliente.* | Captura a 2,2x | Entrada desde desenfoque | Pad acuoso en La | Vidrio; clic | Gancho visual |

---

## A08 · El proceso (BOFU)

- **Hipótesis:** Cierre con "Agendá 30 minutos" contra cierre con "Escribinos por WhatsApp". Hipótesis: P3 prefiere agendar (formal, con calendario); P1 prefiere WhatsApp (inmediato). Segmentar la prueba por audiencia.
- **Qué cambia en la B:** Cierre (41-45 s): "Primero, te escuchamos." con CTA a WhatsApp, en lugar de agendar 30 minutos en Calendly.
- **Archivos:** A `entregables/anuncios/focus_ad08_el-proceso.mp4` · B `entregables/anuncios/focus_ad08_el-proceso_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** wa.me/5491159264267
- **Métrica principal:** Reuniones agendadas por cada 1.000 impresiones en audiencias de retargeting; tasa de asistencia a la reunión.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 41,0-45,0 | Placa de cierre común | Primero, / te *escuchamos.* · Escribinos por WhatsApp. · +54 9 11 5926 4267 · Sin plantilla · 08/10 | Entrada desde desenfoque | Veladura | Re mayor 9 | Firma sonora de vidrio | Cierre BOFU: conversación |

Caption de la B: igual al de la A, con el cierre "Escribinos por WhatsApp: la primera conversación es para entender tu marca."

---

## A09 · Todos los meses (BOFU)

- **Hipótesis:** Destino WhatsApp contra formulario de contacto del sitio. Hipótesis: WhatsApp genera más conversaciones y el formulario, menos pero más calificadas; medir costo por conversación calificada, no por mensaje.
- **Qué cambia en la B:** CTA y destino (41-45 s): "Contanos qué necesitás en el sitio." hacia la sección Contacto de focuscreatives.net, en lugar de WhatsApp.
- **Archivos:** A `entregables/anuncios/focus_ad09_todos-los-meses.mp4` · B `entregables/anuncios/focus_ad09_todos-los-meses_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** focuscreatives.net/#contacto
- **Métrica principal:** Conversaciones de WhatsApp iniciadas y calificadas (con presupuesto mensual declarado) por cada 1.000 impresiones.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 41,0-45,0 | Placa de cierre común | Un estudio, / todos los *meses.* · Contanos qué necesitás en el sitio. · focuscreatives.net · Contacto · Sin plantilla · 09/10 | Entrada desde desenfoque | Veladura | Re mayor 9 | Firma sonora de vidrio | Cierre BOFU: formulario |

Caption de la B: igual al de la A, con el cierre "Contanos qué necesitás en focuscreatives.net y te contamos cómo funciona."

---

## A10 · Próximo caso (BOFU)

- **Hipótesis:** Portfolio completo (9 trabajos a 2 s cada uno) contra portfolio corto (3 trabajos a 5 s, con el porqué de cada uno). Hipótesis: el completo transmite amplitud y convierte mejor en retargeting frío; el corto, en quienes ya visitaron el sitio.
- **Qué cambia en la B:** Galería (10,4-28,9 s): tres trabajos a 6 s cada uno (Top Láser, @santatuca, Ader Studio) en lugar de los nueve a 2 s.
- **Archivos:** A `entregables/anuncios/focus_ad10_proximo-caso.mp4` · B `entregables/anuncios/focus_ad10_proximo-caso_b.mp4` (portada `.jpg` y caption `.txt` con el mismo nombre)
- **Destino de la B:** focuscreatives.net (sección Contacto: mail, WhatsApp y Calendly)
- **Métrica principal:** Clientes potenciales (reuniones + conversaciones) por cada 1.000 impresiones de retargeting; costo por reunión agendada.

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
| 10,4-28,9 | Galería con foco selectivo: Top Láser (identidad, redes, audiovisual y web), @santatuca (edición y redes), Ader Studio (web); 6 s cada uno | Rubro · 0N / 03 · cliente · servicios | Deslizamiento suave con pausa larga | Foco selectivo | Pulso a 92 BPM | Clic por caso | Prueba: profundidad en vez de amplitud |

