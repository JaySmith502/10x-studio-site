---
title: "ClickyWin - porting a viral Mac AI tutor to Windows, solo"
description: "A one-engineer Python/PySide6 port of Farza's Clicky brings a screen-aware voice tutor to Windows 11 without a rewrite team."
client: "Self-built - open source"
clientUrl: "https://github.com/JaySmith502/clicky-win"
industry: "AI developer tools / consumer desktop"
pubDate: 2026-06-07
role: "Founder & engineer"
variant: "B"
color: "blue"
duration: "3-day port, ongoing build"
tags: [windows, python, pyside6, claude, voice-ai, screen-capture, cloudflare-workers, open-source]
heroQuote: "A viral Mac AI tool doesn't need a rewrite team to reach Windows. One engineer, a PRD, and a tight Python port gets you there."
heroQuoteAttribution: "Jay Smith, founder & engineer"
metrics:
  - value: "7,751 → 1,300"
    label: "Swift → Python lines, the entire port so far"
  - value: "0"
    label: "API keys in the shipped binary"
  - value: "MIT"
    label: "licensed, open source from day one"
stack: [Python 3.12, PySide6, Cloudflare Workers, Claude Sonnet 4.6, AssemblyAI, ElevenLabs]
heroImage: "/case-studies/clicky-win.png"
draft: false
---

## The brief

Farza's [Clicky](https://github.com/farzaa/clicky) blew up on X in early 2026 - a Mac menu-bar AI tutor that watches your screen, listens for a push-to-talk question, and talks you through the next step in DaVinci, Blender, Photoshop, Unreal, or whatever you're learning. It's the most natural framing of "AI as a friend sitting next to you" anyone has shipped. The catch: it's Swift, AppKit, ScreenCaptureKit. **It does not run on Windows.**

That's a problem because most of the people who would benefit from learning-by-doing with an AI tutor - clients in presentation rooms, the Windows-majority developer community, anyone learning unfamiliar software on the OS they actually use - never get to touch it. A demo audience on Windows hears about Clicky and watches the YouTube video. They don't get to run it.

ClickyWin closes that gap. It's a Windows 10/11 system-tray port that delivers the same conversational loop - hold Ctrl+Alt to talk, see a live waveform, release to send your transcript and a screenshot of every monitor to Claude, hear the response stream back through ElevenLabs - without shipping a single API key in the binary. Open source. MIT-licensed. Solo build.

## The thesis

> A viral Mac AI tool doesn't need a rewrite team to reach Windows. One engineer, a PRD, and a tight Python port gets you there.

The lazy version of this project is "wait for someone to do it in Electron." The wrong version is "rewrite it in Rust + Tauri because that's what's trendy." Both miss the point: the hard part of Clicky isn't the UI framework, it's the push-to-talk + streaming-transcript + multi-monitor-screenshot + streaming-LLM + interruptible-TTS state machine. Get that state machine clean in a language you can iterate in fast, on a UI toolkit (PySide6) that actually exposes the low-level keyboard hooks Windows needs, and you ship. Skip the parts that don't matter to the v1 user - the flying blue cursor overlay, the coordinate-pointing across monitors - and defer them as v2.

That's what ClickyWin is. The Mac source (7,751 lines of Swift) sits in the repo as a reference. The Windows port is ~1,300 lines of Python so far, and the shared Cloudflare Worker proxy is 141 lines of TypeScript that ships unchanged from upstream.

## How we built it

**PRD first, code second.** Before the second commit on the port, `docs/PRD.md` was checked in - 40+ user stories, an explicit "what's in v1 / what's deferred to v2" cut, named implementation decisions (PySide6 over Electron over Tauri, `uv` for package management, PyInstaller `--onedir` for distribution). Every subsequent commit traces back to a story in that document. The PRD is the spine; the code follows.

**Stack at the surface.** Python 3.12 with PySide6 (Qt6, LGPL) for the tray, panel, and waveform. `sounddevice` + `numpy` for PCM16 mic capture. `pynput` for a strict modifier-only Ctrl+Alt push-to-talk hotkey that doesn't collide with the user's existing Ctrl+Alt+X shortcuts. `mss` for multi-monitor screenshots at physical-pixel resolution on high-DPI displays. `httpx` for Claude's SSE stream, `websockets` for AssemblyAI's realtime transcription socket. PySide6 over Electron - chosen because Electron's `globalShortcut` swallows the keys you need and can't distinguish modifier press from release.

