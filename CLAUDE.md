# 10x Studio — site context for Claude

This file is the onboarding brief for any future Claude session working in this repo.
Read it before doing anything else. The goal: get to "useful change" in the
first response without rediscovering the project from scratch.

---

## What this is

A secondary brand for the primary 10xVelocity business. **10x Studio** sells
custom web platforms, ecommerce, internal tools, AI-enabled workflows, and
integrations to mid-market clients. The site is positioned as a **senior
build partner** — AI-native, opinionated, no vaporware.

Domain: **`10xstudio.dev`** — live, pointed at the Cloudflare deploy.
Primary brand (separate site): `10xvelocity.ai`. The two are deliberately
**not** visually coupled — different domains, different positioning.

---

## Tech stack

- **Framework:** Astro 5 (static-first, zero JS shipped per page by default)
- **Content:** Astro content collections (`blog`, `case-studies`)
- **Styling:** plain CSS, design tokens imported from the `/10x-design` skill
- **Hosting:** **Cloudflare Workers** (live at `10xstudio.dev`). Config is
  `wrangler.jsonc` at the **repo root** — it builds `site/` (`npm ci && npm run
  build`) and serves `site/dist`. Deploys on push to GitHub `main`. (A stale
  `site/netlify.toml` and a `cloudflare/workers-autoconfig` branch that points
  assets at `prototype/` both still exist in the repo — ignore them; neither is
  the production path. The site was briefly double-deployed on Vercel + Cloudflare
  during a DNS cutover and is now Cloudflare-only.)
- **Forms:** The contact form is **working** — submissions are delivered to the
  operator's inbox via Cloudflare email routing (tested June 2026). The leftover
  `data-netlify="true"` attribute is inert (a Netlify holdover) and can be removed
  on the next `contact.astro` edit, but it does no harm.
- **Icons:** inline-SVG `<Icon>` component (6 icons). **Do not** add the Lucide
  CDN script back — it was removed for Lighthouse perf. Add new icons by
  pasting Lucide path data into `site/src/components/Icon.astro`.
- **Sitemap:** auto-generated via `@astrojs/sitemap`
- **Fonts:** Jost (display), Archivo (body), JetBrains Mono (technical),
  all via Google Fonts with `display=swap`

---

## Repository layout

```
10x-studio-site/
├── CLAUDE.md                        ← you are here
├── project.md                        ← original positioning brief from the operator
├── prototype/                        ← v1 static HTML mocks (design reference, not deployed)
├── case-study-drafts/                ← outputs from the case-study-from-repo skill
│   └── <ProjectName>/
│       ├── <slug>.md                 ← draft case study (placeholders + body)
│       └── <slug>.research.md        ← audit-trail sidecar
├── site/                             ← THE LIVE SITE (Astro project)
│   ├── astro.config.mjs              ← site URL, MDX + sitemap integrations
│   ├── netlify.toml                  ← Netlify build config (publish dist)
│   ├── package.json                  ← deps: astro, @astrojs/mdx, @astrojs/sitemap
│   ├── public/                       ← static assets served at /
│   │   ├── assets/                   ← logo-mark, logo-lockup, motif-grid, favicon
│   │   ├── case-studies/             ← case-study illustration PNGs
│   │   ├── robots.txt
│   │   └── _lab/                     ← (future) staging area for non-prod experiments
│   └── src/
│       ├── components/
│       │   ├── Nav.astro             ← top nav, 5 links + Start a project CTA
│       │   ├── Footer.astro          ← motif strip + 4 cols + meta line
│       │   ├── Icon.astro            ← inline SVG icons (replaces Lucide runtime)
│       │   └── WellTile.astro        ← 2x2 brand motif tile (web/ecom/ops/ai/auto sets)
│       ├── content/
│       │   ├── config.ts             ← Zod schemas for blog + case-studies
│       │   ├── blog/                 ← engineering/case-study journal essays
│       │   └── case-studies/         ← LIVE case studies (one .md per study)
│       ├── layouts/
│       │   └── Base.astro            ← HTML shell, head meta, OG/Twitter/canonical
│       ├── pages/
│       │   ├── index.astro           ← Home (with Organization JSON-LD)
│       │   ├── services.astro
│       │   ├── about.astro
│       │   ├── contact.astro         ← Netlify Forms wired
│       │   ├── contact/thanks.astro  ← post-submit confirmation
│       │   ├── blog/
│       │   │   ├── index.astro
│       │   │   └── [...slug].astro
│       │   └── case-studies/
│       │       ├── index.astro       ← 2x2 grid of colored square cards
│       │       └── [slug].astro      ← detail page (renders Variant A or B)
│       └── styles/
│           ├── styles.css            ← imports tokens
│           ├── tokens/               ← colors, typography, spacing, effects, fonts, base
│           ├── site.css              ← marketing site styles (hero/sections/responsive)
│           └── case-studies.css      ← index grid + Variant A/B detail page chrome
└── .claude/
    └── skills/
        └── case-study-from-repo/     ← skill that turns a repo into a draft case study
            ├── SKILL.md
            ├── README.md
            └── templates/
                ├── case-study.md.tmpl
                └── research.md.tmpl
```

