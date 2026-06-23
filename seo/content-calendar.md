# 10x Studio — Content Backlog & Cadence Calendar

Companion to `SEO-AEO-Strategy.md`. This is the running plan for Journal essays
and Guide pillars: what to write next, in what order, and why. The goal is a
**steady ~1–2 posts/month**, not a one-time dump — for a new domain, consistent
cadence and depth beat volume, and a flood reads as content-farming to both
readers and answer engines.

---

## Cadence policy

- **~1–2 published pieces per month.** Slow, long-form, no listicles — matches the
  Journal's editorial identity, which is itself part of the senior-partner brand.
- **Quality bar before publish** (every piece): answer the core question in the
  first paragraph; one cited fact or real example per section; sections stand
  alone; a human gets something an AI summary wouldn't. (Full check in
  `templates/aeo-content-brief.md`.)
- **Let the data reprioritize.** After the site is in Search Console and the
  monthly AEO probe (`aeo-probe-log.md`) has a few entries, promote whatever
  topics are *almost* ranking and write into those gaps first. This list is the
  hypothesis; the probe is the evidence.
- **Two formats:** *Guides* (`/guides/`) are evergreen, Q&A-structured pillar
  pages with FAQPage schema. *Journal essays* (`/blog/`) are first-person field
  notes that answer a question in prose. Pick format per topic below.

---

## Scheduled (already written)

These three essays are drafted and staggered so they don't all publish the same
day. To publish early, set `draft: false` in the post's frontmatter and push.

| Target date | Post | Status |
|---|---|---|
| Live now | `freelancer-agency-or-build-partner` | **Published** |
| 2026-06-23 | `do-you-need-custom-software` (Guide, backlog #1) | **Published** |
| 2026-06-24 | `inheriting-a-half-built-system` | Draft (flip `draft: false` to ship) |
| 2026-07-08 | `when-a-website-stops-being-a-website` | Draft (flip `draft: false` to ship) |
| 2026-07-15 | `what-is-rag-and-when-you-need-it` (Guide, backlog #2) | Draft (flip `draft: false` to ship) |

> Guides (`what-custom-software-costs`, `custom-vs-off-the-shelf-software`,
> `what-ai-native-means`) are evergreen pillars and intentionally launched
> together as a hub — no need to stagger those.

---

## Backlog (prioritized)

Ranked by intent × winnability × differentiation. Status: `idea` until scheduled.
Adjust order once the probe shows what's gaining traction.

| # | Working title | Core question | Format | Intent | Why it earns a slot | Internal links | Target |
|---|---|---|---|---|---|---|---|
| 1 | ~~Do you actually need custom software?~~ | "How do I know if my business needs custom software?" | **Guide** | High | Top-of-funnel decision query; fits the hub; sends qualified readers into the pricing & vs-off-the-shelf guides. | ↔ pricing guide, vs-off-the-shelf guide, Services | **DONE — published 2026-06-23 (`do-you-need-custom-software`)** |
| 2 | ~~RAG, plainly: when search-over-your-docs is worth building~~ | "What is RAG and when does a business need it?" | **Guide** | Med (niche) | Low-competition national/niche query; complements the AI-native guide; demonstrates depth competitors don't show. | ↔ AI-native guide, Services #ai | **WRITTEN — staged draft for 2026-07-15 (`what-is-rag-and-when-you-need-it`)** |
| 3 | Hiring a software developer in Louisville | "software developer / web development Louisville" | Essay | High (local) | Local-intent piece for the one geo where you're most winnable; thin local competition on *advice* content. | ↔ Services, About, pricing guide | Aug |
| 4 | Why fixed-bid software projects go wrong | "fixed bid vs time and materials software" | Essay | Med | Reinforces the phase-pricing differentiator; supports the pricing guide with a deeper argument. | ↔ pricing guide (#how-priced) | Aug |
| 5 | AI workflow automation: three real examples | "AI workflow automation examples for business" | Essay | Med | Concrete proof for the AI services line using the real 70% / 50% / 65% metrics; pairs with case studies. | ↔ AI-native guide, case studies, Services #ai | Sep |
| 6 | How to write a brief for a custom software project | "how to scope / brief a software project" | Essay | Med | Buyer-enablement; the reader who writes a good brief is a qualified lead; captures RFP/brief queries. | ↔ Services, contact, pricing guide | Sep |
| 7 | Custom software for multi-location & franchise businesses | "software for franchise / multi-location business" | Guide | Med | Targets a specific ICP from the positioning brief; ICP pages convert well and face little tailored competition. | ↔ Services #web, ecom, case studies | Oct |
| 8 | Signs your business has outgrown its tools | "signs you've outgrown your software/spreadsheets" | Essay | Med | Pairs with the existing spreadsheets essay; symptom-led entry point for the "need custom?" decision. | ↔ #1 guide, website-vs-platform essay | Oct |

### Parked / lower priority
- "How long does a custom build take?" — already answered in the pricing guide FAQ; expand only if the probe shows demand.
- "Choosing a tech stack" — low buyer intent, more technical than the audience; skip unless a client asks.
- "Internal dashboards vs spreadsheets" — overlaps the existing spreadsheets essay; merge ideas rather than duplicate.

---

## How to add a backlog item to the site

1. Fill out `templates/aeo-content-brief.md` for the topic (forces the AEO structure).
2. Essay → new `site/src/content/blog/<slug>.md` (`kind: essay`). Guide → new
   `site/src/content/guides/<slug>.md` (with `answer` + `faqs`). See existing
   files for the frontmatter shape.
3. `cd site && npm run build` to verify, then commit + push to `main` (Cloudflare
   redeploys). Update the row's status here.
