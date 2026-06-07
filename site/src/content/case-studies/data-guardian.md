---
title: "Data Guardian: catalog hygiene for one operator, 7,000 products"
description: "How a Midwest outdoor-goods distributor put a single operator in charge of a 7,000-product, 253-vendor Shopify catalog by routing every AI decision through a human review queue."
client: "A Midwest outdoor-goods distributor"
industry: "E-commerce / outdoor retail"
pubDate: 2026-06-07
role: "Build partner"
variant: "A"
color: "red"
duration: "13 weeks"
tags: [shopify, ai-agents, human-in-the-loop, catalog-hygiene, python, flask]
heroQuote: "Small retailers can run enterprise-grade catalog hygiene by putting humans in the loop on AI agents, not by replacing them."
metrics:
  - value: "~7,000"
    label: "products under continuous review"
  - value: "253"
    label: "vendors normalized into one schema"
  - value: "1"
    label: "operator running the whole catalog"
stack: [python, flask, sqlite, shopify-graphql, anthropic-claude, docker]
heroImage: "/case-studies/data-guardian.png"
draft: false
---

## // THE BRIEF

A Midwest outdoor-goods distributor runs a single Shopify storefront on top of roughly 7,000 products sourced from 253 different vendors. Each vendor ships data its own way: SKUs in conflicting formats, color codes truncated to fit Shopify's 15-character option-value limit, product descriptions that arrive blank or as point-of-sale boilerplate, images that exist for one color of a SKU but not the next three.

Before this project, catalog hygiene was a spreadsheet problem the team couldn't actually solve. Fixing one vendor's data by hand took a day. Fixing all 253 was never going to happen. The point-of-sale software kept overwriting the small wins. The owner-operator was the only person with the context to make a judgment call on any given row — but there are 83,000 rows.

## // THE THESIS

> Small retailers can run enterprise-grade catalog hygiene by putting humans in the loop on AI agents, not by replacing them.

The obvious move in 2026 is to point a model at the catalog and let it rewrite everything. We did the opposite. Every agent in Data Guardian — the image-search agent, the Claude Vision verifier, the Haiku description writer — produces *proposals*, not commits. Every proposal lands in a queue. The operator clicks approve, edit, or reject. Then, and only then, the change ships to Shopify, with a row in the changelog that can be undone.

A less rigorous shop would have built a one-shot bulk-rewrite script, taken a victory lap, and left the operator firefighting silent regressions for the next six months. The whole point of this design is that the operator stays in control while the agents do the searching, the looking, and the typing.

## // HOW WE BUILT IT

**A single shared schema called "the Brain."** The first phase wasn't AI at all — it was a SQLite database (`data/brain.db`) that holds the canonical version of every lookup the catalog depends on: vendor map, SKU parse rules per vendor, color-code expansions, type taxonomy, tag rules, title rules. The Brain auto-seeds from JSON on container start, gets backed up before every risky write, and is the one source of truth the agents and the operator both read from. Without it, no agent has a stable ground to stand on.

**Pull, normalize, diff, queue.** The core loop is unglamorous. `shopify_client.py` pulls products via the Admin GraphQL API. `normalizer.py` parses the vendor-specific SKU format (`{prefix}-{mfg-code}|{color}|{size}`) into a `RawProduct`. `comparison.py` diffs that against the Brain and emits corrections. Anything ambiguous — an unknown color code, a vendor we haven't mapped — lands in the `unknown_data_queue` for the operator to teach the Brain about, instead of being silently guessed.

**Two AI agents, both on rails.** The image agent runs a three-tier search cascade (vendor-site-scoped first, then open Google via SerpAPI, then Exa) and feeds every candidate through Claude Vision with a reachability pre-filter and an HTTPS upgrade. The description agent uses Claude Haiku 4.5 to draft prose-only SEO copy for any product whose `descriptionHtml` is empty or tag-only. Neither agent writes to Shopify directly. Both write to a review queue.

**The changelog is the safety net.** Every push to Shopify writes a row to `change_log`. A conflict-classifier-backed undo lets the operator roll back any individual correction even after the fact. This is the line between an "AI tool" and an operational system someone trusts with a live catalog.

**Stack at the surface.** Python 3.12, Flask, SQLite, the Shopify Admin GraphQL API, Anthropic Claude (Vision + Haiku 4.5), SerpAPI and Exa for image search, Docker on Hetzner for deploy. SQLite over a managed database was the non-obvious choice — chosen because the Brain is single-writer, fits in memory, backs up to a file in a second, and means the whole app boots from `docker-entrypoint.sh` with zero managed-service dependencies.

## // WHAT IT SHIPPED

- **Pull & Scan flow** — one click per vendor pulls the latest Shopify state, normalizes it against the Brain, applies safe auto-corrections, and queues everything ambiguous for human review.
- **Per-color missing-image detection** — finds the specific color variants that lack a product image, instead of flagging "this product needs images" at the SKU level.
- **Three-tier image agent** — searches the vendor's own site first, then open Google, then Exa; verifies every candidate with Claude Vision before queueing.
- **Empty-description SEO writer** — Haiku 4.5 drafts a prose-only description for any product with blank `descriptionHtml`; the operator reviews side-by-side and pushes.
- **Vendor editor** — primary and backup URLs and SKU prefix overrides are editable per row, with operator overrides distinguished from extractor-inferred values.
- **Changelog with undo** — every push to Shopify is logged with a conflict-classified rollback path.
- **Unknown-data queue** — anything the system can't confidently map becomes a question the operator answers once, after which the Brain learns it for everyone.

## // WHAT IT CHANGED

One number we can stand behind from the repo itself: a 13-week build, 64 Python files, 23 test files, with every agent decision pushed through a review queue before it touches the live store. The operator runs the catalog. The agents do the typing.

## // WHAT WE'D STILL TELL YOU

This is not a system that runs unattended. By design — the operator is the quality bar. A v2 would extend the same review-queue pattern to thin-content rewrites and to web-scraped vendor descriptions (both intentionally out of scope today), and would push the changelog's undo from per-row to vendor-scoped "undo this scan." We haven't built either yet because the operator's review throughput is the constraint, not the agents'.
