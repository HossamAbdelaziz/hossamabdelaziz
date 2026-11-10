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

Light only. A dark theme is a later decision, not a default.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#faf8f4` | Page background. Warm off-white, not pure white |
| `--paper-raised` | `#f3efe7` | Quiet panels: facts strip, diagram ground |
| `--ink` | `#1a1714` | Body text and headings. 15.8:1 on paper |
| `--ink-soft` | `#4a433c` | Secondary prose, long captions. 8.6:1 |
| `--ink-faint` | `#7a7169` | Meta, labels, dates. 4.6:1 — never below 13px bold |
| `--rule` | `#ded7cb` | Hairlines between sections and rows |
| `--rule-strong` | `#1a1714` | The 2px rule that opens a major section |
| `--accent` | `#a33b1f` | Links, the active nav item, diagram arrowheads. 6.1:1 |
| `--accent-wash` | `#f0e2dc` | Rare: the one highlighted fact |

One accent only. It is rust, not blue — blue on white is the default
every portfolio reaches for, and rust belongs to printed matter.

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

**No shadows.** Depth comes from the paper tones and hairline rules.
A shadow on this site would be the one thing that gives it away.

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

## Still to decide

- Whether to add a dark theme at all.
- Whether the LinkedIn banner gets re-cut to match this (it is currently
  dark blue-to-teal, from `BANNER_SOURCE.md`) — the two will not look
  like the same hand until it does.
- Reference sites Hossam likes, which could sharpen all of the above.
