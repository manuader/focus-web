#!/bin/bash
# Baja lo que los videos de los sitios (brag/<id>.html) toman del sitio real:
# logo, imágenes y tipografías. Las imágenes son del cliente y no se versionan
# (casos/<id>/media/brag/); las tipografías son de licencia abierta y quedan
# en kit/fonts/.
#   uso: casos-video/scripts/material-brag.sh
set -euo pipefail
cd "$(dirname "$0")/.."
get() { # get <url> <destino> [ancho máximo]
  [ -s "$2" ] && return 0
  mkdir -p "$(dirname "$2")"
  curl -sfL "$1" -o "$2.tmp"
  if [ -n "${3:-}" ]; then
    ffmpeg -v error -y -i "$2.tmp" -vf "scale='min($3,iw)':-2:flags=lanczos" -q:v 3 "$2" && rm "$2.tmp"
  else mv "$2.tmp" "$2"; fi
  echo "  $2"
}
font() { get "https://cdn.jsdelivr.net/npm/@fontsource/$1/files/$1-latin-$2-$3.woff2" "kit/fonts/$1-$2-$3.woff2"; }

font barlow-condensed 800 normal; font barlow-condensed 500 normal; font barlow-condensed 300 italic
font fredoka 500 normal; font fredoka 600 normal; font archivo 400 normal; font archivo 600 normal; font space-mono 400 normal; font homemade-apple 400 normal
font inter 400 normal; font inter 600 normal; font inter 700 normal

A=https://ader-studio.vercel.app/images; D=casos/ader-studio/media/brag
# El logo viene negro sobre blanco: se pasa a negro con transparencia, para
# apoyarlo sobre el papel del sitio sin que se vea el recuadro.
for n in mark full; do
  [ -s $D/logo-$n.png ] && continue
  get "$A/logo-$n.webp" $D/logo-$n-blanco.png 1100
  ffmpeg -v error -y -i $D/logo-$n-blanco.png -filter_complex "[0:v]format=gray,negate[a];[0:v]drawbox=c=black:t=fill,format=rgb24[c];[c][a]alphamerge" $D/logo-$n.png
  rm $D/logo-$n-blanco.png
done
get "$A/hero/fachada%20byn.webp" $D/fachada.jpg 1100
i=0; for f in "01.%20TERRENO%20BASE%20ANGEL" "02.%20TERRENO%20ANGEL%20GRILLA" "03.%20PLANO%20TERRENO%20IA" "04.%20COMPOSICION%20FORMA%20IA" "05.%20MORFOLOGIA" "06.%20PB"; do i=$((i+1)); get "$A/process/$f.webp" $D/proceso-$i.jpg 1000; done
i=0; for f in "BIM%2001%20ESTRUCTURA" "BIM%2002%20MAMPOSTERIA" "BIM%2003%20ARQUITECTURA" "BIM%2004%20INSTALACIONES"; do i=$((i+1)); get "$A/bim/$f.webp" $D/bim-$i.png 1000; done
i=0; for f in "01%20-%20Living" "03%20-%20Acceso" "05%20-%20Museo" "09%20-%20%20Ascensor" "14%20-%20Estructura" "06%20-%20Circulaci%C3%B3n" "08%20-%20Comedor" "13%20-%20Hall" "02%20-%20Oficina" "16%20-%20Living"; do i=$((i+1)); get "$A/renders/$f.webp" $D/render-$i.jpg 700; done

O=https://oushy-web.vercel.app; D=casos/oushy/media/brag
get "$O/assets/oushy-wordmark.png" $D/wordmark.png
get "$O/assets/oushy-star.png" $D/star.png
for n in estrategia identidad contenido performance; do get "$O/assets/icons/$n.png" $D/icono-$n.png; done
i=0; for f in horno-pizza grilla-moda cuero-grabado cartel-fachada postre-packaging tote-calle haiku-retrato; do i=$((i+1)); get "$O/feed/$f.webp" $D/feed-$i.jpg 700; done

T=https://toplaserimprenta.com/images; D=casos/top-laser-web/media/brag
get "$T/logo-round.webp" $D/logo.png
for i in 1 2 3 4 5 6; do get "$T/gallery/stickers/opp-blanco-$i.webp" $D/sticker-$i.jpg 800; done
get "$T/stickers-showcase.webp" $D/showcase.jpg 900
get "$T/machines/mimaki-1.webp" $D/mimaki.jpg 900
# El logo del sitio mide 200 px: se usa el de la tarjeta, que está a buena resolución.
[ -s $D/logo-card.jpg ] || ffmpeg -v error -y -i casos/top-laser-web/media/card.jpg -vf "crop=640:640:130:209" -q:v 2 $D/logo-card.jpg
echo listo