---

## Design system

The brand identity, color tokens, typography, components, and UI kits live in
the `/10x-design` Claude Code skill (separate from this repo). When the user
says "use the design system" or wants to add visual elements, **invoke that
skill** — don't re-derive colors or type from memory.

Key surface for quick reference (also re-exported into `site/src/styles/tokens/`):

- **Palette (Bauhaus primaries on warm paper):**
  - `--blue-500: #1B81CE` — primary action / brand accent
  - `--red-500: #ED3B2F` — emphasis
  - `--yellow-500: #FFC400` — highlight (always with ink text)
  - `--ink-900: #141414` — type, borders
  - `--paper: #FAF9F4` — warm off-white page surface
- **Type:** Jost (display, weight 900, tight tracking), Archivo (body),
  JetBrains Mono (eyebrows, code, metrics).
- **Signatures:** hard ink borders (2–3px), square corners (radius 0–10px),
  **hard offset block-shadows** (no blur, e.g. `4px 4px 0 ink`),
  circle-in-square "well" grid motif. **No emoji, no soft glows, no gradients.**
- **Voice:** declarative, blunt, engineering-literate. Address client as
  "you", speak as "we" (one accountable team). Specific over fluffy.
  Never hedge with "we think" / "we might".
- **Disallowed phrases** (project.md): "digital transformation", "unlock
  your potential", "next-gen", "AI-powered everything", "Book a free
  consultation", "Get started now".

---

## Workflow: add a new case study

This is the most common ongoing work. The path is well-paved.

### 1. Run the skill against the target repo

```
/case-study-from-repo /path/to/some/project
```

The skill (at `.claude/skills/case-study-from-repo/`) will:
1. Read the repo (README, manifest, git history, spine files, integrations scan)
2. Write a research sidecar (`case-study-drafts/<slug>/<slug>.research.md`)
3. Ask the operator ~5 questions (client framing, naming, thesis, headline
   metric, variant + color)
4. Write a draft (`case-study-drafts/<slug>/<slug>.md`) with frontmatter
   matching the content collection schema and `<<< FILL IN: … >>>`
   placeholders for the things only the operator knows

**Hard rules baked in:** never fabricate metrics, never invent named clients,
never write outside `case-study-drafts/`, never modify the target repo.

### 2. Add the illustration

Each case study gets a custom illustration (square PNG, hand-drawn line art
with brand-color flats on white background). The operator typically generates
these separately and drops them in.

- **Filename:** `<slug>.png` (kebab-case), e.g. `data-guardian.png`
- **Destination:** `site/public/case-studies/<slug>.png`
- **Format:** 1000–1500px square PNG, white background, brand-color flats.
  The card renders this with CSS `mix-blend-mode: multiply` so the white
  background drops out against the paper sub-tile.

### 3. Promote the draft

Copy `case-study-drafts/<slug>/<slug>.md` → `site/src/content/case-studies/<slug>.md`
and resolve every placeholder:

- **`clientUrl`** — if not public, **delete the line entirely**. The Zod
  schema requires a valid URL string; the placeholder text will fail
  validation.
- **`heroQuote` / `heroQuoteAttribution`** — both optional. If absent,
  delete both. The Variant B template conditionally renders the principle
  quote band only when `heroQuote` exists.
- **Body `<<< FILL IN: … >>>`** — strip or resolve. Sections still read
  cleanly without the anecdotal beats; never invent numbers to fill them.
- **`heroImage`** — set to `/case-studies/<slug>.png` (matches step 2).
- **`metrics`** — only use real numbers from the repo or research sidecar.
  Drop the array entirely if there are no shareable numbers.
- **`draft: true` → `draft: false`** when you're ready to publish.

### 4. Build + verify

```
cd site && npm run build
```

A successful build shows the new page at `dist/case-studies/<slug>/index.html`
and the index now includes the new card. The 2x2 card grid cycles colors
`[blue, red, yellow, white]` by collection index — adding a case study may
shift card colors of existing entries (the detail-page colorway from
`data.color` is unaffected and remains stable).

