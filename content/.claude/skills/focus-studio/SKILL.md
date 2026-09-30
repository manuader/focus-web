---
name: focus-studio
description: >-
  Punto de entrada para producir CUALQUIER contenido de FOCUS creatives desde
  un pedido en lenguaje natural: reels 9:16, carruseles 4:5, historias,
  campañas o tandas de lanzamiento, captions, versiones en inglés y piezas que
  muestran el sitio o el software del estudio. Decide el formato y el camino,
  carga solo lo necesario (focus-contenido, focus-identidad, brag-slim), aplica
  el design system y entrega con los oráculos en verde. Usar ante "hacé un
  reel/carrusel/historia de FOCUS", "armá la próxima tanda", "una pieza sobre
  <servicio/caso>", "contenido para el Instagram de FOCUS".
---

# FOCUS Studio: de un pedido a una pieza lista para publicar

Esta skill decide el camino y coordina. **No reemplaza** a las especializadas: las llama.

## 0. Siempre primero

1. **Entorno:** si falta `.venv/`, corré `./focus setup`.
2. **Lecturas obligatorias:**
   - `design-system/README.md`: tipografía, color, formatos;
   - la skill `focus-identidad`: dirección de arte, voz y criterio de pertenencia;
   - `focus-contenido/references/evidencia.md`: lo que se puede afirmar;
   - `focus-contenido/references/catalogo-piezas.md`: lo que ya existe y no se repite.
3. **Brief en una línea:** formato, idea, público, eje (marca, servicios, software, proceso, criterio o portfolio), CTA. Lo que se pueda inferir se infiere y se declara. Solo se pregunta lo que es **decisión de negocio**:
   - atribuir a FOCUS un proyecto "A validar";
   - etiquetar clientes;
   - gastar dinero;
   - publicar.

## 1. Router

| Si piden… | Camino | Salida |
|---|---|---|
| Reel 9:16 (15–30 s) | `./focus new <campaña> reel <slug>` → guion con rúbrica (`guion.md`) → `./focus stills` (mirar la hoja) → `./focus render` | mp4 1080×1920 a -14 LUFS + portada + caption |
| Carrusel | `./focus new <campaña> carrusel <slug>` → copy → `./focus pieza` (mirar la hoja con `guidelines/30-carruseles.md`) | PNG 1080×1350 + caption |
| Historias | `./focus new <campaña> historia <slug>` → `./focus pieza` + ficha con la zona del sticker | PNG 1080×1920 |
| Una tanda o campaña completa | Carpeta `campanas/<aaaa-mm-slug>/` con fichas (`03-reels.md`…), matriz y calendario, como `campanas/2026-10-lanzamiento-instagram` → `./focus campana` → `./focus verify` | Todo lo de arriba + `entregas/resumen.jpg` |
| Pieza que muestra el sitio o el software | `./focus capture <toma>` con focus-web corriendo en :3100 → `seq()` en la pieza | Captura real, nunca un mockup |
| Caso del portfolio | Primero `evidencia.md` §2 y §4. Si está "A validar", la pieza se hace como **borrador** y la atribución se le plantea al usuario | — |
| Prompt para Claude Design | Bloque `[MARCA]` de `campanas/…/03-reels.md` + formato + cuadro por cuadro + restricciones | Texto del prompt |
| Imagen nueva | Solo luz, prismas o texturas (`guidelines/50-imagen.md`). Se suma a `assets/CATALOGO.md` | Asset en `design-system/assets/` |
| Voz en off | Pendiente: no hay voz de marca (`design-system/voz/README.md`) | — |

Si el pedido no encaja, elegí la fila más cercana y declaralo.

## 2. Flujo común

1. **Evidencia:** cada caso, cifra o detalle técnico, con su etiqueta. Lo nuevo se agrega a `evidencia.md` con su fuente.
2. **Guion:** estructura y rúbrica de `guion.md`. El **revisor independiente** (un subagente sin tu contexto) tiene que dar 8,5 o más.
3. **Producción** con el motor (`design-system/plantillas`) y las clases de texto del design system (`t-head`, `t-subserif`, `t-title` con `*énfasis*`, `t-eyebrow`, `t-label`).
4. **Oráculos:**
   - hoja de cuadros revisada, en `work/_control/`;
   - `./focus verify campanas/<c>` con exit 0;
   - si tocaste el repo, `./focus check` con exit 0.
5. **Entrega:**
   - `campanas/<c>/entregas/`;
   - fichas con caption y prompts;
   - lista de decisiones de negocio abiertas.

## 3. Reglas que no se negocian

- Sin exclamaciones, rayas ni emojis. Voseo.
- Sin métricas ni resultados de clientes: no hay ninguno publicado.
- Los detalles técnicos se citan con su fuente real.
- El color es luz sobre tinta, con dos acentos como máximo por cuadro.
- La pieza termina resuelta.
- Música original (`audio.py`): sin pistas de terceros sin licencia.
- Sin gastar dinero ni crear cuentas.
