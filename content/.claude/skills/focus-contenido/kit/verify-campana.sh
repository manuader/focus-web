#!/bin/bash
# verify-campana.sh · oráculo de entrega de una campaña FOCUS. exit 0 = lista para revisar/publicar.
#   ./focus verify campanas/<campaña>
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"; C="$ROOT/$1"; E="$C/entregas"
PY="${FOCUS_PY:-python3}"; FF=$("$PY" -c 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())')
fail=0; ok(){ echo "OK   $*"; }; bad(){ echo "FAIL $*"; fail=1; }
[ -d "$C" ] || { echo "No existe $1"; exit 1; }
# 1. reels: mp4 1080×1920 30 fps con audio, 12–30 s, -16 a -13 LUFS, portada y caption
for f in "$C"/reels/*.js; do [ -e "$f" ] || continue
  n=$(sed -n "s/.*name: .\(focus_[^'\"]*\).*/\1/p" "$f" | head -1); v="$E/reels/$n.mp4"
  [ -f "$v" ] || { bad "$n: falta el mp4"; continue; }
  info=$("$FF" -hide_banner -i "$v" 2>&1)
  echo "$info" | grep -q "1080x1920" || bad "$n: no es 1080×1920"
  echo "$info" | grep -q " 30 fps" || bad "$n: no es 30 fps"
  echo "$info" | grep -q "Audio: aac" || bad "$n: sin audio AAC"
  d=$(echo "$info" | sed -n 's/.*Duration: 00:00:\([0-9.]*\).*/\1/p'); awk "BEGIN{exit !($d>=12 && $d<=30)}" || bad "$n: dura $d s (12–30)"
  l=$("$FF" -hide_banner -i "$v" -af ebur128 -f null - 2>&1 | sed -n '/Summary/,$p' | sed -n 's/.*I: *\(-[0-9.]*\) LUFS.*/\1/p' | head -1)
  awk "BEGIN{exit !($l>=-16 && $l<=-13)}" || bad "$n: loudness $l LUFS (−16 a −13)"
  [ -f "$E/reels/$n.jpg" ] || bad "$n: falta la portada"; [ -s "$E/reels/$n.txt" ] || bad "$n: falta el caption"
  echo "OK   $n: ${d} s · $l LUFS"
done
# 2. carruseles (1080×1350) e historias (1080×1920): un PNG por cuadro
"$PY" - "$C" <<'P' || fail=1
import sys, glob, os, re
from PIL import Image
C = sys.argv[1]; bad = 0
for sub, size in (('posts', (1080, 1350)), ('historias', (1080, 1920))):
    for f in sorted(glob.glob(f'{C}/{sub}/*.js')):
        s = open(f, encoding='utf-8').read()
        n = re.search(r"name: '([^']+)'", s).group(1)
        frames = len(re.findall(r'^\s*(?:\.\.\.[A-Z]+\.map\(.*=> )?\(i\) => \[', s, re.M))
        d = f'{C}/entregas/{sub}/{n}'; pngs = sorted(glob.glob(d + '/*.png'))
        if not pngs: print(f'FAIL {n}: sin PNG'); bad = 1; continue
        wrong = [p for p in pngs if Image.open(p).size != size]
        if wrong: print(f'FAIL {n}: medidas distintas de {size}'); bad = 1
        if sub == 'posts' and not os.path.exists(d + '/caption.txt'): print(f'FAIL {n}: falta caption.txt'); bad = 1
        print(f'OK   {n}: {len(pngs)} cuadros')
sys.exit(bad)
P
# 3. reglas de copy (skill focus-identidad §3 y §4) sobre el texto de las piezas y los captions
"$PY" - "$ROOT" "$C" <<'P' || fail=1
import sys, glob, re, json
ROOT, C = sys.argv[1], sys.argv[2]; bad = 0
ev = open(f'{ROOT}/.claude/skills/focus-contenido/references/evidencia.md', encoding='utf-8').read()
handles = set(re.findall(r'@[a-z0-9_\.]+', ev))
emoji = re.compile('[\U0001F300-\U0001FAFF☀-➿]')
for f in glob.glob(f'{C}/*/*.js') + glob.glob(f'{C}/entregas/**/*.txt', recursive=True):
    s = open(f, encoding='utf-8').read()
    # el "antes" genérico rotulado (R06, S02) es la única excepción permitida
    if 'GENERIC' in s or 'Ejemplo genérico' in s or 'const A =' in s: s = re.sub(r'`[^`]*`', '', s)
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S); s = re.sub(r'//[^\n]*', '', s)
    txt = ' '.join(re.findall(r"'([^'\n]*)'", s)) if f.endswith('.js') else s
    probs = []
    if '!' in txt or '¡' in txt: probs.append('signo de exclamación')
    if '—' in txt: probs.append('raya (—)')
    if emoji.search(txt): probs.append('emoji')
    if 'focus-creatives.com' in txt: probs.append('dominio focus-creatives.com (usar focuscreatives.net)')
    for h in set(re.findall(r'@[a-z0-9_\.]+', txt)):
        if h not in handles and h != '@focuscreatives': probs.append(f'{h} no está en evidencia.md')
    for p in probs: print(f'FAIL {f[len(C)+1:]}: {p}'); bad = 1
print('OK   reglas de copy (sin exclamaciones, rayas, emojis ni cuentas sin respaldo)' if not bad else '')
sys.exit(bad)
P
[ -f "$E/resumen.jpg" ] && ok "hoja resumen" || bad "falta entregas/resumen.jpg (./focus campana)"
echo "VERIFY_EXIT $fail"; exit $fail
