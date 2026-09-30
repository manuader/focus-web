#!/bin/bash
# Oráculo de entrega de los videos de casos. Termina con VERIFY_EXIT 0 si cada
# caso de WORKS que declara `video` tiene su mp4 en regla.
cd "$(dirname "$0")/.."
fail=0
bad() { echo "  ✗ $1"; fail=1; }
ids=$(grep -o "video: '/assets/cases/[a-z0-9-]*\.mp4'" src/lib/content.ts | sed "s/.*cases\/\(.*\)\.mp4'/\1/")
[ -n "$ids" ] || bad "WORKS no declara ningún video"
for id in $ids; do
  f="public/assets/cases/$id.mp4"
  echo "$id"
  [ -s "$f" ] || { bad "falta $f"; continue; }
  wh=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f")
  [ "$wh" = "720,900" ] || bad "tamaño $wh, tiene que ser 720,900"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  awk "BEGIN{exit !($dur > 11.9 && $dur < 12.1)}" || bad "dura $dur s, tiene que durar 12"
  [ -z "$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f")" ] || bad "tiene pista de audio"
  kb=$(($(wc -c < "$f") / 1024))
  [ "$kb" -lt 2560 ] || bad "pesa $kb KB, el tope es 2560"
  # El primer y el último cuadro tienen que ser la tarjeta: sin eso el fundido
  # desde el logo y el loop se notan.
  card="casos-video/casos/$id/media/card.jpg"
  for at in 0 11.9; do
    psnr=$(ffmpeg -v error -ss "$at" -i "$f" -i "$card" -frames:v 1 \
      -filter_complex "[1:v]scale=720:900[c];[0:v][c]psnr=stats_file=-" -f null - 2>/dev/null | sed -n 's/.*psnr_avg:\([0-9.inf]*\).*/\1/p' | head -1)
    awk "BEGIN{exit !(\"$psnr\" == \"inf\" || $psnr + 0 > 30)}" || bad "el cuadro en ${at}s no coincide con la tarjeta (PSNR $psnr)"
  done
done
echo "VERIFY_EXIT $fail"
exit $fail
