#!/usr/bin/env bash
# Builds a zip for Netlify Drop (app.netlify.com/drop): one page (saved in the zip as
# index.html), styles.css and the images that page uses, copied as they are. Photos are never
# re-saved here, because every extra JPEG save makes them blurrier. It first rebuilds
# cornell.html (tools/build-cornell.py) and the display copies in images/thumbs
# (tools/make-thumbs.sh).
#
# Usage: tools/build-netlify.sh [output.zip] [page.html]   (needs ImageMagick and zip or python3)
#   tools/build-netlify.sh                                     main site  -> netlify-site.zip
#   tools/build-netlify.sh netlify-cornell.zip cornell.html    Cornell site
set -euo pipefail

cd "$(dirname "$0")/.."
out="$(realpath -m "${1:-netlify-site.zip}")"
build="$(mktemp -d)"
trap 'rm -rf "$build"' EXIT

page="${2:-index.html}"
python3 tools/build-cornell.py >/dev/null
[ -f "$page" ] || { echo "No such page: $page" >&2; exit 1; }
tools/make-thumbs.sh >/dev/null
mkdir -p "$build/images"
cp "$page" "$build/index.html"
cp styles.css "$build/"

# Only images the page actually uses: what it shows (src) and what opens on click (data-full).
grep -oE '(src|data-full)="images/[^"]*"' "$page" | sed -E 's/^(src|data-full)="images\///; s/"$//' | sort -u |
while read -r f; do
  [ -f "images/$f" ] || continue
  mkdir -p "$build/images/$(dirname "$f")"
  cp "images/$f" "$build/images/$f"
done

rm -f "$out"
if command -v zip >/dev/null; then
  (cd "$build" && zip -qr -X "$out" index.html styles.css images)
else
  python3 - "$build" "$out" <<'EOF'
import os, sys, zipfile
root, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for dirpath, _, files in os.walk(root):
        for name in files:
            path = os.path.join(dirpath, name)
            z.write(path, os.path.relpath(path, root))
EOF
fi

echo "Built $out from $page ($(find "$build/images" -type f | wc -l) images, $(du -sh "$out" | cut -f1))"
