# Content TODO

Every `{{TODO ...}}` placeholder in the repo, grouped by file.
Run `npm run check:todo` to see the live list; the sections below must stay in sync
(43 placeholders in 15 files as of the last update).

> **CI note:** `check:todo` runs as a non-blocking warning in CI. The main branch
> deploy fails on any unresolved TODO unless `ALLOW_TODO=1` is set as a repo variable.
> Run `npm run check:todo` locally to get the live count; keep this file in sync with it.

---

## Priority: do these first

1. **Domain** — set `url` in `src/config/site.ts` and the `Sitemap:` line in `public/robots.txt`.
2. **City** — set `location` in `src/config/site.ts`.
3. **About paragraph** — add 1–2 sentences on what drew you toward infrastructure.
4. **Skills and learning** — confirm every level and timeline entry.
5. **Kumparan approval** — get written sign-off before the site goes public.

---

## General (not tied to a file)

- [ ] Get approval from my manager or the company before publishing the Kumparan
      case studies (OpenBao Migration, Image Pull-Cache Mirror) and the Kumparan
      experience bullets.

---

## `src/config/site.ts`

- [ ] `url` (line 8): set the real domain (no trailing slash)
- [ ] `location` (line 17): city
- [ ] `availability.text` (line 33): confirm availability status
      (the line is hidden while `availability.show` is `false`)
- [ ] `about.paragraphs[0]` (line 38): add 1–2 sentences on what drew you
      toward infrastructure and reliability

---

## `public/robots.txt`

- [ ] Replace `example.com` with the real domain (both the `Allow` comment and
      the `Sitemap:` line)

---

## `src/content/experience/`

- [ ] `kumparan-sre.md` (line 9): confirm "evaluation" vs already live — the
      OpenBao case study says it is in production
- [ ] `petepete-devops.md` (line 4): confirm the end date — this file says
      Nov 2026, the case study says October 2026
- [ ] `petepete-devops.md` (line 7): confirm the infrastructure bullet
- [ ] `kai-web-intern.md` (line 8): confirm the 5,000 concurrent users figure
      and its context

---

## `src/content/skills.yaml`

- [ ] Hands-on group (line 8): confirm the level of every skill in this group
- [ ] `gcp`, `nodejs`, `postgresql` (lines 97–103): confirm level — these come
      from the KAI web developer internship
- [ ] Familiar group (line 108): confirm the level of every skill in this group
- [ ] Exploring group (line 117): confirm the level of every skill in this group
- [ ] `k8s-cert` (line 123): pick what is actually true about a Kubernetes
      certification path

---

## `src/content/learning.yaml`

- [ ] Timeline, last item (line 34): describe what "now" means
- [ ] Currently learning (line 40): add what you are learning right now
- [ ] Next up — monitoring (line 52): confirm SLOs are on the list
- [ ] Next up — certification (line 60): pick what is true

---

## `src/content/projects/openbao-migration.md`

- [ ] How it went (line 29): confirm the order of steps
- [ ] Outcome (line 47): confirm whether Vault was fully retired or runs alongside
- [ ] What I'd do next (line 56): add your own next steps

---

## `src/content/projects/image-pull-cache-mirror.md`

- [ ] How it went (line 29): confirm the order of steps
- [ ] What I'd do next (line 55): add your own next steps

---

## `src/content/projects/petepete-infrastructure.md`

- [ ] `status` (line 9): confirm current status (dev/UAT, or further?)
- [ ] Background (line 29): confirm whether you built it alone or with help
- [ ] How it went (line 39): confirm order of steps
- [ ] Outcome (line 59): what the team achieved, and scale
- [ ] What I learned (line 64): confirm `NEXT_PUBLIC_*` values are baked in at build time

---

## `src/content/projects/devops-bootcamp-final-project.md`

- [ ] `status` (line 9): confirm the final outcome of the bootcamp project
- [ ] `stack` (line 12): confirm tags, especially GitLab CI
- [ ] Background (line 20): name the other (monolith) project
- [ ] How it went (line 30): confirm order of steps and any problems you hit
- [ ] How it went, step 2 (line 33): how `deploy.sh` applies the overlay
- [ ] How it went, step 4 (line 35): confirm the image is retagged, not rebuilt
- [ ] How it went, step 7 (line 38): whether dashboards cover transactions,
      traffic and errors
- [ ] Outcome (line 49): describe the final outcome
- [ ] What I learned (line 53): add your own lessons

---

## Diagrams: review for accuracy

Each project SVG in `src/assets/diagrams/` carries a
`{{TODO: review diagram for accuracy}}` comment (stripped when inlined), so they
appear in `check:todo` under these files:

- [ ] `src/assets/diagrams/openbao-migration.svg` — check the ESO and Reloader flow
- [ ] `src/assets/diagrams/image-pull-cache-mirror.svg` — check the P2P pull flow
- [ ] `src/assets/diagrams/petepete-infrastructure.svg` — check where the CI runner
      lives and how it reaches the VM
- [ ] `src/assets/diagrams/devops-bootcamp-final-project.svg` — check that `deploy.sh`
      and the GitOps repo are drawn as you built them

---

## Not placeholders, but worth doing

- [ ] Optional: add `public/resume.pdf` (the résumé button appears automatically)
- [ ] Optional: add a portrait photo (set `portrait` path in `site.ts`)
- [ ] Optional: add a short "Now" note (`contact.now` in `site.ts`)
- [ ] Set `CLOUDFLARE_PROJECT_NAME` (repo variable) and `SITE_URL` (repo variable),
      plus `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (repo secrets)
      before the first deploy. See `docs/DEPLOY.md` for exact steps.
