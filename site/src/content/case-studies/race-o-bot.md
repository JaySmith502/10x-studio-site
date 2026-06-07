---
title: "Race-o-Bot: grading prompts against the past"
description: "An autonomous prompt-optimization loop for horse-racing predictions - retrodiction-graded, ROI-scored, and shipped to a broadcaster's hand on Derby morning."
client: "Race-o-Bot (R.O.B.)"
industry: "Sports analytics / applied AI"
pubDate: 2026-06-07
role: "Founder & engineer"
variant: "B"
color: "blue"
duration: "8 weeks to Derby/Oaks weekend"
tags: [applied-ai, prompt-engineering, retrodiction, supabase, anthropic]
metrics:
  - value: "+10.9%"
    label: "trifecta-box ROI across 43 graded races"
  - value: "8 wks"
    label: "first commit to live on Derby weekend"
  - value: "0"
    label: "pip dependencies in the optimization loop"
stack: [Python, Anthropic Claude, Supabase, TheRacingAPI, ElevenLabs]
heroImage: "/case-studies/race-o-bot.png"
draft: false
---

## The brief

A veteran racing broadcaster - Don - needed something more honest than vibes to put on the air on Derby morning. The going alternative was the same thing every horseplayer does: scroll past picks, second-guess them, and trust whichever analyst hedged last. He wanted a single bot whose picks could be defended out loud - picks with reasoning, picks with a track record, picks that wouldn't change between the morning print and the post-time call.

The honest version of the brief is harsher: most "AI handicapping" is one prompt deep. Someone types "predict the Kentucky Derby" into a chatbot, screenshots the answer, and treats whatever comes back as analysis. Nobody scores it. Nobody iterates. Nobody knows whether the prompt got worse last week.

## The thesis

> Prompts get measurably better when you grade them against past races - not when you reason about them.

Most prompt work is taste. You read the prompt, you read the output, you tweak the prompt, you read the output again. There is no scoreboard, so there is no improvement - only the *feeling* of improvement. Race-o-Bot replaces taste with retrodiction: every candidate prompt is run against historical races whose finish order is already known, scored against real exotic payoffs, and kept or reverted by a single primary metric. Mutation is also LLM-driven, but the mutator never sees the truth - it only sees the score. That is the entire trick.

A less rigorous shop would have shipped one prompt, called it "AI handicapping," and let attention bias do the rest. That works for marketing. It does not work on Derby morning when a broadcaster has to defend a pick on air.

## How we built it

**Two surfaces, one bot.** `retrodiction-harness/` is the lab: it normalizes North American race data into labeled records, runs a candidate prompt against a sampled batch of past races, and scores seven metrics - top-1 accuracy, top-3 (all and any), exacta, trifecta, simulated trifecta ROI, win ROI, field-adjusted accuracy, and Spearman rank correlation. `ai-derby/` is the race-day stack: TheRacingAPI feeds a racecard, the winning prompt template generates the day's picks, Supabase stores them, a Lovable dashboard shows them, and an ElevenLabs voice agent reads them.

**Stack at the surface.** Python 3.10+, Anthropic Claude as the only model, Supabase for persistence, TheRacingAPI for live cards, ElevenLabs for the voice agent, Lovable for the operator dashboard. The optimization loop has **one** declared pip dependency - `supabase` - and that one is only for race-day persistence. The retrodiction engine itself is stdlib only. Anthropic is called via raw `urllib`. Template rendering is `{{ var }}` substring replacement, not Jinja2. None of this is heroic; it's a deliberate refusal to drag in infrastructure before the problem demands it.

**Where the work was.** Not the model. The model is a commodity. The hard part was the scoring function - `scripts/scoring.py` had to use *actual* exotic payoff amounts from the results data so the trifecta ROI was a real number, not a proxy. Once ROI was a real number, the autonomous loop - `iterate.py` - could keep, revert, and mutate prompts under a single primary metric (`trifecta_roi_pct`) with `top3_all_accuracy` as a tiebreaker. Each iteration samples a fresh random batch of races so the prompt can't overfit to a memorized field.

**What the integrations had to survive.** TheRacingAPI is the racecard source of truth; scratches change the field after picks are generated, so the race-week runbook treats re-running `predictions.py` as destructive (it overwrites the picks JSON, no idempotency guard - a documented sharp edge, not a bug). Supabase carries the full chain - `events → races → picks (top_3, confidence, reasoning, narrative_pre, narrative_post) → results` - through `scripts/db.py`, which is the single writer with partial-update upserts so an operator paste-tool can drop in a finish order without clobbering a narrative. ElevenLabs reads the narrative the bot wrote; the dashboard surfaces what the bot reasoned. Every piece of the operator chain points back to one model call, traceable.

## What it shipped

- Generates top-3 picks with confidence and reasoning for every race in a card, persisted to Supabase and printable as a PDF the broadcaster carries on the rail.
- Runs an autonomous prompt-optimization loop that mutates the template each iteration, keeps only mutations that beat the running best by trifecta ROI, and logs every attempt to a TSV for inspection.
- Scores any candidate prompt against a labeled corpus of past North American races using real exotic payoffs - not proxies.
- Bridges the offline harness and the race-day stack with one adapter so the prompt that wins in the lab is the prompt that runs on Derby morning.
- Drives an ElevenLabs voice agent off the bot's own narrative, so what the broadcaster hears matches what the dashboard shows.
- Ships paste-to-LLM operator tools for entering finish orders and pro picks from raw text - built for an operator standing next to a TV, not a developer at a desk.

## What it changed

Across 43 graded races on the trifecta-box wager, the optimized prompt cleared **+10.9% ROI** - measured against actual exotic payoffs from the same races, not simulated odds. That number lives in `analysis/out/ONE_PAGER.md` alongside the loser cases (exacta-box, for instance, did not clear). The point is not that 10.9% is a fortune; the point is that it is *a real number*, computable on demand, that moves up or down when you change the prompt and re-run the harness. Before retrodiction, that number did not exist. After retrodiction, it is the only number that decides whether a prompt change ships.

On Derby weekend the broadcaster had a printed PDF of bot picks for both Oaks and Derby - picks he could defend on air because each one came with the same reasoning the dashboard displayed and the voice agent read. The PDF is archived as the authoritative artifact for what was distributed.

## What we'd still tell you

The thesis is "retrodiction beats vibes." It is not "Race-o-Bot beats the track." The bot's ROI edge is small, measured on a sample of 43 graded races, and varies meaningfully by wager type - a fact the one-pager shows honestly. The product is also pivoting: the next milestone optimizes for *helping casual fans win more often*, not for maximum payout, because frequency-of-wins is what makes a race-day fan come back next week. A v2 would tighten the operator surface (fewer destructive re-runs, idempotent picks generation), expand the labeled corpus beyond NA thoroughbreds, and put the autonomous loop on a schedule instead of behind a manual command. None of that changes the thesis.
