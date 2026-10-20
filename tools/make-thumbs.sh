#!/usr/bin/env bash
# Makes the display copies the page shows in its photo grids, document rows and award rows:
# images/thumbs/NAME.webp for every <img ... data-full="images/NAME.jpg"> in index.html.
# Browsers blur and jag photos when they shrink a big file down to a small tile on the fly,
# so each copy is shrunk here instead (Lanczos, to fit 960x960, which stays sharp on phones
# and Retina screens; 1280x1280 for photos marked data-thumb="1280"), lightly sharpened, and saved as high-quality WebP, which is about half
# the size of a JPEG that looks the same. Photos already 960px or smaller are only converted.
# Clicking a photo on the page still opens the full-size file named in data-full.
#
# Usage: tools/make-thumbs.sh [--all]   (needs ImageMagick; --all remakes every copy)
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p images/thumbs

# Photos marked data-thumb="1280" (the big project sliders) get a 1280px copy instead.
grep -o 'data-full="images/[^"]*"[^>]*' index.html |
  sed -E 's/^data-full="images\/([^"]*)".*data-thumb="([0-9]+)".*/\1 \2/; t; s/^data-full="images\/([^"]*)".*/\1 960/' | sort -k1,1 -k2,2nr | sort -s -u -k1,1 |
while read -r f box; do
  src="images/$f"
  dst="images/thumbs/${f%.*}.webp"
  if [ ! -f "$src" ]; then echo "missing $src" >&2; continue; fi
  if [ "${1:-}" != "--all" ] && [ "$dst" -nt "$src" ] &&
     [ "$(identify -format '%[fx:max(w,h)]' "$dst")" -eq "$(identify -format "%[fx:min(max(w,h),$box)]" "$src[0]")" ]; then continue; fi
  read -r w h < <(identify -format '%w %h\n' "$src[0]")
  if [ "$w" -le "$box" ] && [ "$h" -le "$box" ]; then
    convert "$src" -auto-orient -strip -quality 90 -define webp:use-sharp-yuv=true -define webp:method=6 "$dst"
  else
    convert "$src" -auto-orient -strip -filter Lanczos -resize "${box}x${box}>" -unsharp 0x0.6+0.6+0.01 \
      -quality 86 -define webp:use-sharp-yuv=true -define webp:method=6 "$dst"
  fi
  echo "made $dst"
done
