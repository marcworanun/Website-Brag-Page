#!/usr/bin/env bash
# Builds a zip for Netlify Drop (app.netlify.com/drop): index.html, styles.css and the
# images the page uses, copied as they are. Photos are never re-saved here, because every
# extra JPEG save makes them blurrier. The small display copies in images/thumbs come from
# tools/make-thumbs.sh, which this runs first.
#
# Usage: tools/build-netlify.sh [output.zip]   (needs ImageMagick and zip or python3)
set -euo pipefail

cd "$(dirname "$0")/.."
out="$(realpath -m "${1:-netlify-site.zip}")"
build="$(mktemp -d)"
trap 'rm -rf "$build"' EXIT

tools/make-thumbs.sh >/dev/null
mkdir -p "$build/images"
cp index.html styles.css "$build/"

# Only images the page actually uses: what it shows (src) and what opens on click (data-full).
grep -oE '(src|data-full)="images/[^"]*"' index.html | sed -E 's/^(src|data-full)="images\///; s/"$//' | sort -u |
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

echo "Built $out ($(find "$build/images" -type f | wc -l) images, $(du -sh "$out" | cut -f1))"
