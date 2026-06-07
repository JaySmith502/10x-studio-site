# case-study-from-repo

A Claude Code skill that turns a Git repository into a draft case-study for the 10x Studio site.

## What it does

Point it at any repo on disk. It will:

1. **Read** the repo — README, stack manifest, top-level structure, ~10 spine files, git history, integrations scan, tests/CI presence, LOC by language.
2. **Write a research sidecar** (`case-study-drafts/<slug>.research.md`) capturing every extracted fact — your reference for fact-checking the draft.
3. **Ask you ~5 critical questions** that the repo can't answer (client framing, naming, thesis, headline metric, variant + colorway).
4. **Generate a case-study draft** (`case-study-drafts/<slug>.md`) with frontmatter matching the site's `case-studies` content collection, body seeded from the repo, and `<<< FILL IN: ... >>>` placeholders for the parts only you know.
5. **Hand you a checklist** of remaining placeholders to resolve, then you copy the file into `site/src/content/case-studies/<slug>.md` when ready.

## Why a sidecar + draft + placeholders?

Generating a clean case-study in one shot requires inventing details you can't verify. We refuse that trade.

The sidecar is the *audit trail* — every line in the draft should be traceable to either a fact in the sidecar or one of your interactive answers. Placeholders mark the things only you know, so the editing pass is targeted, not a full rewrite.

## How to invoke

In Claude Code:

```
/case-study-from-repo /path/to/your/repo
```

Or just type the slash command and the skill will ask for the path.

## Hard rules

- Never fabricates metrics. Empty number → placeholder, not invention.
- Never invents named clients or testimonials. Anonymize means strip all proper nouns.
- Never writes outside `case-study-drafts/`. Drafts are reviewed by you, then promoted to `site/src/content/case-studies/`.
- Never modifies the target repo. Read-only.

## Re-using this skill in other repos

The skill is project-local at `.claude/skills/case-study-from-repo/`. To use it from another repo, copy the whole `case-study-from-repo/` folder into that repo's `.claude/skills/` directory.

The output schema is currently locked to the 10x Studio site's `case-studies` content collection. If you want to repurpose for a different site, edit `templates/case-study.md.tmpl` to match its frontmatter shape.

## Files

```
case-study-from-repo/
├── SKILL.md                              # The executable skill (Claude reads this)
├── README.md                             # This file (humans read this)
└── templates/
    ├── case-study.md.tmpl                # Draft template
    └── research.md.tmpl                  # Research sidecar template
```
