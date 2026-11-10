# hossamabdelaziz.com — design system

Direction chosen 2026-11-10. Every page follows this. Values live as CSS
variables in `src/app/globals.css`; pages use the names, never raw values.

> Kept in `docs/` rather than the repo root: `README.md` at the root is
> Hossam's GitHub profile README and is not touched.

---

## The direction: editorial

The site's job is to get recruiters to **read** — three or four long case
studies are the whole argument, because the code behind them is private
and can't be shown.

So the design is built for reading, not for impressing at a glance: warm
paper, a serif set at a comfortable measure, hairline rules instead of
cards, and no decoration that doesn't earn its place. It should feel like
a well-set magazine piece or a good technical journal.

**Deliberately avoided**, because they are what generated sites look
like: dark page with a blue-to-teal glow, gradient text, glassmorphism,
rounded cards in a three-up grid, drop shadows for depth, emoji as icons,
and animated reveals on scroll.

**Honest note:** this direction comes from the project, the brief and
typographic convention. The UXKIN library of real sites is not connected
in this session, so it is not derived from examples of real sites.

---

## Colour

**Dark and warm** (changed 2026-11-10 — the first light version read as too
bright beside the dark rail). Two tones of dark carry the split: the rail is
the deepest, content sits a step lighter.

| Token | Value | Role |
|---|---|---|
Settled on deep blue ink, after a light paper, two warm darks and a slate
green. Blue is the obvious choice for a developer site, which is why it
needed the other three accents to not read as the default.

| `--rail` | `#1d2838` | The fixed identity column, and diagram node fills |
| `--paper` | `#283546` | Page background for content |
| `--paper-raised` | `#323f50` | Quiet panels: facts strip, diagram ground |
| `--ink` | `#f4f6f9` | Headings and emphasis. 11.5:1 |
| `--ink-soft` | `#dde3ea` | Body prose. 9.6:1 |
| `--ink-faint` | `#aeb6c2` | Meta, labels, dates. 6.1:1 |
| `--rule` | `#3c4a5c` | Hairlines between sections and rows |
| `--rule-strong` | `#7a8798` | Diagram arrows, the bar above a section label |
| `--accent` | `#f59d77` | Rust. Links and the active nav item only. 5.1:1 |
| `--accent-light` | `#fbb595` | Hover |
| `--accent-2` | `#8ccfbc` | Teal. Structure: diagram arrowheads, state arrows, fact markers, actor names. 6.0:1 |
| `--accent-3` | `#f0cd93` | Sand. Data: step numbers, the role line in the rail. 7.1:1 |

Three, each with one job, so the page has life without becoming a parade:

- **Rust** is interaction. If it is rust, it is a link. Nothing else is.
- **Teal** is structure — arrowheads, the markers in a facts strip, the
  names of the people in an actors diagram.
- **Sand** is data — the numbers down the side of a sequence, the role line
  under the name.

The section bar runs rust into teal, which is the only gradient anywhere.

Rust, teal and sand on blue — rather than the blue-on-blue every generated
portfolio ends up with.

No success/warning/error colours: the site has no forms and no states.
Project status is set in type, not colour.

---

## Typography

Three families, each with a job. All self-hosted via `@fontsource`, so
nothing is fetched from Google at runtime.

| Family | Used for |
|---|---|
| **Source Serif 4** | Headlines and long-form prose. Designed for screen reading at length |
| **IBM Plex Sans** | Navigation, buttons, facts, anything that is interface rather than prose |
| **IBM Plex Mono** | Small uppercase labels, dates, stack names, diagram text |

Serif for what is read, sans for what is used, mono for what is data.
The mono labels are what keep it from reading as a lifestyle blog.

### Scale

| Token | Size / line-height | Family | Use |
|---|---|---|---|
| `display` | 54px / 1.05 | serif | Home page name |
| `h1` | 42px / 1.1 | serif | Case study title |
| `h2` | 29px / 1.2 | serif | Section headings |
| `h3` | 20px / 1.35 | serif | Architecture note titles |
| `prose` | 19px / 1.65 | serif | Case study body |
| `body` | 17px / 1.6 | sans | Home page body, UI text |
| `small` | 15px / 1.5 | sans | Captions, secondary |
| `label` | 12px / 1.4, +0.1em, uppercase | mono | Section labels, dates, stack |

Mobile: `display` 38px, `h1` 32px, `h2` 24px, `prose` 18px.

Weights: 400 and 600 only. No 300, no 800.

**Measure: 68 characters** for prose. This is the single most important
number on the page — the whole direction fails if the lines are too long.

---

## Spacing and layout

4px base: `4 8 12 16 24 32 48 64 96 128`.

