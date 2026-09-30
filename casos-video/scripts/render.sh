#!/bin/bash
# Arma, revisa, renderiza y codifica el video de uno o más casos.
#   uso: casos-video/scripts/render.sh <id> [<id>…]   |   render.sh todos
# Sale a public/assets/cases/<id>.mp4 (H.264, 720×900, sin audio: en el sitio
# el video corre mudo dentro de la tarjeta). Los casos web renderizan primero
# el video del sitio (scripts/brag.sh), que después corre dentro del teléfono.
set -euo pipefail
cd "$(dirname "$0")/.."
HF="${HF:-npx hyperframes}"
ids=("$@")
# "todos" saltea los casos marcados como pendientes (sin material todavía).
if [ "${1:-}" = "todos" ]; then
  ids=()
  for d in casos/*/caso.json; do
    grep -q '"pendiente": true' "$d" && continue
    ids+=("$(basename "$(dirname "$d")")")
  done
fi
mkdir -p ../public/assets/cases
for id in "${ids[@]}"; do
  # Un caso web lleva adentro el video del sitio: se renderiza antes, si falta
  # o si su composición cambió.
  if grep -q '"tipo": "web"' "casos/$id/caso.json"; then
    if [ ! -s "casos/$id/media/brag.mp4" ] || [ "brag/$id.html" -nt "casos/$id/media/brag.mp4" ]; then
      scripts/brag.sh "$id"
    fi
  fi
  node scripts/build.mjs "$id"
  $HF lint >/dev/null || { $HF lint; exit 1; }
  mkdir -p "work/$id"
  $HF render --quality looks --output "work/$id/render.mp4" 2>&1 | tail -3
  # Se carga con la página: si pasa de 2 MB (reels con mucho detalle), se
  # comprime un paso más.
  for crf in 28 30 32; do
    ffmpeg -v error -y -i "work/$id/render.mp4" -an -c:v libx264 -profile:v high -crf $crf -preset slow \
      -pix_fmt yuv420p -g 60 -movflags +faststart "../public/assets/cases/$id.mp4"
    [ "$(wc -c < "../public/assets/cases/$id.mp4")" -lt 2000000 ] && break
  done
  echo "$id → public/assets/cases/$id.mp4 ($(($(wc -c < "../public/assets/cases/$id.mp4") / 1024)) KB, crf $crf)"
done
