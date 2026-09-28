# Formatos, zonas seguras y export

| Pieza | Lienzo | Zona segura de contenido | Notas |
|---|---|---|---|
| Reel | 1080 × 1920, 30 fps | x 80-1000 · y 250-1500 | Arriba 250 px: nombre y audio. Abajo 420 px: caption y botones. Derecha 120 px: íconos. |
| Portada de reel en grilla | recorte 3:4 centrado (1080 × 1440 dentro del 9:16) | y 240-1680 | El título de portada debe leerse dentro de ese recorte. |
| Carrusel | 1080 × 1350 (4:5) | x 80-1000 · y 80-1270 | La grilla de perfil recorta a 3:4: mantener el titular del cuadro 1 dentro de x 34-1046. |
| Historia | 1080 × 1920 | y 220-1580 | Arriba 220: barra de progreso y avatar. Abajo 340: respuesta y stickers. |

Duraciones: reels de 12 a 30 s (punto justo: 18-22 s), carruseles de 6 a 10
cuadros, historias de 3 a 6 cuadros por secuencia (5 s por foto, hasta 15 s
por video).

Export:
- Video: H.264 High, yuv420p, CRF 18, 30 fps, AAC 192 kbps 48 kHz, -14 LUFS
  integrados, pico -1 dBTP. `+faststart`.
- Imagen: PNG para gráfica, JPG calidad 92 para fotografía. sRGB.
- Nombres: `focus_<tipo><nn>_<slug>_v<n>.<ext>`, por ejemplo
  `focus_reel03_refraccion_v1.mp4`.
