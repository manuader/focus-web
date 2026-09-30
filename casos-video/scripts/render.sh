#!/bin/bash
# Arma, revisa, renderiza y codifica el video de uno o más casos.
#   uso: casos-video/scripts/render.sh <id> [<id>…]   |   render.sh todos
# Sale a public/assets/cases/<id>.mp4 (H.264, 720×900, sin audio: en el sitio
# el video corre mudo dentro de la tarjeta).
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
  node scripts/build.mjs "$id"
  $HF lint >/dev/null || { $HF lint; exit 1; }
  mkdir -p "work/$id"
  $HF render --quality looks --output "work/$id/render.mp4" 2>&1 | tail -3
  ffmpeg -v error -y -i "work/$id/render.mp4" -an -c:v libx264 -profile:v high -crf 28 -preset slow \
    -pix_fmt yuv420p -g 60 -movflags +faststart "../public/assets/cases/$id.mp4"
  echo "$id → public/assets/cases/$id.mp4 ($(du -k "../public/assets/cases/$id.mp4" | cut -f1) KB)"
done
