---
title: "AI as engineering, not theater"
description: "On the difference between adding AI to your product and engineering AI into your operation — and why most consulting work is the wrong one."
pubDate: 2026-05-03
author: "Jay Smith"
tags: ["ai", "automation", "engineering"]
kind: "essay"
heroSet: "ai"
draft: false
---

The most common request I get right now is some variation of "we want to add AI." Sometimes it's framed as a feature ("can we put a chatbot on the site"), sometimes as a department-wide goal ("we need to be an AI-first company"). Almost never is it framed as the question that would actually matter, which is: *which decisions in our operation are being made worse than they need to be, and would a language model make them better?*

That gap — between "add AI" and "engineer AI into the decision points that matter" — is where most AI consulting work goes sideways.

## The theater problem

Most AI projects fail the same way bad analytics dashboards fail. Someone builds the thing, it ships, it gets a press release, and then nobody uses it because it doesn't actually slot into anyone's daily work. The model is impressive. The interface is fine. But the workflow underneath was never redesigned to take advantage of it, so the operator's day is exactly as hard as before, except now they also have to remember to check the AI panel.

This is AI as theater: visible, expensive, and uncoupled from the operation. It works for a marketing site. It does not work as software.

## The engineering version

The engineered version starts in the opposite place. Instead of asking "where can we put AI," you ask:

- **Where is human attention currently the bottleneck?** Intake triage, document review, lead qualification, support tier-1, summarization of long threads — these are workflows where a model can do 80% of the work and a human can do the 20% that requires judgment.
- **Where is the cost of being slightly wrong manageable?** Drafting, summarization, classification, search — yes. Pricing, legal, compliance decisions — almost never, at least not without an explicit human in the loop and an audit trail.
- **What's the failure mode?** Every model decision needs a clear answer to "what happens when this is wrong, and how do we know?" If you can't answer that in a sentence, you don't have a system — you have a liability.

The engineering version of AI is mostly plumbing. Retrieval pipelines that actually return the right documents. Evaluation harnesses that catch regressions before deployment. Guardrails that fail visibly rather than silently. Logging that lets you reconstruct any decision the system made. None of this is glamorous. All of it is what separates a production system from a demo.

## What this looks like in a real engagement

For a recent automation engagement, the goal sounded simple: reduce the time the executive team spent triaging email. The theater version of this is "put GPT in the inbox." The engineered version was a routing pipeline that read each thread, scored it against ten learned categories, applied labels and routed responses to the right person, and surfaced exactly the threads that genuinely needed an executive's eyes — about 12% of the total. Email triage time dropped 70%. The model itself was the smallest part of the work.

The lesson, every time, is the same. AI is valuable when it's wired into a workflow with an honest understanding of what the workflow is supposed to produce. It's expensive theater when it isn't.

If you're starting an AI project and the first conversation is about the model, you're starting in the wrong place. The first conversation should be about which decisions are being made worse than they need to be — and only then about whether a model is the right tool to fix it.