| Token | Value | Use |
|---|---|---|
| `--w-page` | 1080px | Outer bound, home page |
| `--w-read` | 680px | Reading column — all prose, all case-study sections |
| `--w-wide` | 880px | Diagram and full-width images, breaking out of the column |
| `--gutter` | 24px / 20px mobile | Side padding |
| `--section` | 96px / 64px mobile | Space between major sections |

One column. Nothing is centred except the page itself — text is
left-aligned, always.

---

## Shape and depth

**Radius: 0** for everything structural. 2px on images and the portrait.

## Texture

The flat field of colour was the thing that still looked unfinished, so
there are two textures, both generated by the browser with nothing to
download:

- **Grain** over the whole page: an SVG fractal-noise filter at 5% opacity,
  fixed to the viewport. It is meant to be felt rather than seen.
- **A hairline grid** behind the rail only, at 3% white on a 48px pitch,
  masked so it fades out down the column.

Nothing else moves or decorates. No glow, no gradient mesh.

## Shape and depth

**Radius: 0** for everything structural. 2px on images and the portrait.

**No shadows**, with one exception: the phone screenshot layered over a
web screenshot needs one to separate the two. Everywhere else depth comes
from the two dark tones and hairline rules.

Separation:
- `1px solid var(--rule)` between rows and sections
- `2px solid var(--rule-strong)`, 64px wide, above a major section label
- `--paper-raised` for the facts strip and the diagram ground

---

## Components

**Links in prose** — `--accent`, underlined, `text-underline-offset: 3px`,
`text-decoration-thickness: 1px`, thickening to 2px on hover.

**Primary button** — `--ink` background, `--paper` text, 2px radius,
14px/10px padding, sans 15px 600. Hover: `--accent` background.

**Secondary button** — transparent, `1px solid --ink`, `--ink` text.
Hover: `--paper-raised` fill.

**Quiet link** — sans 15px, `--ink-soft`, underline on hover only.

**Focus** — `2px solid --accent`, 3px offset, on every interactive
element. Never removed.

**Project row** (replaces the card) — a full-width row separated by a
hairline. Serif `h2` name, prose tagline, a mono meta line of date ·
status · stack. The whole row is the link; the name underlines on hover.
No border, no fill, no arrow icon.

**Section label** — mono `label` in `--ink-faint`, above a 2px
`--rule-strong` bar, 64px wide.

**Facts strip** — `--paper-raised`, two columns, mono numbers where
there are numbers, sans text. No icons, no bullets — a hairline between
rows.

**Navigation** — name on the left in serif 600; three sans links on the
right. A hairline under the bar. Sticky, paper background, no blur.

**Footer** — hairline rule, one line of mono `label`.

---

## Imagery

**Portrait** — 2px radius, no border, no ring. On the home page it sits
in the text column, not floated beside it.

**Screenshots and photos** — full `--w-wide`, `1px solid var(--rule)`,
2px radius, with a mono caption beneath in `--ink-faint`.

**Diagram** — drawn on `--paper-raised`. Boxes are 1px `--rule` outlines
with no fill; labels in mono; arrows 1px `--ink-faint` with `--accent`
arrowheads. The flow list beneath uses mono for the node names and sans
for the description.

**Icons** — react-icons, used only in the contact list and for external
links. Nowhere else. `--ink-faint`, matching the text size. Never
decorative, never coloured.

---

## Layout: the split

Both the home page and every case study use `SplitLayout`: a fixed rail on
the left (42%, max 560px, full viewport height, `--rail` background) beside
a scrolling content column.

- **Home rail:** portrait, name, the co-op line, and section nav.
- **Case study rail:** back link, project name, tagline, dates, links, and a
  table of contents built only from the sections that actually have content.

Both navs highlight the section in view. Below 1024px the rail becomes a
normal block at the top of the page and the nav is hidden — the content is
short enough to scroll.

## Motion

Only one animated thing: the system diagram assembles as it scrolls into
view, columns first, then the arrows. It falls back to fully visible when
scripting is off or `prefers-reduced-motion` is set, and the written flow
list beneath it is never hidden, because it is content, not decoration.

## Mobile

Below 640px the diagram's SVG is replaced by a stacked list of the same
pieces, grouped by column. A 660px-wide drawing that scrolls sideways is
worse on a phone than no drawing at all.

Checked for horizontal overflow at 375, 768, 1024 and 1440.

## Still to decide
- Whether the LinkedIn banner gets re-cut to match this (it is currently
  dark blue-to-teal, from `BANNER_SOURCE.md`) — the two will not look
  like the same hand until it does.
- Reference sites Hossam likes, which could sharpen all of the above.
