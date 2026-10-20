# Site plan

Notes for the site, so they survive between sessions. The current `index.html` is built from these notes and the files in `content/`.

## Structure and style

Same structure and overall feel as the reference site (sirinda.net), but with **blue, white and green** colours.

Sections, in order:

1. **About Me**: intro and photo
2. **Projects**: one full-width colour band per project, each with title, role, description, proof buttons (website / paper), photo grid, awards and partners
3. **Internship**: Finansia Syrus Securities (see `content/internship.md`), one band with a photo and the certificate side by side
4. **Extracurriculars**: same band layout, shorter entries
5. **Awards & Recognition**: each award next to a photo of the certificate or medal, plus a Media Coverage list

Style, matched closely to the reference:

- Header: name in green capitals, five tabs underneath (on phones, Extracurriculars shows as "Activities" so all five fit) with a thin dark line above each (thick line on the current tab), off-white background.
- About Me: coloured box, "Hi! I'm" on the left, name in large regular-weight type, nickname in italics aligned right, photo on the right.
- Banners: soft blurred gradient strip (blue and green here) with the section title in white.
- Project and activity bands: solid pastel colour per entry, title in large regular-weight type, role in italics, centred description, 4-across photo grid (215×161; each main project shows exactly 4 photos, one row), then a left-aligned "Awards:" list with bold competition names. Space for dark rectangular "Learn More" buttons when links are available.
- Partners: under a project's "Awards:" list, a "Partners:" label and a row of logos (with a "Sponsors:" group beside it when a project has sponsors, e.g. RBS Group for LunarLift) (84px tall, 64px on phones), no tiles: round logos are masked to circles and the rest have see-through backgrounds, like the reference.
- Proof documents: an acceptance letter or patent goes in its own row between the description and the photos, uncropped (240px tall) with an italic caption, like the reference's Perilla Guard "Petty Patent". Embrace Gloves shows the IEOM acceptance letter.
- Project logos: a project's own logo sits centred under its description, above the photos (120px tall, 96px on phones), like the reference. Ecoscope has its leaf emblem; Embrace Gloves has the Embracing Eczema logo (option 2 from `brand/embracing-eczema/`: a pink and a blue glove forming a heart, with the name underneath, 130px tall, 104px on phones).
- Extracurriculars are paired side by side, two per band, like the reference's Student Council/Ambassadors and Tennis/Music bands: Club + House Captain, then Varsity Football + Form Representative. Each has a 2-across photo grid. No divider lines between bands; on phones the pairs stack.
- Awards: one band with an "Awards" heading, grouped by project; each award has text on one side and its photo on the other (max 240px tall, never cropped; awards with several photos show them in a small grid), alternating sides, rows packed tightly with about 16px between awards.
- Photo quality: grids, document rows and award rows show sharpened WebP display copies from `images/thumbs/` (made by `tools/make-thumbs.sh`, Lanczos-resized to fit 960×960) and open the full photo on click. The Netlify zip copies images as they are, never re-saving them.
- Footer: thin bar, "© year Name. All rights reserved."
- Fonts: Poppins ExtraLight for body (same as the reference). Headings use Questrial, the closest free match to the reference's Wix-only "Aether" font.
- Media Coverage section: add when Marc has articles or posts to list.

## Intro (About Me)

Full name: **Woranun Atikarnbodee**, nickname **Marc**. Header shows WORANUN (MARC) ATIKARNBODEE.

How Marc wants to be introduced, kept broad:

- Aspiring researcher
- Owner of a sustainable clothing brand
- Environmentalist
- Economist working to make effective healthcare products more accessible
- Invents healthcare solutions that cost less than what's on the market

Draft:

> Hi! I'm
> **Woranun Atikarnbodee**
> *(but everyone calls me Marc)*
>
> **Everything I build comes back to one goal: making healthcare more affordable and the way we live more sustainable.**
>
> I am a senior at Shrewsbury International School Bangkok, an aspiring researcher, a sustainable clothing brand owner, an environmentalist and a budding economist, and I'm still adding to that list...
>
> I design healthcare products that work as well as what's on the market for a fraction of the price, I make them from waste wherever I can, and I use economics to help communities earn more from what they make. This page walks you through what I've built so far. Enjoy!

The first line is the theme that ties every project together (affordable healthcare: LunarLift, Embrace Gloves; sustainability: Ecoscope, Embrace Gloves' recycled bottles and banana-pseudostem nanoparticles; economics for communities: Baan Panya), stated straight under the name the way another student's brag page (punpun2747.wixsite.com/mysite) states its food-security theme.
>
> [Personal touch, e.g. a hobby or a playlist link]

Intro photo: `images/marc-portrait.jpg` (Marc in the lab holding treated glove fabric; a near-identical shot is first in the Embrace Gloves grid).

## Still needed from Marc

- ~~Colour preferences~~ blue, white and green (built)
- Project details (name, dates, role, what it does, results/numbers, links). Done so far: LunarLift, Embrace Gloves, Baan Panya, Ecoscope, see `content/projects.md`
- ~~Clothing brand name and details~~ Ecoscope, see `content/projects.md`
- ~~Extracurriculars~~ see `content/extracurriculars.md` (years and photos still needed)
- ~~Awards~~ see `content/awards.md` (years and photos still needed)
- Photos (upload to the repo; say which photo goes with which project)
