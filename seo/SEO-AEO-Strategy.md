# 10x Studio — SEO & AEO Strategy

**Domain:** `10xstudio.dev` · **Prepared:** June 2026 · **Owner:** Jay Smith

This is the working strategy for getting `10xstudio.dev` found — by search engines
*and* by the AI answer engines (ChatGPT, Google AI Overviews, Perplexity, Claude)
that increasingly sit between a buyer and a shortlist. It is grounded in three
inputs: a crawl of the five competitors on the list, the GEO citation research in
`seo/AEO_Arxiv_paper.pdf` ("What Gets Cited: Competitive GEO in AI Answer
Engines"), and the AI-era content-brief structure in `seo/AI_Search_Opt_structure.md`.

---

## 1. The short version

You are launching a brand-new domain into a field where every competitor has
**11 to 22 years of domain age** and a backlink history you cannot buy back. On
classic SEO signals — authority, age, link equity — you start last and stay last
for a while. That is just arithmetic.

But the crawl surfaced a gap none of them have closed, and it happens to be the
exact thing the GEO research says drives AI citations:

> **Not one of the five competitors publishes question-based content, direct
> answer blocks, or pricing.** Four of five run aging WordPress installs. All
> five answer buyer questions only inside marketing prose, never in the
> structured, standalone, cited format that answer engines lift.

That is the wedge. AEO (Answer Engine Optimization) is a newer game where domain
age matters far less than *structure, specificity, completeness, and freshness* —
all of which a disciplined new site can win in months, not years. The strategy is
therefore **AEO-first, local-foundation, national-niche-reach**: build the
answer-engine substrate from day one, anchor local authority in Louisville/KY as
the trust base, and chase national/niche AI-native queries where the incumbents
are silent.

---

## 2. The competitive landscape

What the crawl found across the five sites:

| Competitor | Base | Focus | Domain age | Stack | Pricing? | FAQ / Q&A? | Direct-answer content? |
|---|---|---|---|---|---|---|---|
| **Louisville Geek** | Louisville, KY | Managed IT / MSP (dev is secondary) | ~22 yrs (2004) | WordPress | No | No | No |
| **Geneca** | Chicago, IL | Enterprise custom software | ~21 yrs | WordPress / Divi | No | No | No |
| **Slingshot** | Louisville, KY | Software & app dev | ~18 yrs | WordPress | No | No | No |
| **Build in Motion** | Pittsburgh, PA | Custom software, mobile, AI | ~11 yrs | Custom (Next-like) | No | No | No |
| **FocustApps** | Louisville, KY | Data & AI | ~6 yrs | WordPress / Elementor | No | No | No |

What this tells us:

**The local SERP is an MSP, not a dev shop.** Louisville Geek dominates
"Louisville IT" but is really a managed-services provider; custom software is a
side line. That means the phrase **"custom software development Louisville"** and
its cousins are contested mainly by Slingshot and FocustApps — beatable targets,
not Geneca-scale fortresses.

**The out-of-market players (Geneca, Build in Motion) rank nationally** on generic
"custom software development company" terms. You will not outrank a 21-year domain
on the head term. You *can* out-answer them on the long-tail, intent-rich
questions underneath it.

**Everyone is weak on the same GEO factors.** Mapping the competitors to the
paper's 18-factor taxonomy (Section 4), they collectively under-perform on
*Completeness* (no prices, no specs, no comparisons), *Readability/structure* (prose
walls, no sectioned Q&A), and *Citations* (testimonials, but almost no cited data
points). Those are precisely the factors you can engineer into every page.

**Their strengths you must respect:** social proof and named clients. Geneca lists
Walgreens, McDonald's, Aon; Slingshot has Texas Roadhouse and U of L; Build in
Motion shows detailed testimonials. You have a thinner public client list, so
your trust signals must come from *specificity and demonstrated reasoning* — real
metrics (the 70% / 50% / 65% figures already on the home page), honest pricing,
engineering depth, and the case studies — rather than logo volume.

---

## 3. Strategic thesis: why AEO-first

Three forces make answer-engine optimization the highest-ROI play for a new
domain in this category:

**The buyer's first move has changed.** A mid-market operator evaluating a
$50–250K build increasingly opens by asking an AI assistant "what should a custom
internal tool cost?" or "what's the difference between a custom platform and a
template?" — not by scrolling ten blue links. Whoever supplies the cleanest,
most complete, best-cited answer to those questions gets named in the response and
enters the consideration set before a SERP is ever rendered.

**Answer engines reward structure over authority.** Classic ranking leans on
links and age. Citation in an AI answer leans on whether your page *directly and
completely answers the specific question*, in a chunk the model can lift. The
research shows that. A new site that nails structure can be cited alongside or
instead of a 20-year domain.

**Your technical foundation is already a competitive asset.** The site is static
Astro — near-zero JS, fast, clean semantic HTML, sitemap, canonical, OG, and now
structured data on every template (Section 7). Four of five competitors carry
WordPress weight. Crawlers and answer-engine retrievers read your pages faster and
more reliably. Don't squander that by drifting toward a heavy CMS.

The discipline this demands: **every substantive page is built to answer one
question completely, in lift-ready structure, with at least one cited fact.** That
single rule, applied consistently, is the strategy.

---

## 4. The GEO playbook — 18 citation factors applied to 10x Studio

The paper isolates 18 content factors that make a page more or less likely to be
cited by AI answer engines, grouped into six categories. Here is each category
translated into a rule for this site, and what to do about it.

**Content Match — be on the exact question.**
Answer engines drop pages that discuss adjacent topics or miss the query's key
terms. *Rule:* one page per real buyer question; use the buyer's own words
("custom software cost", "replace spreadsheets with software", "AI intake
triage"), not internal jargon. The 150-word answer block at the top must restate
and answer the literal question.

**Completeness — say the thing everyone else omits.**
The factors here are *Price Not Mentioned*, *Missing Specifications*, and *No
Comparisons*. This is the single biggest open lane: **no competitor publishes
pricing, and few give specs or honest comparisons.** Publishing real cost ranges,
timelines, and "custom vs. template" / "us vs. a freelancer vs. a big agency"
comparisons makes your pages dramatically more citable. (The new Services FAQ
already does this — see Section 7.)

**Trustworthiness — assert, evidence, don't oversell.**
Penalized signals: *Hedged Language* ("might", "could", "possibly"), *Claims
Without Evidence*, *Internal Contradictions*, and *Overly Promotional* tone. This
maps perfectly onto the brand voice rules already in `CLAUDE.md` ("never hedge
with 'we think'"). Keep claims declarative and back them with a number, a named
framework, or a concrete example. Avoid the breathless register the competitors
use ("Unlock the Full Potential", "light-years ahead").

**Readability — sectioned, scannable, self-contained.**
Penalized: *dense paragraphs* and *scattered information*. *Rule:* every H2 is a
question or a clear claim; every section answers on its own without needing the
section above it; no wall-of-text. Answer engines chunk and retrieve sections
independently — write for that.

**Competitive Standing — be the most comprehensive answer in the set.**
Factors: *Weaker Value Proposition*, *Less Comprehensive*, *Weaker Social Proof*,
*Lower List Position*. You can't yet win on social-proof volume, so win on
*comprehensiveness* — when your page is the most complete answer to the question,
it earns the citation. Strengthen social proof opportunistically (reviews,
named clients as they're approved, third-party profiles).

**Freshness — date everything and keep it moving.**
Recent timestamps beat stale ones; *no* timestamp is worse than an old one.
*Rule:* show `datePublished`/`dateModified` on every article and case study (now
emitted in schema and OG), and refresh cornerstone pages on a schedule so the
dates stay current. A new domain's one freshness advantage over a 20-year site is
that it can be *visibly, continuously current.*

**The synthesis rule** (from `AI_Search_Opt_structure.md`): a page is ready to
publish only when — (1) the first 150 words answer the core question directly,
(2) every H2 maps to a real "People Also Ask" question, (3) every section stands
alone, (4) each section carries one cited data point, and (5) a human still gets
something the AI summary doesn't. All five must be **yes**.

---

## 5. Query & keyword target map

Targets are organized by the job the page does, not by raw volume. For a
high-ticket B2B service, a handful of high-intent queries matter more than broad
traffic. Balanced per the chosen strategy: local foundation + national/niche reach.

### Tier 1 — Local commercial (foundation; compete head-on)

These anchor local trust and are winnable against Slingshot/FocustApps (Geek is an
MSP, not a true rival here):

- custom software development Louisville / Kentucky
- web application development Louisville
- custom web platform developer Kentucky
- ecommerce development company Louisville
- internal tools / dashboard developer Louisville
- software development company near me *(GBP + LocalBusiness schema territory)*

### Tier 2 — National / niche AEO (reach; incumbents are silent)

Lower competition, high intent, and aligned to the "AI-native" differentiator no
competitor owns:

- AI-native software development / what does AI-native mean
- RAG system development for business / build a RAG knowledge tool
- custom AI workflow automation for operations
- replace spreadsheets with custom software
- internal operations dashboard development
- custom CRM integration / API integration developer
- rescue a stalled software project / take over inherited codebase

### Tier 3 — AEO question clusters (the citation engine)

These are the "People Also Ask" / assistant-prompt questions that feed answer
engines. Each becomes an H2 (on a pillar page) or its own post, written to the
150-word-answer-block standard. Mine the live PAA box for each Tier 1/2 term and
expand this list continuously. Starting set:

- How much does custom software / a web platform cost?
- How long does a custom software build take?
- Custom software vs. off-the-shelf / template — which is right?
- What's the difference between a website and a web platform?
- What does "AI-native" actually mean (vs. a bolted-on chatbot)?
- How do I know if my business needs custom software?
- Should I hire a freelancer, an agency, or a build partner?
- How is a custom software project priced — fixed bid or phases?
- Can a developer take over a half-finished or inherited project?
- What is RAG and when does a business actually need it?

> **Note on data:** these targets are grounded in positioning, competitor gaps,
> and the AEO research — not in a keyword-volume tool. Before heavy investment in
> any single term, validate live search volume and difficulty (Search Console once
> indexed, plus a tool like Ahrefs/Semrush or Google Keyword Planner) and read the
> actual PAA box for each. Treat this map as the hypothesis to test, then prune.

---

## 6. Content architecture & roadmap

The site structure is already strong (Home, Services, About, Case Studies, Blog,
Contact). The work is to layer an **answer-engine content system** on top of it.

**Cornerstone pillar pages (highest priority).** Build two or three deep,
evergreen pillar pages — the kind answer engines treat as canonical sources:

1. *"What custom software actually costs in 2026"* — the pricing/scoping guide.
   This is the highest-leverage page on the whole site because **no competitor
   has one** and it answers the question buyers ask first. Real ranges, the
   phase-based pricing model, what drives cost up or down, comparison to
   freelancer/agency. Update the year and figures on a schedule.
2. *"Custom platform vs. template vs. off-the-shelf"* — the decision guide for the
   buyer who doesn't yet know what they need.
3. *"What 'AI-native' means for business software"* — owns the differentiator,
   targets Tier 2, demonstrates engineering judgment.

**Service pages** already exist and now carry a buyer-intent FAQ with pricing and
`Service`/`FAQPage` schema. Next: give each of the five services room to breathe
with its own deeper section or sub-page as demand justifies, each with its own 2–3
question FAQ.

**Case studies** are the trust engine and now emit `Article` + breadcrumb schema
with dates. Keep the cadence up via the existing `case-study-from-repo` skill.
Each one is a citable proof point; lead with the problem and the headline metric.

**Blog / Journal** is the freshness and PAA engine. Reframe its editorial calendar
around the Tier 3 question clusters: one well-structured answer post per question,
each meeting the five-point pre-publish check. Slow cadence is fine — the existing
voice is right — but every post must be a standalone answer to a real question.

**Suggested 90-day sequence:**

- *Weeks 1–2:* Ship the pending AEO changes (commit + push to `main` so the new
  schema and Services FAQ go live), verify indexing, set up Search Console + Bing
  Webmaster + Google Business Profile. Ship the pricing pillar.
- *Weeks 3–6:* Ship the two remaining pillars. Add per-service FAQs. Promote one
  case study.
- *Weeks 7–12:* Two to three answer posts from the Tier 3 list. First measurement
  review. Begin local citation building. Refresh dates on cornerstones.

---

## 7. The AEO content production system

Every substantive page goes through the same brief, derived from
`AI_Search_Opt_structure.md`. The reusable template now lives at
`seo/templates/aeo-content-brief.md` — fill one out before writing anything.

The non-negotiable shape of an AEO-ready page:

1. **Answer block first** — 100–150 words at the very top that answer the page's
   one core question directly. No throat-clearing intro. This is what AI Overviews
   lift verbatim.
2. **One H2 per "People Also Ask" question** — each section answers independently.
3. **One edge per page** — original data, a specific ICP, a named framework, or a
   deeper subtopic the top 5 results don't cover. If you can't name the edge, the
   page isn't ready.
4. **One cited fact per section** — a number, a source, a concrete example.
5. **The pre-publish check** — all five questions in Section 4's synthesis rule
   must be yes.

Hand the filled brief to Claude (or write directly against it). The point of the
template is that it bakes the GEO factors into the process so you don't have to
remember them each time.

---

## 8. Technical foundation — done and remaining

**Implemented in this pass** (built and ready to deploy):

- **Richer site identity schema** on the home page: `Organization` upgraded to
  `ProfessionalService` with Louisville/KY address, `areaServed`, an
  `OfferCatalog` of the five services, founder, and a linked `WebSite` entity.
  This gives answer engines a clean, machine-readable picture of who you are, what
  you do, and where.
- **`Service` + `FAQPage` schema on the Services page**, plus a real, visible
  buyer-intent FAQ that answers seven high-intent questions — *including pricing,
  timelines, and the custom-vs-template comparison none of the competitors
  publish.* The visible content and the schema mirror each other (required for
  legitimacy).
- **`Article`/`BlogPosting` + `BreadcrumbList` schema** on every case study and
  blog post, with `datePublished`/`dateModified` wired into both JSON-LD and
  Open Graph article tags (the Freshness factor).
- **A reusable `jsonLd` mechanism** in the base layout, so any future page can
  emit structured data cleanly.

**Remaining technical work** (mostly already tracked as deferrals in `CLAUDE.md`):

- **Ship the pending changes — this is now the gating item.** The site is live at
  `10xstudio.dev` (deployed via GitHub `main` → a Cloudflare Workers build; note
  `CLAUDE.md` still says "Netlify / never deployed" and is out of date). But the
  *live* site is the pre-change version: the home page still carries the old bare
  `Organization` schema and the Services page has no FAQ and no `Service`/`FAQPage`
  markup. All the work in this pass is sitting uncommitted in the local working
  tree. None of it ranks or gets cited until it is committed and pushed to `main`.
- **Per-page `og:image`** at the correct 1200×630 aspect ratio (current
  illustrations are square).
- **Google Business Profile** for Louisville + NAP consistency across directories
  (Clutch, local listings) — the backbone of the local-foundation play.
- **Privacy & Terms pages** — currently dead footer links; needed before launch
  and a minor trust signal.
- **`hello@10xstudio.dev` mail forwarding** so the contact path actually works.
- Optional later: WebP conversion of illustrations, `HowTo`/`Question` schema on
  pillar pages as they're written.

---

## 9. Local signals (the foundation layer)

Even with a national/niche reach strategy, local signals are the cheapest trust to
build for a new domain and the competitors under-invest in structured local data:

- **Google Business Profile** — category "Software company" / "Website designer",
  service area Louisville + Kentucky, linked to the site. This is what surfaces in
  the local pack and Maps and feeds the `LocalBusiness` understanding.
- **NAP consistency** — identical Name/Address/Phone everywhere it appears.
- **Directory presence** — Clutch and similar (FocustApps leans on a 4.6 Clutch
  rating; a few real reviews there move you into comparison sets).
- **The `ProfessionalService` schema with locality** (now live) reinforces all of
  the above.

---

## 10. Measurement & cadence

Track a small set of signals that actually map to a high-ticket B2B funnel:

- **Indexing & coverage** — Search Console + Bing Webmaster Tools (submit the
  sitemap day one post-deploy).
- **Query impressions/positions** for the Tier 1/2 targets — the leading
  indicator of whether the content is landing.
- **AEO presence** — periodically prompt ChatGPT, Perplexity, Google AI Overviews,
  and Claude with the Tier 3 questions plus a Louisville qualifier, and record
  whether 10x Studio is named or cited. This is the metric that matters most for
  this strategy and the one competitors aren't even watching. *(Worth automating as
  a recurring check.)*
- **Conversions** — contact-form starts, which is the only number that pays the
  bills. A handful of right-fit $50–250K conversations beats any traffic chart.

Suggested rhythm: **monthly** light review (positions, indexing, one AEO probe),
**quarterly** deeper review (refresh cornerstone dates/figures, prune dead
targets, plan next content block).

---

## 11. What to do next (this week)

1. **Ship the pending AEO changes** (commit + push to `main`). The site is live,
   but these improvements aren't — everything else is blocked on shipping them.
2. Stand up Search Console, Bing Webmaster, and Google Business Profile.
3. Write the **pricing pillar page** using the brief template — it's the single
   highest-leverage asset and the clearest competitive gap.
4. Set a recurring monthly AEO probe so you can see the strategy working.

The thread that ties it together: you can't out-age the incumbents, so don't try.
Out-answer them. Be the page that completely, specifically, and freshly answers
the question the buyer actually asked — and let the answer engines do the
introductions.
