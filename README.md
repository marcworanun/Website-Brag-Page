# Brag Page

A one-page personal website for college applications. It's plain HTML and CSS, so it needs no build step or framework.

## Editing

- `index.html` holds all the content. Anything in `[square brackets]` is a placeholder. Replace it with your own details, or delete the whole block if it doesn't apply.
- `styles.css` holds the design. To change the accent colour, edit `--accent` near the top.
- Add a `resume.pdf` file to this folder so the "Download résumé" button works.

To preview it, open `index.html` in any browser.

## Photos

Photo grids, document rows and award rows show small, sharpened WebP display copies from `images/thumbs/`, and open the full photo when clicked. Each of those images is written as `<img src="images/thumbs/NAME.webp" data-full="images/NAME.jpg" ...>`. Photos in the big project sliders also carry `data-thumb="1280"` (a larger display copy) and their `width` and `height`, so the slider can lay them out before they load. After adding or replacing a photo, run `tools/make-thumbs.sh` to make its display copy.

## Ecoscope site

`ecoscope/` is a copy of the Ecoscope clothing site (ecoscopeclothing.netlify.app): six pages (`index.html`, `about.html`, `initiatives.html`, `team.html`, `lookbook.html`, `order.html`) with their CSS, JavaScript and images in `assets/`. It matches the live site exactly, apart from the "Powered by Netlify" badge, which Netlify adds itself.

`wild-threads.html` is a new page, not yet on the live site: four pieces, each made for an endangered animal (Indian elephant, Przewalski's horse, Siamese crocodile and Sunda pangolin), with the animal's photo, the piece's photo, its IUCN Red List status and a description of no more than 100 words. Their photos are in `assets/img/wild/`.

`popups.html` is also new: Ecoscope's pop-up stores, with its numbers so far, where it has sold, a photo gallery (photos in `assets/img/popups/`) and partner logos (`assets/img/partners/`). The pop-up photos and logos are copies of the ones in this repo's `images/` folder. To mark an animal's status, add `aria-current="true"` to its category in the `redlist` scale (for example `<li aria-current="true"><abbr title="Endangered">EN</abbr></li>`).

The menu links are written like `/about`, which Netlify turns into `about.html`. They work once the folder is on Netlify, but not when you open the files straight from your computer. To update the live site, drag the `ecoscope` folder onto the site's **Deploys** page in Netlify.

## Publishing it free with GitHub Pages

1. Push to the `main` branch.
2. On GitHub, go to **Settings → Pages**.
3. Under "Source", choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. After a minute the site is live at `https://<your-username>.github.io/Website-Brag-Page/`.

You can paste that link into the Common App's Additional Information section or an activity description.

## Publishing with Netlify

1. Run `tools/build-netlify.sh` (needs ImageMagick). It makes `netlify-site.zip` with the page and its images, copied as they are so they never lose quality.
2. Drag the zip onto [app.netlify.com/drop](https://app.netlify.com/drop). If it won't take a zip, unzip it and drag the folder.
3. To update the site later, build a new zip and drag it onto the site's **Deploys** page in Netlify. The link stays the same.

