---
title: "Inheriting a half-built system: how to tell what's salvageable"
description: "A developer left, an agency stalled, or the build just stopped. How to audit an inherited software project honestly - and why 'rewrite everything' is usually the wrong answer."
pubDate: 2026-06-24
author: "Jay Smith"
tags: ["rescue", "custom-software", "engineering"]
kind: "essay"
heroSet: "ops"
draft: true
---

Sooner or later a lot of businesses end up holding software somebody else started. The developer took a full-time job. The agency ran past budget and the relationship soured. The build technically launched but never quite worked, and now it sits there half-finished. The question is always the same: is any of this worth keeping, or do we start over? The honest answer is that most inherited systems are partly salvageable, and the instinct to rewrite everything is usually a reflex - sometimes an expensive one. The real work is figuring out which parts are load-bearing, which are rot, and what it would actually cost to keep versus replace.

## Why "rewrite it all" is the default answer (and often wrong)

When an engineer opens an unfamiliar codebase, the first reaction is almost always "this is a mess, we should rebuild it." Some of that is true. A lot of it is that reading someone else's code is harder than writing your own, so rewriting *feels* faster than understanding. It also happens to be the answer that bills the most hours. None of that means the existing system is actually worthless.

A rewrite throws away two things you already paid for: the working parts, and the accumulated knowledge of every edge case the original team hit. That second one is the expensive part. The weird exception in the billing logic isn't sloppiness - it's usually a real requirement someone discovered the hard way. Rebuild from scratch and you get to rediscover all of it, in production, with customers watching.

## The audit

Before deciding anything, the inherited system gets a short, structured look. Four questions:

- **Does it run, and can we build it?** Can the project be checked out, installed, and started from a clean machine? If getting it running takes a week of archaeology, that tells you something about how the rest will go.
- **Where is the data, and is it sound?** Data outlives code. A clean, well-structured database is worth keeping even if every line of application code gets replaced. A corrupted or incoherent schema is the real reason to start over - and it's a different problem than ugly code.
- **What does it actually do today?** Map the parts that work and are in use, separately from the parts that were started and abandoned. These get treated very differently.
- **What's the failure surface?** Security holes, no tests, no logging, dependencies years out of date. This is what tells you whether the thing is dangerous to keep running, not just unpleasant to work in.

The output of the audit isn't a verdict. It's a map: here's what works, here's what's salvageable with effort, here's what's genuinely not worth keeping, and here's what's actively risky.

## Salvage versus replace

With that map, the decision gets concrete instead of emotional. The usual outcome is not "keep it all" or "burn it down" - it's triage. Stabilize the parts that work and are in use. Replace the specific components that are broken, dangerous, or blocking the thing you actually need. Retire the half-built features nobody finished and nobody misses. Keep the data unless it's the thing that's broken.

A useful test for any individual piece: would rebuilding this cost less than the time we'll lose working around its problems over the next year? If yes, replace it. If no - if it's just unfamiliar, not actually broken - keep it and move on to the part that's blocking you. Most inherited systems have one or two pieces that genuinely need replacing and a lot of pieces that are merely someone else's style.

## What good help looks like here

The signal that you've got the right person looking at an inherited build is simple: they give you an honest map before they give you a quote, and the map distinguishes "this is risky" from "this isn't how I'd have written it." Anyone who opens the codebase and immediately recommends rebuilding everything, without separating the data from the code or the working parts from the abandoned ones, is reading you a script. The fastest path back to a working system is almost never a full rewrite - it's stabilizing what holds, replacing what doesn't, and shipping the piece that was missing all along.
