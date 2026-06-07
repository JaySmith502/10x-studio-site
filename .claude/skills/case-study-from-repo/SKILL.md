---
name: case-study-from-repo
description: Read a target repository and produce a draft case-study markdown (plus a research sidecar) for the 10x Studio site. Hybrid interactive — asks ~5 critical questions only the operator knows, fills the rest from repo extraction with smart placeholders. Trigger when the user invokes /case-study-from-repo or says "make a case study from this repo".
user-invocable: true
---

# case-study-from-repo

Turn a Git repository into a 10x Studio case-study draft.

## Inputs

- **Required:** path to a repo on disk. Accept it from `$ARGUMENTS`, or if not provided, ask:
  > "Path to the repo you want a case study for?"
- Optional: a slug/short-name override (default: derive from the repo's directory name, kebab-cased).

## Output

Two files in `<repo-root-of-10x-studio-site>/case-study-drafts/`:

1. `<slug>.md` — the draft case-study, frontmatter matching the site's `case-studies` content collection schema, body seeded from the repo with `<<< FILL IN: ... >>>` placeholders for anything not extractable.
2. `<slug>.research.md` — research sidecar capturing every fact the skill extracted from the repo. This is the user's reference for fact-checking the draft.

Never write into `site/src/content/case-studies/` directly. Drafts only — the user copies them over after review.

## Workflow

Run these steps in order. Do not skip steps. Do not ask questions during steps 1–4.

### 1 — Read the repo

Use Bash, Read, and Grep. Don't read entire large files — sample first/last lines and grep for signals.

Extract:

- **README:** read fully (cap at first ~400 lines). Note the stated purpose, install steps, and any public claims about the project.
- **Stack manifest** — check for the first one of these that exists, read fully:
  - `package.json` (Node/TS) — record `name`, `description`, top-level deps, scripts.
  - `pyproject.toml` / `requirements.txt` / `setup.py` (Python) — record deps.
  - `Cargo.toml` (Rust)
  - `go.mod` (Go)
  - `Gemfile` (Ruby)
  - `composer.json` (PHP)
  - `pubspec.yaml` (Dart/Flutter)
- **Top-level structure** — `ls -la` at root + one level deep on `src/`, `app/`, `packages/`, `services/` if present.
- **Git history:**
  - `git log --reverse --format="%ad" --date=short | head -1` → first commit date
  - `git log -1 --format="%ad" --date=short` → last commit date
  - `git rev-list --count HEAD` → total commits
  - `git shortlog -s -n --all` → contributors
  - `git log --format="%ad" --date=format:%Y-%m | sort | uniq -c | sort -rn | head -3` → busiest months
- **Spine files** — identify 5–10 representative files (heuristics):
  - Entry points: `src/index.*`, `src/main.*`, `src/app.*`, `main.py`, `cli.py`, anything in `bin/`
  - Schemas/models: anything under `models/`, `schemas/`, `prisma/schema.prisma`, `*.proto`, `db/migrations/*` (latest one)
  - Routes/APIs: `routes/`, `api/`, `controllers/`, `handlers/`
  - Read the top ~50 lines of each to understand shape, not behavior.
- **External integrations** — grep for SDK/API signals across the repo (case-insensitive):
  - `anthropic`, `openai`, `langchain`, `pinecone`, `chromadb`, `huggingface` — AI/ML
  - `stripe`, `paypal`, `square` — payments
  - `hubspot`, `salesforce`, `pipedrive` — CRM
  - `aws-sdk`, `boto3`, `@azure/`, `@google-cloud/` — cloud
  - `twilio`, `sendgrid`, `resend`, `postmark` — comms
  - `prisma`, `drizzle`, `sequelize`, `sqlalchemy`, `mongoose` — db
  - `next`, `astro`, `remix`, `react`, `vue`, `svelte` — frontend
  - `fastapi`, `express`, `fastify`, `flask`, `django` — backend
- **Tests / CI:** presence of `test/`, `tests/`, `__tests__/`, `spec/`, `.github/workflows/`, `.gitlab-ci.yml`, `pytest.ini`.
- **Counts:** total file count and rough LOC by extension. Use `find` + `wc -l` per extension, cap top 5.

Sample LOC command:
```bash
find . -type f \( -name '*.py' -o -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.go' -o -name '*.rs' -o -name '*.java' \) -not -path './node_modules/*' -not -path './.git/*' -not -path './dist/*' -not -path './build/*' -not -path './venv/*' -not -path './.venv/*' | xargs wc -l 2>/dev/null | tail -1
```

If the repo has Jupyter notebooks, **note them but don't try to read them** — they're noisy and slow.

### 2 — Write the research sidecar

Write `<repo>/case-study-drafts/<slug>.research.md` using the template at `templates/research.md.tmpl` in this skill. Fill every section with extracted facts. If a section has no signal, write `(none detected)`. The sidecar must be honest — it's the user's fact-check reference.

### 3 — Make a first-draft case-study guess

Before asking questions, draft your best guess at:

- **Project purpose** in one sentence (derived from README + stack)
- **Likely problem statement** (what operational pain does this kind of project usually solve?)
- **Likely variant fit** — A/B/C reasoning:
  - **A (Story arc)** if there's a clear time-bounded transformation (8 weeks, before-state visible in git history)
  - **B (Thesis-as-hero)** if there's a strong opinionated claim the work proves (AI accountability, security rigor, etc.)
  - **C (System/scope)** if the project spans many users/brands/locations/instances
- **Best-guess metric placeholders** based on the project type
- **Stack badges** (the 3–5 most credibility-relevant entries from extraction)

### 4 — Ask the 5 critical questions

Use the AskUserQuestion tool. Ask all 5 in a single call (multiple questions parameter). Phrase each question with the skill's best-guess answer as the first option so the user can accept with one click.

1. **Client framing**
   - A) 10x Studio built this *for* a client (vendor/partner role)
   - B) You are the founder/owner of this project (self-built)
   - C) You contributed to someone else's project (collaborator)

