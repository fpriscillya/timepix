# TIMEPIX@school Pre-lab Orientation

## Handover guide for editors

Open any HTML file in a browser and it works. Edit in VS Code or any text editor.

---

## Folder structure

```
timepix-prelab/
├── index.html              Main lesson page (Theory, Detector, Activities)
├── activity-1.html         Worksheet: Background radiation
├── activity-2.html         Worksheet: Everyday materials
├── activity-3.html         Worksheet: Radon balloon
├── activity-4.html         Worksheet: Potassium-40 half-life
├── activity-5.html         Worksheet: Vacuum filter
├── css/
│   ├── styles.css          Shared styles for index.html (palette, nav, cards)
│   └── worksheet.css       Styles for activity worksheets
├── js/
│   └── lesson.js           All interactivity (hero animation, flip cards,
│                           hotspots, penetration diagram, misconceptions)
├── assets/
│   ├── timepix-logo.svg    Logo shown in nav and worksheet top bar
│   ├── minipix.jpg         Photo of the MiniPIX detector (replace placeholder)
│   ├── pixet-screenshot.jpg  Pixet Basic software screenshot (replace placeholder)
│   ├── penetration-diagram.jpg  Shielding diagram (replace placeholder)
│   ├── laptop.png          Pixel art for Activity 1 card
│   ├── banana.png          Pixel art for Activity 2 card
│   ├── balloon.png         Pixel art for Activity 3 card
│   ├── salt.png            Pixel art for Activity 4 card
│   ├── vacuum-cleaner.png  Pixel art for Activity 5 card
│   ├── MiniPIX.png         Decorative image in index.html deco strip
│   ├── paper.png           Decorative image in index.html deco strip
│   ├── pen.png             Decorative image in index.html deco strip
│   ├── pencil.png          Decorative image in index.html deco strip
│   └── rock.png            Decorative image in index.html deco strip
├── README.md               Public-facing description for GitHub
├── LICENSE                 CC BY-SA 4.0
├── .gitignore
└── HANDOVER.md             This file
```

---

## Colour palette

All colours are defined as CSS variables at the top of `css/styles.css`.

| Variable        | Hex       | Used for                                       |
| --------------- | --------- | ---------------------------------------------- |
| `--teal`        | `#1ebcba` | Primary buttons, active states, teal flip card |
| `--coral`       | `#f08081` | Accent, lock buttons, coral flip card front    |
| `--teal-light`  | `#b6e1df` | Tint backgrounds, hover states                 |
| `--coral-light` | `#f4d3d3` | Info panels, prediction backgrounds            |
| `--ink`         | `#1c2b2b` | Body text                                      |
| `--ink-60`      | `#51635f` | Secondary text, captions                       |

To change the palette: edit `:root { }` at the top of `css/styles.css`.
All components inherit from these variables automatically.

---

## Typography

Font loaded from Google Fonts in each HTML `<head>`:

- **Open Sans** for all body text and headings
- **Roboto Mono** for instrument readouts and code-style labels

To change the font: replace the Google Fonts link in each HTML file and
update `--font` and `--mono` in `css/styles.css`.

---

## Where to update text

### index.html

| What                                         | Where to find it in VS Code                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| Hero headline and lead paragraph             | Search `hero__title` and `hero__lead`                                           |
| Theory text (what radiation is)              | Search `id="theory"`                                                            |
| Flip card descriptions                       | Search `flip__sub` and `track-label`                                            |
| X-ray note                                   | Search `xray-note`                                                              |
| Penetration paragraph                        | Search `How far each type`                                                      |
| "It is all around us" card                   | Search `all around us`                                                          |
| Cosmic rays card                             | Search `From space`                                                             |
| Misconceptions (tap-to-reveal)               | Search `misc-item`, each block has a `misc-tag`, `misc-teaser`, and `misc-body` |
| Trigger question at bottom of misconceptions | Search `misc-trigger`                                                           |
| Detector description                         | Search `id="detector"`                                                          |
| Pixet hotspot labels and explanations        | Search `data-title` and `data-body` (6 instances)                               |
| Safety checklist                             | Search `checklist`                                                              |
| Activity preview card text                   | Search `id="activities"`, then each `preview-card` block                        |
| Footer copyright line                        | Search `foot__prov`                                                             |

### activity-1.html to activity-5.html

| What                               | Where to find it                                                     |
| ---------------------------------- | -------------------------------------------------------------------- |
| Page title and subtitle            | Search `sheet__eyebrow`, `h1`, `sheet__sub`                          |
| Prediction questions and options   | Search `pred-opt` (activity 1 and 2) or `iradio` (activities 3 to 5) |
| Observation table rows             | Search `ws-table`                                                    |
| Explanation prompt                 | Search `step__tag--explain`                                          |
| Prediction summary question labels | Search `pred-summary__q` inside the `<script>` block at the bottom   |

---

## How to replace placeholder images

Drop the real file into `assets/` with the exact filename listed above.
The page picks it up automatically on next reload. No code change needed.

For the Pixet Basic screenshot hotspot markers, the six numbered dots sit
at percentage positions over the image. If your screenshot has a different
layout, search `hotspot__dot` in `index.html` and nudge the `left` and
`top` percentages on each button.

---

## How interactivity works (no framework needed)

All interactivity is in `js/lesson.js` and inline `<script>` tags at the
bottom of each activity HTML file.

| Feature                                           | Where                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| Hero pixel animation                              | `lesson.js` — function `heroPixels()`                              |
| Flip cards (particle types)                       | `lesson.js` — `querySelectorAll('.flip')` block                    |
| Pixet hotspots                                    | `lesson.js` — function `hotspots()`                                |
| Misconceptions tap-to-reveal                      | `lesson.js` — `querySelectorAll('.misc-item')` block               |
| Penetration diagram (animated arrows)             | `lesson.js` — function `penCanvas()`                               |
| Nav active-state on scroll                        | `lesson.js` — function `navScroll()`                               |
| Prediction click-to-select (activity 1 and 2)     | Inline `<script>` at bottom of each file                           |
| Drag-and-drop ranking (activity 2)                | Inline `<script>` in `activity-2.html`                             |
| Interactive radio predictions (activities 3 to 5) | Inline `<script>` at bottom of each file                           |
| Prediction summary box                            | Triggered at the end of each lock-in handler in each activity file |

---

## Deployment

Drop the entire `timepix-prelab/` folder onto **Netlify Drop**
(netlify.com/drop) for a fast shareable link.

For a stable URL use **GitHub Pages**: push the folder contents to a repo,
enable Pages from Settings, and the site is live at
`yourname.github.io/repo-name`.

All paths are relative, so the site works the same locally and deployed.

---

## Content provenance

Physics and detector content is adapted from the MEDRA project teacher guide
(C. Cabo, MediPIX/CERN, Universidade de Santiago de Compostela) and the
TIMEPIX@school Student Guide (2026, CC BY-SA 4.0).

Before any classroom release: verify Timepix-specific detector behaviour
and shielding material details with the CERN coordination team.
