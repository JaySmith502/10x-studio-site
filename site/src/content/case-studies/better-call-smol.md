---
title: "Better Call Smol"
description: "A small, purpose-built advisor that recommends SLM, hybrid, API, or no-AI for any use case - and runs on the same kind of model it recommends."
client: "Better Call Smol (founder-built)"
industry: "AI tooling / developer education"
pubDate: 2026-06-07
role: "Founder & engineer"
variant: "B"
color: "blue"
duration: "1 week of build, May 2026"
tags: [small-language-models, fine-tuning, oumi, llama-3, next-js]
heroQuote: "It wouldn't land right if I had to use Claude to answer the question."
heroQuoteAttribution: "Jay Smith, on why the SLM advisor had to be an SLM"
metrics:
  - value: "879"
    label: "training examples (786 train + 93 test)"
  - value: "3B"
    label: "parameters - Llama-3.2-3B-Instruct, LoRA-fine-tuned"
  - value: "6"
    label: "decision categories the model routes between"
stack: [python-3.11, llama-3.2-3b, oumi-lora, anthropic-sdk, huggingface, next-js, netlify]
heroImage: "/case-studies/SmolModels.png"
draft: false
---

## The brief

Most teams reaching for AI start at the wrong end of the catalog. They wire up a frontier API for a task that a 3B-parameter model would solve at 1% of the cost, or they spin up a self-hosted LLM for a workload that didn't need a model at all - a deterministic script, a form, a lookup. The decision tree is real but unowned: nobody publishes "here is when an SLM beats an API for your situation," because the people who could publish it sell one or the other.

Better Call Smol is the missing tree, embodied as a tool. Describe a use case in plain English - *"internal HR Q&A bot, 5,000 requests a month, $500 budget"* - and the advisor returns one of six recommendations (SLM-only, Hybrid, API-only, Just-prompt-for-now, Automation, or No-AI) with a one-paragraph cost-and-footprint sketch underneath. Strategic guidance, not engineering specs. The user takes the recommendation and goes shopping themselves.

## The thesis

> Small, purpose-built models can replace big-API calls for narrow advisory tasks - and the most credible proof is a tool that does its own job that way.

The temptation, building this, was to back the bot with Claude or GPT-4 and ship in a weekend. That tool would have worked. It also would have been a sales pitch for the opposite of what it was selling: *"trust me, you don't need a frontier model - answered by a frontier model."* The point of the project is that the medium is the message. A 3B-parameter LoRA fine-tune running on modest hardware is the demonstration; the recommendations are the side effect.

## How we built it

**Stack at the surface.** Python 3.11 for the data pipeline, Oumi for the LoRA SFT run on Llama-3.2-3B-Instruct, Hugging Face for dataset hosting, a Next.js + Netlify frontend that hits an Oumi-hosted inference endpoint, and Anthropic's Claude Sonnet 4.6 used *only at dataset-generation time* - never at user inference. The one non-obvious choice: Claude generates the training data, but the final product never calls Claude. That separation is the whole project.

**Where the work was.** The bot has to produce structured output a downstream UI can render - a bolded recommendation line followed by `Why:`, `Cost:`, `Footprint:`, `Next:`. With a 3B model and ~880 examples, schema discipline is fragile. The fix is layered: a strict schema validator (`src/dataset/schema.py`) rejects any training row that doesn't match the five-line shape; a math checker (`src/dataset/math_check.py`) catches generated rows whose footprint and cost numbers don't reconcile internally; a dedup pass strips near-duplicates from the synthetic-augmented set; and an Oumi LLM-as-judge rubric (`oumi/judge.yaml`) scores outputs after training. Each layer exists because the previous one wasn't enough.

**The abstraction discipline.** The system prompt that generates training data explicitly forbids product names - "a 3B-class small model," not "Phi-3 mini"; "a low-power mini PC," not a Beelink SKU. Small-model and small-hardware ecosystems move fast enough that hardcoding specifics in training data ages within months. The bot recommends *categories*; the user researches the current best pick. That decision is also captured in `docs/roadmap.md` as the v1/v2 split.

**What the integrations had to survive.** Anthropic's API is the bottleneck during dataset generation - a single bad batch wastes hours of generation budget, which is why the schema and math validators run before anything gets added to the training set. Hugging Face hosts the dataset privately and serves the base model weights. Oumi handles both the SFT run and the inference endpoint, so the same config that trained the model serves it - no separate inference stack to drift.

## What it shipped

- A six-way recommendation engine (SLM-only / Hybrid / API-only / Just-prompt-for-now / Automation / No-AI) for any freeform use-case prompt.
- A reproducible synthetic-data pipeline that augments 19 hand-written anchor examples into 879 schema-clean training rows, with validators that refuse to ingest malformed or math-broken generations.
- A Llama-3.2-3B LoRA fine-tune (r=16, α=32, 3 epochs, bf16) trained via Oumi against the curated dataset.
- A Next.js demo frontend with a mascot-led chat UI, structured response card, and Formspree-backed lead capture - deployed on Netlify, served by an Oumi inference endpoint.
- A published roadmap that names what *isn't* in v1 (concrete product picks, multi-turn refinement, cost calculator) and why each is deferred.

## What it changed

The honest framing, pre-launch: the change is the existence proof itself. Every other tool answering this question is either a vendor's white paper (biased toward what the vendor sells) or a frontier-model chat session (biased toward telling you to use a frontier model). Better Call Smol is the first artifact in the category whose architecture is itself the argument - a 3B model recommending 3B models, served at a cost the recommendation says is achievable. A buyer who runs three prompts through it and watches the answer come back *"you don't need an API for this"* has learned something a slide deck could not have taught them.

## What we'd still tell you

v1 stays at the category level on purpose. If you want a concrete pick - *which* 3B model, *which* mini PC SKU, *which* VPS - the bot will tell you the shape but not the brand. That's a deliberate v2 problem, deferred until the platform is mature enough to maintain a live catalog (RAG over a curated index, or tool-use against Hugging Face and a hardware database). It's also single-turn today: ask once, get an answer. Multi-turn clarification - the bot pushing back when constraints contradict - is v3. And the model itself is hosted on Oumi for now; the self-host migration to vLLM or llama.cpp on a $400 mini PC is the line the roadmap is built around. Until that ship date, the demo is honest about what it is: the right answer to the question of which model to use, served by a model small enough to be the answer.
