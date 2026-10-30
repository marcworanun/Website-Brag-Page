# Site plan

Notes for the site, so they survive between sessions. The current `index.html` is built from these notes and the files in `content/`.

## Structure and style

Same structure and overall feel as the reference site (sirinda.net), but with **blue, white and green** colours.

Sections, in order:

1. **About Me**: intro and photo
2. **Projects**: one full-width colour band per project, each with title, role, description, proof buttons (website / paper), photo grid, awards and partners
3. **Internship**: Finansia Syrus Securities (see `content/internship.md`), one band with a photo and the certificate side by side. On the Cornell site (`cornell.html`) this is **Work Experience**: The Salil Hotel, Vince Hotel Pratunam, then Finansia Syrus (see `content/work-experience.md`)
4. **Extracurriculars**: same band layout, shorter entries
5. **Awards & Recognition**: each award next to a photo of the certificate or medal, plus a Media Coverage list

Style, matched closely to the reference:

- Header: name in green capitals, five tabs underneath (on the Cornell site, Work Experience comes before Projects, in the tabs and on the page) (on phones, Extracurriculars shows as "Activities" so all five fit) with a thin dark line above each (thick line on the current tab), off-white background.
- About Me: coloured box with the name in large type on the left, one identity sentence under it, photo on the right, then a strip of four photos across the page (see Intro below).
- Banners: soft blurred gradient strip (blue and green here) with the section title in white.
- Project and activity bands: solid pastel colour per entry, title in large regular-weight type, role in italics, centred description, a photo slider for the four main projects (4 photos each, up to 420px tall and never cropped; arrows and dots roll each photo into the centre with its neighbours peeking in, and phones can swipe, like the galleries on punpun2747.wixsite.com/mysite; an italic caption under the slider names what each photo shows, where Marc has given descriptions: all four projects and the Salil Hotel), a 2-across photo grid for activities, then a left-aligned "Awards:" list with bold competition names. Dark rectangular "Learn More" buttons under the description when a project has a website (Ecoscope so far).
- Partners: under a project's "Awards:" list, a "Partners:" label and a row of logos (with a "Sponsors:" group beside it when a project has sponsors, e.g. RBS Group for LunarLift) (84px tall, 64px on phones), no tiles: round logos are masked to circles and the rest have see-through backgrounds, like the reference.
- Proof documents: an acceptance letter or patent goes in its own row between the description and the photos, uncropped (240px tall) with an italic caption, like the reference's Perilla Guard "Petty Patent". Embrace Gloves shows the IEOM acceptance letter.
- Project logos: a project's own logo sits centred under its description, above the photos (120px tall, 96px on phones), like the reference. Ecoscope has its leaf emblem; Embrace Gloves has the Embracing Eczema logo (option 2 from `brand/embracing-eczema/`: a pink and a blue glove forming a heart, with the name underneath, 130px tall, 104px on phones).
- Extracurriculars are paired side by side, two per band, like the reference's Student Council/Ambassadors and Tennis/Music bands: Club + House Captain, then Varsity Football + Form Representative. Each has a 2-across photo grid. No divider lines between bands; on phones the pairs stack.
- Awards: one band with an "Awards" heading, grouped by project; each award has text on one side and its photo on the other (max 240px tall, never cropped; awards with several photos show them in a small grid), alternating sides, rows packed tightly with about 16px between awards.
- Photo quality: grids, document rows and award rows show sharpened WebP display copies from `images/thumbs/` (made by `tools/make-thumbs.sh`, Lanczos-resized to fit 960×960) and open the full photo on click. The Netlify zip copies images as they are, never re-saving them.
- Footer: thin bar, "© year Name. All rights reserved."
- Fonts: Poppins Light (300) for body text and Poppins Regular (400) for descriptions, since 30 Oct 2026; the reference's ExtraLight (200) was hard to read on the coloured bands. Headings use Questrial, the closest free match to the reference's Wix-only "Aether" font.
- Media Coverage section: add when Marc has articles or posts to list.

## Intro (About Me)

Full name: **Woranun Atikarnbodee**, nickname **Marc**. Header shows WORANUN (MARC) ATIKARNBODEE.

Since 30 Oct 2026 the home screen follows the other reference site, punpun2747.wixsite.com/mysite: a box with the name on the left ("Woranun (Marc) Atikarnbodee", Marc in green), one identity sentence of about 14 words (the same length as that site's "I am a 17-year-old Food Security Activist, Ambitious Researcher, Entrepreneur, and Innovator."), the portrait on the right, then a full-width strip of four photos. Photos in the strip open full size on click.

- **Main site** (`index.html`): "Hi! I'm Marc, a Bangkok-based affordable-healthcare inventor, researcher, sustainable clothing entrepreneur and budding economist. I love making good care something everyone can afford. Welcome!" (Marc asked for more enthusiasm, 30 Oct 2026; before: "I am a Bangkok-based affordable-healthcare inventor, researcher, sustainable clothing entrepreneur and budding economist.") Strip: LunarLift trial, WICO booth, Baan Panya workshop, Ecoscope Travel Bingo stall.
- **Cornell site** (`cornell/intro.html`, `cornell/intro-strip.html`): "Hi! I'm Marc, a Bangkok-based aspiring hotelier, affordable-healthcare inventor, sustainable clothing entrepreneur and budding economist. I love making people feel cared for, from hospital wards to hotel lobbies. Welcome!" Strip: Bumrungrad VitalLife talks, Salil front desk, WICO booth, Ecoscope Travel Bingo stall.

Earlier versions (kept for essays): the Pammy-style intro, "Hi! I'm / Woranun Atikarnbodee / (but everyone calls me Marc)", with a theme line, "Everything I build comes back to one goal: making healthcare more affordable and the way we live more sustainable." (Cornell: "Everything I do comes back to one goal: making wellbeing more affordable and sustainable, from hospital wards to hotel dining rooms."), then "I am a senior at Shrewsbury International School Bangkok, a researcher, a sustainable clothing brand owner and a budding economist." and "I design healthcare products that work as well as what's on the market for a fraction of the price, make them from waste where I can, and use economics to help communities earn more. Here is what I've built so far. Enjoy!" (Cornell added: "At two Bangkok hotels, I brought the same idea to hospitality: a wellness programme and healthier dining.")

Intro photo: `images/marc-portrait.jpg` (Marc in the lab holding treated glove fabric).

## Still needed from Marc

- ~~Colour preferences~~ blue, white and green (built)
- Project details (name, dates, role, what it does, results/numbers, links). Done so far: LunarLift, Embrace Gloves, Baan Panya, Ecoscope, see `content/projects.md`
- ~~Clothing brand name and details~~ Ecoscope, see `content/projects.md`
- ~~Extracurriculars~~ see `content/extracurriculars.md` (years and photos still needed)
- ~~Awards~~ see `content/awards.md` (years and photos still needed)
- Photos (upload to the repo; say which photo goes with which project)
