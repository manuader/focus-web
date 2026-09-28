# Biblioteca de movimiento

Curva maestra: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo). Para salidas,
`cubic-bezier(0.7, 0, 0.84, 0)` (ease-in-expo). Nada lineal salvo rotaciones
continuas.

| Gesto | Parámetros | Duración | Sonido |
|---|---|---|---|
| Rack focus (entrada) | blur 16 → 0 px, opacidad 0 → 1, escala 1,04 → 1 | 0,8-1,2 s | tick de lente al llegar a 0 |
| Rack focus (salida) | blur 0 → 16 px, opacidad 1 → 0 | 0,4-0,6 s | ninguno |
| Refracción | 3 copias (magenta, azul, verde) en `screen`, desplazadas ±8-40 px, convergen | 0,6-1 s | tono que se resuelve |
| Aberración de filo | copias a ±2-3 px, fijas | continua | ninguno |
| Haz | línea blanca 2-4 px con halo, avanza de izquierda a derecha; al tocar el prisma se abre en 3 o 7 bandas | 1,5-2,5 s | swell de aire |
| Recomposición | las bandas convergen a un punto blanco que florece (bloom) | 0,8-1,2 s | acorde mayor abierto |
| Umbral | línea vertical u horizontal de 1 px barre; detrás, el nuevo estado | 0,8-1,4 s | respiración grave |
| Anillos | rotación 40-60 s por vuelta; pulso de escala 1 → 1,03 | continua | ninguno |
| Iris | máscara circular se cierra a 0 y abre en la escena nueva | 0,6 + 0,6 s | clic suave |
| Texto por palabra | cada palabra entra con blur 10 → 0, desfase 60-90 ms | 0,5 s por palabra | ninguno |

Reglas:
- Una sola cosa se mueve con protagonismo a la vez.
- Todo movimiento termina quieto al menos 0,5 s antes del corte si hay texto.
- Cámara: si hay movimiento de cámara, es un push-in lento (escala 1 → 1,06 en
  todo el plano) o un lateral lento. Nunca shake.
