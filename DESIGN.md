---
name: 10x Studio
description: The drawing set. A senior build partner's site, laid out like the technical drawings for a serious build.
colors:
  bone: "oklch(96% 0.01 85)"
  bone-deep: "oklch(92.5% 0.012 85)"
  sheet: "oklch(98.5% 0.006 85)"
  graphite: "oklch(23% 0.012 250)"
  graphite-soft: "oklch(42% 0.012 250)"
  rule: "oklch(23% 0.012 250 / 0.14)"
  grid-line: "oklch(23% 0.012 250 / 0.06)"
  highlighter: "oklch(90% 0.17 115)"
  error: "oklch(50% 0.19 28)"
typography:
  display:
    fontFamily: "Funnel Display, sans-serif"
    fontSize: "clamp(42px, 5.4vw, 82px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Funnel Display, sans-serif"
    fontSize: "clamp(34px, 4vw, 58px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Funnel Display, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Funnel Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Martian Mono, monospace"
    fontSize: "11.5px"
    fontWeight: 400
    letterSpacing: "0.02em"
rounded:
  none: "0px"
spacing:
  section: "clamp(80px, 10vw, 140px)"
  gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.highlighter}"
    textColor: "{colors.graphite}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
---

# Design System: 10x Studio

## 1. Overview

**Creative North Star: "The Drawing Set"**

Every page reads like a sheet from the drawing set for a serious build: a visible 12-column grid, hairline rules, numbered parts in the margin, a title block, and diagrams that show how information moves. The confidence comes from precision, not decoration. A cautious buyer signing off on a six-figure platform should feel they are looking at an engineer's plans, not a pitch deck.

The system is near-monochrome graphite on warm bone paper, with one highlighter color reserved for the phrase that matters on each screen. Structure is carried by lines, not boxes: rules, tables and grids instead of shadows and rounded cards.

It replaces the previous Bauhaus identity (primary colors, hard ink borders, offset block shadows, circle-in-square motif), which read as a neo-brutalist template and felt toy-like for large engagements.

**Key Characteristics:**
- Visible structure: the drafting grid, hairline rules, a title block on the hero.
- One highlighter, used like a marker on a printout.
- Diagrams and tables over illustrations and icon cards.
- Square corners everywhere. No shadows.
- Motion only where it explains a system (packets moving along a diagram).

## 2. Colors: Graphite on Bone

Restrained strategy: tinted neutrals carry 95% of every surface; the highlighter is the only accent.

### Primary
- **Highlighter** (oklch(90% 0.17 115)): a yellow-green marker. Used as a text highlight (`<mark>`) on the one phrase per screen that carries the argument, the hovered state of primary buttons, the "hot" node in a diagram, and the primary button on graphite fields. Never a background for a whole section.

### Neutral
- **Bone** (oklch(96% 0.01 85)): the page.
- **Bone Deep** (oklch(92.5% 0.012 85)): row hover, sunken surfaces, the guide answer box.
- **Sheet** (oklch(98.5% 0.006 85)): form fields and the occasional panel that must lift off the page.
- **Graphite** (oklch(23% 0.012 250)): headings, body text on emphasis, rules, buttons, the inverse CTA and footer fields.
- **Graphite Soft** (oklch(42% 0.012 250)): body copy, dimension labels, secondary text. 7.5:1 on bone.
- **Rule** (graphite at 14%): row dividers inside tables and lists.
- **Grid Line** (graphite at 6%): the drafting grid behind heroes.
- **Error** (oklch(50% 0.19 28)): form errors only. 5.3:1 on bone.

### Named Rules
**The One Marker Rule.** One highlighted phrase per viewport. If two things are highlighted, neither is.

**The No Primaries Rule.** No blue, red or yellow blocks. The old Bauhaus palette is retired, including in inline styles.

## 3. Typography

**Display Font:** Funnel Display (fallback: sans-serif)
**Body Font:** Funnel Sans (fallback: sans-serif)
**Label Font:** Martian Mono (fallback: monospace)

One committed family with real weight contrast (800 headlines against 400 body), plus a mono used strictly for dimension-style labels: dates, file types, title-block fields, table headers.

