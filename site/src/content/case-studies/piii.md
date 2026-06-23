---
title: "The PII never leaves your browser"
description: "PiiI is an open-source Chrome extension that detects and aliases personal data in your prompts - entirely on your machine, with no server, no API, and no telemetry."
client: "PiiI (founder-built open-source project)"
clientUrl: "https://github.com/JaySmith502/piii"
industry: "Developer tools / Privacy"
pubDate: 2026-06-23
role: "Founder & engineer"
variant: "B"
color: "blue"
tags: [privacy, pii, chrome-extension, local-first, onnx, llm-safety]
heroQuote: "The safest place for your data is the place it never leaves."
heroQuoteAttribution: "Jay Smith, founder"
metrics:
  - value: "0"
    label: "network calls in the detection path"
  - value: "10"
    label: "categories of PII caught in one pass"
  - value: "6"
    label: "AI chat platforms supported"
stack: [TypeScript, React, Vite, "onnxruntime-web", "Chrome MV3"]
heroImage: "/case-studies/PiiI.png"
draft: false
---

## The brief

Pasting a customer email, a contract clause, or a raw stack trace into ChatGPT is the fastest way to leak data you never meant to share. The text is gone the instant you hit send - into someone else's model, someone else's logs, someone else's retention policy. Everyone knows this. People do it anyway, dozens of times a day, because the alternative is to stop and hand-scrub every prompt, and nobody has time for that.

The tools that promise to fix this mostly make the problem worse in a quieter way. Enterprise DLP and "prompt firewall" products route your text through *their* server to redact it - which means the exact data you were trying to protect now passes through a second company you also have to trust. You haven't removed the exposure; you've added a party to it. PiiI exists because the job that actually needs doing - *find the personal data in this prompt and swap it for an alias before it leaves* - does not require a server at all.

## The thesis

> The safest place for your data is the place it never leaves.

Every server-side redaction tool asks you to solve a privacy problem by sharing your data with one more vendor. That trade is backwards. The only redaction you can fully trust is the one that happens before anything goes over the wire - on hardware you already control, in code you can read.

PiiI refuses the backend on purpose. Detection and machine-learning inference both run inside your browser tab. The only thing that ever leaves is the redacted prompt you reviewed and approved. There is no API to rate-limit, no account to breach, no telemetry endpoint quietly collecting the very strings you were masking. That absence is the architecture - and it is the whole reason the privacy claim is checkable rather than promised.

## How we built it

**Stack at the surface.** A Chrome Manifest V3 extension in TypeScript (~3,750 lines across ~50 files), React for the popup and in-page review UI, Tailwind for styling, Vite + `@crxjs/vite-plugin` for the MV3 build, Vitest for the test suite. Detection runs two ways in one pass: hand-written regex for structured data, and a local ONNX named-entity model for the unstructured kind. No backend appears anywhere in the repo, because there isn't one.

**Where the work was: running a model inside a browser extension.** MV3 service workers can't load `onnxruntime-web`, so the NER model can't live where the rest of the extension logic does. PiiI runs it in a dedicated *offscreen document* and bridges detection requests to it through the background worker. The model itself - `onnx-community/multilang-pii-ner-ONNX` - downloads once from the Hugging Face CDN on first run, gets cached by the browser, and from then on every inference is offline and local. The one network request in the product's entire lifecycle carries no prompt text; after it, the wire goes quiet for good.

**Where the work was: merging two detectors without double-counting.** Regex is exact and fast for the eight structured categories - email, phone, SSN, credit card, API key, account/ID number, URL, date. The NER model catches the two that regex can't - names and addresses - and overlaps on the rest. The hard part is the merge: reconciling spans from both detectors into one clean set of redactions so the same value isn't flagged twice or split down the middle. That merge step is the quiet center the rest of the pipeline orbits.

**Where the work was: failing closed on files.** Attachments are the easy way to leak a whole spreadsheet at once, so PiiI scans them too - `.txt`, `.csv`, `.md`, `.log`, `.json`, `.docx` (via mammoth), and `.pdf` (via pdfjs-dist) - for the same categories, capped at 50,000 characters. The rule is fail-closed: if a file can't be parsed, it's blocked, not waved through. A redaction tool that silently passes the input it couldn't read is worse than no tool at all.

**What the integrations had to survive.** There are only two external dependencies, and both are deliberate. The Hugging Face CDN serves the model weights once; nothing about your prompts rides along. `onnxruntime-web` runs that model in WASM, locally, so inference never becomes a network call. Everything else - the alias map, the audit log, the whitelist - lives in `chrome.storage.local` on your machine and is never synced anywhere.

## What it shipped

- Intercepts your prompt the moment you hit send on a supported platform, *before* the message leaves the page.
- Detects ten categories of PII in a single pass - eight by regex, names and addresses by a local NER model.
- Proposes an alias for each detected value (`[NAME_1]`, `[EMAIL_1]`, ...) and lets you accept, edit, or send the original after a review step.
- Keeps a local alias map per conversation, so the model's replies still make sense to you.
- Scans attached files (`.txt`, `.csv`, `.md`, `.log`, `.json`, `.docx`, `.pdf`) before they upload, and fails closed on anything it can't parse.
- Logs every detection and your chosen action to a local audit trail you can export to CSV, plus a whitelist for terms you never want flagged again.
- Works across six AI chat platforms: ChatGPT, Claude, Gemini, Copilot, Perplexity, and DeepSeek.

## What it changed

The change is structural, not statistical - this is a new project, and the honest headline is the architecture, not an adoption number. PiiI turns "hit send and hope" into a one-second review step that happens on your own machine. The moment before a prompt leaves your browser - previously invisible and irreversible - becomes a place where you can see exactly what was detected, decide what to mask, and confirm that the only thing crossing the wire is the version you approved.

The deeper change is what you no longer have to trust. With a server-side redactor, "your data is safe" is a sentence you have to take on faith. With PiiI, it's a property you can verify: open the network tab, watch detection happen, and see that nothing leaves.

## What we'd still tell you

PiiI is deliberately scoped, and the README says so out loud. Grok isn't supported - its composer is unreachable from the content script's isolated world, and that adapter sits shelved rather than half-working. The first prompt on a fresh install waits a few seconds while the model downloads. The detection is multilingual, but the UI is English-only for now. And it isn't on the Chrome Web Store yet - you build it and load it unpacked, which is honest about where the project is: shipped and working, not yet packaged for one-click install.
