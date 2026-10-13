#!/usr/bin/env bash
# Builds a zip for Netlify Drop (app.netlify.com/drop): index.html, styles.css and
# smaller copies of the photos the page uses. The full-size originals stay in images/.
#
# Usage: tools/build-netlify.sh [output.zip]   (needs ImageMagick and zip or python3)
set -euo pipefail

cd "$(dirname "$0")/.."
out="$(realpath -m "${1:-netlify-site.zip}")"
build="$(mktemp -d)"
trap 'rm -rf "$build"' EXIT

mkdir -p "$build/images"
cp index.html styles.css "$build/"

# Only photos the page actually shows. Certificates stay sharper so they're readable when opened.
grep -o 'src="images/[^"]*"' index.html | sed 's/^src="images\///; s/"$//' | sort -u |
while read -r f; do
  [ -f "images/$f" ] || continue
  case "$f" in
    award-*) size=1700x1700; quality=82 ;;
    *)       size=1200x1200; quality=72 ;;
  esac
  convert "images/$f" -auto-orient -strip -resize "${size}>" \
    -sampling-factor 4:2:0 -interlace JPEG -quality "$quality" "$build/images/$f"
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

echo "Built $out ($(ls "$build/images" | wc -l) photos)"
