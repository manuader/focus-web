#!/bin/bash
# Une los cuadros de snapshots/ en una sola hoja de control.  uso: hoja.sh <salida.jpg> [columnas] [ancho]
cd "$(dirname "$0")/.."
cols=${2:-6}; w=${3:-300}
ls snapshots/frame-*.png | sort > work/_control/lista.txt
n=$(wc -l < work/_control/lista.txt | tr -d ' ')
args=(); while read -r f; do args+=(-i "$f"); done < work/_control/lista.txt
ffmpeg -v error -y "${args[@]}" -filter_complex "$(for i in $(seq 0 $((n-1))); do printf '[%d:v]scale=%d:-2[v%d];' $i $w $i; done)$(for i in $(seq 0 $((n-1))); do printf '[v%d]' $i; done)xstack=inputs=$n:layout=$(h=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$(head -1 work/_control/lista.txt)" | awk -F, -v w=$w '{printf "%d", int(w*$2/$1/2)*2}'); for i in $(seq 0 $((n-1))); do printf '%d_%d' $(( (i%cols)*w )) $(( (i/cols)*h )); [ $i -lt $((n-1)) ] && printf '|'; done):fill=black" -frames:v 1 "$1"