---

## Workflow: add a new blog post

Lower cadence, simpler than case studies.

1. Create `site/src/content/blog/<kebab-slug>.md` with frontmatter:
   ```yaml
   ---
   title: "..."
   description: "1-sentence dek"
   pubDate: 2026-XX-XX
   author: "Jay Smith"        # default
   tags: ["..."]
   kind: "essay"              # essay | case-study | note
   heroSet: "ops"             # web | ecom | ops | ai | auto (WellTile preset)
   draft: false
   ---
   ```
2. Write the body in Markdown. Long-form, slow cadence, no listicles —
   matches the journal's editorial voice (see existing posts as reference).
3. `npm run build`. New post appears at `/blog/<slug>/`.

---

## Workflow: deploy

The site is **live** at `10xstudio.dev` on **Cloudflare Workers**, deployed
continuously from GitHub `main`.

- **To ship a change:** commit to `main` and push to GitHub. Cloudflare Workers
  Builds runs `npm ci && npm run build` in `site/` and serves `site/dist` (per
  `wrangler.jsonc` at the repo root). No dashboard step needed for routine pushes.
- **To verify a deploy:** fetch a page with a cache-busting query string (e.g.
  `/services/?v=check`) to bypass Cloudflare's edge cache; if the origin build is
  fresh the new content shows immediately. A changed `/_astro/*.css` hash confirms
  a rebuild (vs. a cached page).
- **If a push doesn't go live:** check the project's **Deployments** tab in the
  Cloudflare dashboard for a failed/queued build. The production branch must be
  `main` (not `cloudflare/workers-autoconfig`, whose `wrangler.jsonc` wrongly
  points assets at `prototype/`).
- **Manual fallback:** `npx wrangler deploy` from the built `site/`.
- **Build verifies in CI cleanly**, but local sandboxes that share a Windows
  checkout can choke on platform-specific `node_modules` binaries (rollup/esbuild)
  and an immutable `.vite` cache — do a clean `npm ci` if a local build fails for
  those reasons.

---

## Content collection schemas

Defined in `site/src/content/config.ts`. Don't modify without updating the
case-study-from-repo skill's template at
`.claude/skills/case-study-from-repo/templates/case-study.md.tmpl`.

### `blog`
```
title, description, pubDate, [updatedDate], [author=Jay Smith], tags[],
kind = 'essay' | 'case-study' | 'note',
heroSet = 'web' | 'ecom' | 'ops' | 'ai' | 'auto',
draft = false
```

### `case-studies`
```
title, description, client, [clientUrl], industry, pubDate,
role = string (default 'Build partner'),
variant = 'A' | 'B' | 'C',   ← only A and B are built; C falls through to B
color = 'blue' | 'red' | 'yellow',  ← drives detail-page chrome only
[duration], tags[],
[heroQuote], [heroQuoteAttribution],
metrics[] = { value, label },
stack[],
[heroImage],
draft = false
```

---

## Case-study variants

Three variants exist conceptually (mocked by the operator from the
`/10x-design` skill). Implementation status:

- **Variant A — Story Arc** ✅ Built. Paper-bg hero with 2×2 motif art, dark
  metrics band. Best for time-bounded transformations / before-after.
- **Variant B — Thesis-as-hero** ✅ Built. Solid-color hero, colored metrics
  band, optional principle-quote band. Best when the case study proves a
  brand-level principle.
- **Variant C — System/Scope** ⏳ Deferred. Multi-up motif row, breadth-of-
  effect numbers, "X → Y" reduction callout. Build when first system/scope
  case study lands. The route falls back to Variant B in the meantime.

The renderer at `site/src/pages/case-studies/[slug].astro` switches on
`data.variant`. Both A and B share: meta strip, narrative + sticky aside,
conditional quote band, CTA band.

Yellow colorway has been exercised (CiteSight) — text correctly switches
to ink, CTA button to solid ink. Visual review confirmed on-brand.

---

## Critical files (the ones future work will touch)

| File | When to edit |
|---|---|
| `site/src/content/case-studies/<slug>.md` | Adding/editing a case study |
| `site/src/content/blog/<slug>.md` | Adding/editing a blog post |
| `site/public/case-studies/<slug>.png` | Case-study illustration |
| `site/src/pages/case-studies/index.astro` | Card grid layout, palette cycle |
| `site/src/pages/case-studies/[slug].astro` | Variant A/B chrome |
| `site/src/styles/case-studies.css` | Card + detail page styling |
| `site/src/styles/site.css` | All other page styles |
| `site/src/components/Icon.astro` | Adding new icons (paste Lucide path data) |
| `site/src/layouts/Base.astro` | Head meta, OG, canonical, JSON-LD |
| `site/src/content/config.ts` | Content collection schemas (rare) |
| `.claude/skills/case-study-from-repo/SKILL.md` | Skill behavior (rare) |