2. **Naming**
   - A) Name and link to the client/project
   - B) Anonymize ("A national fintech," etc.)
   - C) Mixed — name the project but anonymize the client

3. **Thesis — one sentence**
   - Free-form: "What is the *one claim* this case study should prove?"
   - Seed with the best-guess thesis you drafted in step 3.

4. **Headline metric**
   - Free-form: "What's the single most powerful number — and is it shareable? Examples: 70% faster, 12 weeks → 4 days, 99.98% uptime, 4× revenue. If nothing shareable, type 'skip'."

5. **Variant + colorway**
   - Variant: A (Story arc) / B (Thesis-as-hero) / C (System/scope) — seed with your best guess.
   - Color: Blue / Red / Yellow — recommend Blue by default unless the user says otherwise.

### 5 — Write the case-study draft

Write `<repo>/case-study-drafts/<slug>.md` using the template at `templates/case-study.md.tmpl`. Substitute:

- Answers from step 4 directly into frontmatter
- Repo extraction facts into the body where they fit
- Best-guess copy where the repo gives you the shape
- `<<< FILL IN: ... >>>` placeholders for everything else, with the *specific* fact needed in the placeholder text

Voice rules (mirror the site):

- Sentence-case headlines, heavy display weight.
- Eyebrow markers in monospace UPPERCASE (`// EYEBROW`).
- No emoji. No "digital transformation," "unlock," "next-gen," "AI-powered everything."
- Confident, declarative, engineering-literate. Never hedge with "we think."
- The principle quote on Variant B is *the* moment — make it sharp.

### 6 — Report

Print to the user:

- ✓ Wrote `case-study-drafts/<slug>.md`
- ✓ Wrote `case-study-drafts/<slug>.research.md`
- One-paragraph summary of what the draft says
- A short "What's still placeholder" bullet list — every `<<< FILL IN >>>` the user needs to resolve
- Suggested next step: review the research sidecar, fact-check the draft, then copy into `site/src/content/case-studies/<slug>.md` when ready.

## Templates

Reference these in step 2 and step 5:

- `templates/case-study.md.tmpl` — frontmatter + body skeleton
- `templates/research.md.tmpl` — sidecar skeleton

## Constraints (hard rules)

- **Never fabricate metrics.** If you don't have a number, use `<<< FILL IN: metric for X >>>`.
- **Never invent named clients or testimonials.** If the user said "anonymize," strip all proper nouns from the draft.
- **Never write outside `case-study-drafts/`.** Especially do not write into `site/src/content/case-studies/`.
- **Never modify the target repo.** Read-only access. No writes, no commits, no branch switches.
- **If the target repo path is invalid or empty,** stop and ask for a corrected path — don't guess.
- **If the user types `skip` for the headline metric,** omit the metrics array from frontmatter entirely; don't fake one.