### Hierarchy
- **Display** (800, clamp(42px, 5.4vw, 82px), 1.04, -0.04em): page heroes only.
- **Headline** (800, clamp(34px, 4vw, 58px), 0.98, -0.035em): section headings, max 18ch.
- **Title** (600, 22px, 1.15, -0.02em): table first columns, list items, card titles.
- **Body** (400, 17px, 1.6): running text, capped at 65ch for prose.
- **Label** (Martian Mono 400, 11.5px, 0.02em): dimension labels, metadata, table headers. Sentence case, never tracked-out uppercase as section grammar.

### Named Rules
**The Label Is Not a Kicker Rule.** No eyebrow labels above section headings. Sections are identified by the part number in the margin column, which is a deliberate system, not decoration.

## 4. Elevation

Flat. No box-shadows anywhere. Depth is conveyed by lines (1px graphite rules and borders), tonal shifts (bone to bone-deep on hover), and inversion (graphite fields for the CTA and footer).

**The Flat Sheet Rule.** If you reach for a shadow, draw a rule instead.

## 5. Components

### Buttons
- **Shape:** square (0px), 1px graphite border.
- **Primary:** graphite fill, bone text, Funnel Sans 600 16px, padding 14px 22px, trailing arrow.
- **Hover / Focus:** fill switches to highlighter with graphite text (200ms). Focus is a 2px graphite outline offset 4px.
- **Line:** transparent fill, graphite text and border; hover fills highlighter.
- **On graphite fields:** highlighter fill, graphite text; hover switches to bone.

### Tables and lists (the workhorse container)
- Graphite 1px rule on top, rule-colored dividers between rows, label-font column headers.
- Rows hover to bone-deep. First column in Title type.
- Collapse to stacked rows below 980px.

### Sheets (case-study and article panels)
- 1px graphite border, square, no fill change. Illustrations sit on bone with `mix-blend-mode: multiply`.
- Metadata in the label font above the title.

### Inputs / Fields
- **Style:** sheet fill, 1px graphite border, square, 14px 16px padding, Funnel Sans 16px.
- **Focus:** 2px graphite outline, offset 2px; border unchanged.
- **Error:** error-colored border and message text below the field.

### Navigation
- Wordmark "**10x** Studio" (800 + 400 Funnel Display). Links in Funnel Sans 500 15px; hover and active get a 1px underline offset 5px. A 1px graphite rule closes the bar. Sticky on bone. Below 980px the links collapse into a native `<details>` menu.

### Title Block (signature)
A bordered strip under the hero, split into cells: drawing name, studio, location, ownership. Label font for field names, Funnel Sans 600 for values.

### System Diagram (signature)
Inline SVG. Nodes are square, bone-filled, 1.2px graphite stroke; the node doing the work is highlighter-filled. Messy inputs use dashed wires; routed outputs use solid wires. Small graphite packets travel the wires (SMIL), paused under reduced motion.

## 6. Do's and Don'ts

### Do:
- **Do** let the grid show: drafting lines behind heroes, part numbers in the margin column.
- **Do** prove claims with tables, diagrams and real case studies.
- **Do** keep one highlighted phrase per screen.
- **Do** keep every animation behind `prefers-reduced-motion` and keep content complete without JavaScript.
- **Do** hold AA contrast: graphite-soft (7.5:1) is the lightest text allowed on bone.

### Don't:
- **Don't** bring back the Bauhaus look: no primary-color blocks, no hard offset block shadows, no circle-in-square motif. It reads as a neo-brutalist template.
- **Don't** build generic SaaS layouts: centered hero, gradient blobs, icon-title-text card grids, hero-metric stat bands.
- **Don't** use dev-shop tropes: stock photos of people pointing at laptops, client logo walls.
- **Don't** use dark mode plus neon, tech-stack badge walls, dashboard mockups with fake charts, glassmorphism, or sparkles for "AI".
- **Don't** round corners or add shadows.
- **Don't** put tracked uppercase eyebrow labels above headings.
- **Don't** use em dashes in copy.
