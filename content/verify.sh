#!/bin/bash
# verify.sh · oráculo del repo content-focus. exit 0 = el repo está sano.
ROOT="$(cd "$(dirname "$0")" && pwd)"; cd "$ROOT"
fail=0; ok(){ echo "OK   $*"; }; bad(){ echo "FAIL $*"; fail=1; }
# 1. estructura mínima
for f in .focus-root README.md CLAUDE.md AGENTS.md LICENCIAS.md focus setup.sh requirements.txt package.json \
         design-system/README.md design-system/tokens.json design-system/assets/CATALOGO.md design-system/plantillas/engine.js \
         design-system/plantillas/brand.css design-system/plantillas/piece.html design-system/fonts/RotisSemiSansStd-Light.otf \
         design-system/logos/focus-logo-light.png .claude/skills/focus-studio/SKILL.md .claude/skills/focus-contenido/SKILL.md \
         .claude/skills/focus-identidad/SKILL.md .claude/skills/focus-contenido/references/evidencia.md docs/HANDOFF.md; do
  [ -e "$f" ] || bad "falta $f"
done; [ $fail = 0 ] && ok "estructura mínima"
# 2. skills con frontmatter y name = carpeta
n=0; for d in .claude/skills/*/; do s=$(basename "$d")
  [ -f "$d/SKILL.md" ] || { bad "skill $s sin SKILL.md"; continue; }
  nm=$(awk '/^---$/{c++;next} c==1 && /^name:/{sub(/^name:[ ]*/,"");print;exit}' "$d/SKILL.md")
  grep -q '^description:' "$d/SKILL.md" || bad "skill $s sin description"
  [ "$nm" = "$s" ] || bad "skill $s: name '$nm' no coincide con la carpeta"; n=$((n+1))
done; ok "$n skills con frontmatter"
# 3. links relativos de Markdown
bl=$(python3 - <<'P'
import re, os, glob
fs = glob.glob('*.md') + glob.glob('design-system/**/*.md', recursive=True) + glob.glob('.claude/skills/focus-*/**/*.md', recursive=True) + glob.glob('docs/**/*.md', recursive=True) + glob.glob('campanas/**/*.md', recursive=True)
bad = []
for f in fs:
    for m in re.finditer(r'\]\(([^)\s]+)\)', open(f, encoding='utf-8').read()):
        u = m.group(1).split('#')[0]
        if not u or re.match(r'^[a-z]+:', u): continue
        if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(f), u))): bad.append(f'{f} → {u}')
print('\n'.join(bad))
P
); [ -z "$bl" ] && ok "links de Markdown resuelven" || { bad "links rotos:"; echo "$bl" | sed 's/^/     /'; }
# 4. rutas de otra máquina y del repo viejo
ab=$(grep -rIn --exclude-dir=.git --exclude-dir=work --exclude-dir=.venv --exclude-dir=node_modules -E "/Users/[a-z]+|/home/user/|/public/assets/|instagram/produccion" --include=*.js --include=*.mjs --include=*.py --include=*.sh --include=*.css --include=*.html . | grep -v "^./verify.sh:" | head -5)
[ -z "$ab" ] && ok "sin rutas absolutas de otra máquina" || { bad "rutas absolutas:"; echo "$ab" | cut -c1-160 | sed 's/^/     /'; }
# 5. las piezas solo cargan assets que existen
ma=$(grep -rhoE "'/(design-system|work)/[^'\`$]+'" campanas | tr -d "'" | sort -u | while read p; do [ -e ".$p" ] || [[ "$p" == /work/* ]] || echo "$p"; done)
[ -z "$ma" ] && ok "assets referenciados por las piezas existen" || bad "assets faltantes: $ma"
# 6. secretos
sc=$(grep -rIlE --exclude-dir=.git --exclude-dir=.venv --exclude-dir=node_modules --exclude-dir=work "gh[pousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{32,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY" . | head -3)
[ -z "$sc" ] && ok "sin secretos" || bad "posibles secretos en: $sc"
# 7. tamaño
big=$(find . -path ./.git -prune -o -path ./work -prune -o -path ./.venv -prune -o -path ./node_modules -prune -o -type f -size +45M -print | head -3)
[ -z "$big" ] && ok "ningún archivo > 45 MB" || bad "archivos grandes: $big"
# 8. sintaxis de las piezas y del kit
se=$(for f in campanas/*/*/*.js .claude/skills/focus-contenido/templates/*.js design-system/plantillas/engine.js; do node --check "$f" 2>&1 >/dev/null | head -1; done)
[ -z "$se" ] && ok "piezas y motor sin errores de sintaxis" || bad "sintaxis: $se"
echo "VERIFY_EXIT $fail"; exit $fail