---

## Conventions and hard rules

- **Voice:** match the brand. Confident, declarative, engineering-literate.
  No emoji. No marketing-speak. Specific numbers earn their place; round
  numbers don't.
- **Never fabricate metrics, testimonials, or client names.** Honest framing
  beats invented numbers every time. The skill enforces this; humans must too.
- **Anonymize when the client hasn't approved naming.** Pattern:
  "A Midwest outdoor-goods distributor" is fine; faking a logo is not.
- **`/public/` assets ship as-is.** Don't reference them from `/src/`; use
  root-absolute URLs (`/case-studies/data-guardian.png`).
- **Markdown bodies render with `<Content />` from Astro.** Use H2 to break
  sections; the body CSS picks up h2/h3/p/blockquote/code/pre/ul/ol/strong/em.
- **Icons:** inline SVG only. If a new icon is needed, paste the Lucide path
  data into `Icon.astro`'s `ICONS` map and add it to the `name` union.
- **No client-side JavaScript** unless it earns its weight. The site is
  intentionally JS-free outside of the contact-form POST and the
  `<script type="application/ld+json">` structured-data blocks.
- **No fabricated metrics on the index card** — the index uses the case
  study's `metrics[]` only if present; missing arrays are fine.

---

## Things explicitly NOT to do

- **Don't add the Lucide CDN script back.** Use `Icon.astro` for new icons.
- **Don't modify the global `~/.claude/CLAUDE.md`.** That's user-wide behavioral
  guidance, not project-specific.
- **Don't remove `width`/`height` attrs from `<img>` tags.** They prevent CLS.
- **Don't restructure `public/` paths without updating every `heroImage`
  reference in `src/content/case-studies/*.md`.**
- **Contact form works via Cloudflare email routing** (tested). The leftover
  `data-netlify="true"` attr is inert — safe to remove but don't rely on it.
- **Don't overwrite the existing case studies' `data.color`** to "balance"
  the index palette. The card grid cycles colors by index independently.
- **Don't fix typos in the upstream Mac source referenced by ClickyWin**
  (e.g., `leanring-buddy/`). They're preserved on purpose to maintain lineage.

---

## Open threads / known deferrals

These are intentional gaps the operator is aware of. Don't surprise-fix them.

- **Variant C** is not built (see above).
- **WebP conversion** of case-study illustrations is deferred. PNGs at 50–340 KB
  ship as-is. Doing WebP cleanly requires moving the assets from `public/` to
  `src/assets/` and switching to Astro's `<Image>` component.
- **`og:image` per page** is not set. Needs proper 1200×630 PNG/JPEG assets;
  the existing 1254×1254 illustrations are wrong aspect ratio.
- **Structured data — DONE (June 2026).** Home now emits `ProfessionalService`
  (with Louisville/KY address + `OfferCatalog`) and `WebSite`; Services emits
  `Service` `ItemList` + `FAQPage` (with a visible buyer-intent FAQ incl. pricing);
  every case study and blog post emits `Article`/`BlogPosting` + `BreadcrumbList`
  with publish/modified dates. Rendered via a reusable `jsonLd` prop on
  `Base.astro`. See `seo/SEO-AEO-Strategy.md` for the full plan.
- **Privacy / Terms** footer links go nowhere — the site is live, so write these soon.
- **`hello@10xstudio.dev`** has no mail forwarding configured yet.
- **About page principle quote** (*"If you can't explain why the software did
  something, you don't have a product — you have a liability."*) is borrowed
  from the 10x Web Development brand voice guide. Swap for an original when
  one exists.
- **Race-o-Bot "Don"** has no last name in the published body (the broadcaster
  hasn't been asked about attribution). Strip-resolved during promotion; can
  be expanded when permission is in hand.

---

## When in doubt

1. Read `project.md` for the original positioning brief.
2. Look at an existing case study (e.g. `site/src/content/case-studies/citesight.md`)
   for the canonical frontmatter shape and body voice.
3. Look at an existing blog post (`site/src/content/blog/ai-as-engineering-not-theater.md`)
   for the editorial register.
4. Run `cd site && npm run build` after every meaningful change. Build is
   ~1.5s; verifies schemas, links, and asset paths.
5. If you're considering a significant change to the design system, palette,
   or voice — **stop and confirm with the operator first.** The brand is
   deliberate and built up over many decisions; don't undo them silently.