**Where the work was.** The state machine. A push-to-talk session has to: open a websocket to AssemblyAI before the user has finished pressing the modifier, stream PCM16 chunks the moment audio arrives, render a 60fps waveform without blocking the audio thread, finalize the transcript the instant the user releases the modifier, capture every monitor without putting the panel in the screenshot, post to Claude with conversation history capped at ~20 turns, stream the response back into the panel as it arrives, play ElevenLabs TTS in parallel, and cancel the whole pipeline cleanly when the user mashes Ctrl+Alt again to interrupt. Every transition has to be cheap, ordered, and idempotent. The PySide6 signal/slot system carries the marshaling; a small `VoiceState` enum is the source of truth.

**What the integrations had to survive.** Three external APIs: Anthropic Claude (vision + streaming chat), AssemblyAI (realtime streaming transcription), ElevenLabs (TTS). All three are proxied through a Cloudflare Worker that holds the real secrets - the desktop binary never sees an API key. The Worker is 141 lines and unchanged from Farza's upstream, which is the point: when the Mac version's proxy is already good, you don't rebuild it, you reuse it. AssemblyAI tokens are short-lived (480s) and fetched fresh per session; Anthropic SSE blocks include forward-compatible handling for `tool_use` content types so a future MCP build won't crash a shipped binary.

**The lineage decision.** The vendored Swift source stays in the repo, in its original `leanring-buddy/` folder (yes, that typo is in the upstream - it stays). Reading the Mac source is the fastest way to understand the intended behavior of any subsystem before porting it. The Python modules are named to map one-to-one with the Mac concepts - `hotkey.py`, `mic_capture.py`, `state.py`, `ui/` - so a contributor who knows the Mac app can find the Windows equivalent in seconds.

## What it shipped

*ClickyWin is mid-flight. Phase 3.1 is landed - tray, panel, hotkey, and live mic-capture-to-waveform - and the streaming Claude client, multi-monitor screenshots, ElevenLabs playback, and interrupt handling are the next wave, scoped and queued in the PRD. The bullets below describe v1 PRD scope; they'll be tightened once v1 actually ships.*

- System-tray Windows app with no installer - unzip and double-click `ClickyWin.exe`.
- Global Ctrl+Alt push-to-talk that works while focused on any other Windows app, with strict modifier-only matching so it doesn't interfere with Ctrl+Alt+X muscle memory.
- Live waveform and interim transcript in a dark, frameless panel anchored to the tray icon, auto-dismissed by click-outside or Escape.
- Multi-monitor screen awareness - every connected display captured per turn, with the cursor's current monitor flagged as the primary focus.
- Streamed Claude responses (Sonnet 4.6 default, Opus 4.6 optional) with ~20-turn conversation memory and clean interruption on a second Ctrl+Alt press.
- Natural-voice TTS playback via ElevenLabs running in parallel with the on-panel response stream.
- Zero API keys in the binary - every external call routed through a shared Cloudflare Worker proxy that the user deploys to their own account.

## What it changed

The felt change is small and specific: a Windows developer watching the Mac Clicky demo on YouTube and not being able to run it - versus the same developer holding Ctrl+Alt in DaVinci Resolve and getting walked through their first LUT in real time, on the OS they actually own. That gap is closed. For the Windows-majority dev community, "screen-aware voice tutor" stops being a Mac luxury and starts being a thing you can pip-install and ship.

The community change is the open-source one. There is no other MIT-licensed, screen-aware, voice-driven AI tutor for Windows. ClickyWin is the first reference implementation, and the lineage to Farza's upstream Mac app is preserved deliberately - both the original Swift source and the matched-name Python modules stay in the repo - so the next person porting an AI desktop tool across platforms has both the source and the spec to learn from.

## What we'd still tell you

ClickyWin is open and unfinished. As of this writing the tray, panel, hotkey, and live mic-capture-to-waveform path are landed (Phase 3.1); the Claude streaming client, screenshot capture, ElevenLabs playback, and interrupt handling are scoped in the PRD but not yet wired. The flying blue cursor overlay that makes the Mac version visually iconic is explicitly out of v1 scope - that's a v2 problem once the conversational core is proven. If you're evaluating this as a reference for your own Windows-native AI desktop work, read `docs/PRD.md` first, then `clicky-py/clicky/app.py`. The lineage to Farza's upstream Mac app is preserved deliberately so the next person porting an AI desktop tool across platforms has both the source and the spec to lear
n from.
