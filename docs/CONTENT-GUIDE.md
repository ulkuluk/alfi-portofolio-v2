# Content Guide

Checklist to use when writing or reviewing content for this site.
Rules come from the original brief (sections 2, 4, and 9).

---

## Voice and positioning

- [ ] First person, plain sentences, concrete nouns, short paragraphs.
- [ ] Humble but not self-deprecating. "I haven't done X yet" is fine.
- [ ] **No banned words:** passionate, rockstar, ninja, guru, expert,
      cutting-edge, seamless, leverage, synergy.
- [ ] No skill-percentage bars, no star ratings, no metric tiles (e.g. "uptime 99.9%").
- [ ] No expertise claims ("expert", "senior") and no certifications
      unless explicitly confirmed.

---

## Facts and accuracy

- [ ] Do not invent facts, metrics, dates, employers, certificates, or links.
- [ ] Anything inferred (not stated in the source material) gets a
      `{{TODO: confirm}}` marker and an entry in `docs/CONTENT-TODO.md`.
- [ ] Do not use the word "production" unless the fact sheet or you yourself confirm it.
- [ ] Numbers from internal systems (users, hit ratios, latency) must be
      confirmed and approved before publishing.
- [ ] Separate what you did alone ("I") from what the team did ("we").
      If unsure, use a TODO.

---

## Safety and privacy

- [ ] **Never include:** credentials, tokens, passwords, API keys, cloud account
      or org IDs, bucket names, internal hostnames, IP addresses, private repo
      URLs, employee names, or screenshots that reveal internal data.
- [ ] Kumparan case studies (OpenBao Migration, Image Pull-Cache Mirror) need
      manager or company approval before the site goes public.
- [ ] Screenshots (if added later) must be cropped and sanitised. Use the optional
      `<figure>` slot in the case-study layout; do not embed raw screenshots.

---

## Case study structure (`src/content/projects/*.md`)

Every case study follows this four-part structure. The build fails if a required
heading is missing.

```
## Background    ← what was the context?
## Challenge     ← what problem needed solving?
## Approach      ← what I did and why
### Key decisions  (bullets: decision → reason → trade-off)
## Outcome       ← what resulted, honestly scoped
### What I learned
### What I'd do next
```

- [ ] 250–450 words per case study (outside that range only warns, does not fail).
- [ ] "How it went" has 5–8 numbered steps (enforced by the build).
- [ ] `status` field is precise: e.g. "PoC validated", "Deployed to UAT", not "done".
- [ ] `summary` is one sentence about the **problem**, not the tech.
- [ ] Stack tags are in `stack: []` front matter, not hard-coded in the body.
- [ ] Diagram is an inline SVG at `src/assets/diagrams/<slug>.svg`.
  - Uses only CSS classes from `global.css` (no `style` attributes — CSP blocks them).
  - Has `<title>` and `<desc>` for accessibility.
  - Works in both light and dark mode (uses `--text`, `--border`, etc.).
  - Marked `{{TODO: review diagram for accuracy}}` until you confirm it.

---

## Skills (`src/content/skills.yaml`)

- [ ] Three levels only: `hands-on` (used in a real project), `familiar`, `exploring`.
- [ ] No percentage bars. No star ratings.
- [ ] A skill lists `projects:` slugs only if you actually used it there.
- [ ] A new skill category must be added to the `category` enum in `src/content.config.ts`.

---

## Experience (`src/content/experience/*.md`)

- [ ] `order` sets display position (newest = 1).
- [ ] `project:` slug links to a case study page; leave blank if there is none.
- [ ] Bullets describe techniques and reasoning, not proprietary internal details.
- [ ] Dates are confirmed (no guesses).

---

## Learning (`src/content/learning.yaml`)

- [ ] Three types: `timeline` (past milestones), `current` (actively working on),
      `next` (planned).
- [ ] Mark anything uncertain with `{{TODO: confirm}}`.
- [ ] "Currently learning" and "Next up" reflect reality, not aspiration.

---

## After writing

1. Run `npm run check:todo` — it must list only items you intentionally left open.
2. Update `docs/CONTENT-TODO.md` to match the output.
3. Run `npm run build` — a missing or invalid field fails with a readable error.
4. Run `npm run lhci` — Lighthouse budgets must stay ≥ 95 in all four categories.
