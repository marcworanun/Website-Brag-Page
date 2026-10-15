# Brag Page

A one-page personal website for college applications. It's plain HTML and CSS, so it needs no build step or framework.

## Editing

- `index.html` holds all the content. Anything in `[square brackets]` is a placeholder. Replace it with your own details, or delete the whole block if it doesn't apply.
- `styles.css` holds the design. To change the accent colour, edit `--accent` near the top.
- Add a `resume.pdf` file to this folder so the "Download résumé" button works.

To preview it, open `index.html` in any browser.

## Photos

Photo grids, document rows and award rows show small, sharpened display copies from `images/thumbs/`, and open the full photo when clicked. Each of those images is written as `<img src="images/thumbs/NAME.jpg" data-full="images/NAME.jpg" ...>`. After adding or replacing a photo, run `tools/make-thumbs.sh` to make its display copy.

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

