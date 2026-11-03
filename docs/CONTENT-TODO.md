# Content TODO

Every `{{TODO ...}}` placeholder in the repo, grouped by file. `npm run check:todo` prints the
live list; the sections below must match it (43 placeholders in 15 files at the time of writing).

## General (not tied to a file)

- [ ] Get approval from my manager or the company before publishing the Kumparan case studies
      (OpenBao Migration, Image Pull-Cache Mirror) and the Kumparan experience bullets.

## `src/config/site.ts`

- [ ] `url`: domain
- [ ] `location`: city
- [ ] `availability.text`: confirm availability (the line is hidden while `availability.show` is `false`)
- [ ] `about.paragraphs[0]`: one or two sentences on what made me move toward infrastructure and reliability

## `public/robots.txt`

- [ ] Replace `example.com` with the real domain (also in the `Sitemap:` line).

## `src/content/experience/`

- [ ] `kumparan-sre.md`: confirm "evaluation" vs already live (the OpenBao case study says it is in production)
- [ ] `petepete-devops.md`: confirm the end date (this says Nov 2026, the case study says October 2026)
- [ ] `petepete-devops.md`: confirm the bullet
- [ ] `kai-web-intern.md`: confirm the 5,000 concurrent users figure and its context

## `src/content/skills.yaml`

- [ ] Hands-on group: confirm the level of every skill
- [ ] `gcp`, `nodejs`, `postgresql`: confirm level (from the web developer internship)
- [ ] Familiar group: confirm the level of every skill
- [ ] Exploring group: confirm the level of every skill
- [ ] `k8s-cert`: pick what is true about a Kubernetes certification path

## `src/content/learning.yaml`

- [ ] Timeline, last item: what "now" means
- [ ] Currently learning: what I am learning right now
- [ ] Next up, monitoring: confirm SLOs are on the list
- [ ] Next up, certification: pick what is true

## `src/content/projects/openbao-migration.md`

- [ ] How it went: confirm order of steps
- [ ] Outcome: confirm whether Vault was fully retired or runs alongside OpenBao
- [ ] What I'd do next: add my own next steps

## `src/content/projects/image-pull-cache-mirror.md`

- [ ] How it went: confirm order of steps
- [ ] What I'd do next: add my own next steps

## `src/content/projects/petepete-infrastructure.md`

- [ ] `status`: confirm current status
- [ ] Background: confirm whether I built it alone or had help
- [ ] How it went: confirm order of steps (I merged "private database + bastion" with "server + Docker",
      and "email OTP" with "text-to-speech", to stay within 8 steps)
- [ ] Outcome: what the team achieved, and scale
- [ ] What I learned: confirm that `NEXT_PUBLIC_*` values are baked in at build time

## `src/content/projects/devops-bootcamp-final-project.md`

- [ ] `status`: confirm final outcome
- [ ] `stack`: confirm tags, especially GitLab CI
- [ ] Background: name the other (monolith) project
- [ ] How it went: confirm order of steps, and any problems I hit
- [ ] How it went, step 2: how `deploy.sh` applies the overlay
- [ ] How it went, step 4: confirm the image is retagged, not rebuilt
- [ ] How it went, step 7: whether dashboards cover transactions, traffic and errors
- [ ] Outcome: final outcome
- [ ] What I learned: add my own lessons

## Diagrams: review for accuracy

Each project SVG in `src/assets/diagrams/` carries a `{{TODO: review diagram for accuracy}}`
comment (stripped when inlined), so they show up in `check:todo` under these four files:

- [ ] `openbao-migration.svg`
- [ ] `image-pull-cache-mirror.svg`
- [ ] `petepete-infrastructure.svg` (check where the CI runner lives and how it reaches the VM)
- [ ] `devops-bootcamp-final-project.svg` (check that deploy.sh and gitops-ecm are drawn as you built them)

## Not placeholders, but worth doing

- [ ] Optional: add `public/resume.pdf` (the button appears on its own) and a portrait (`portrait` in `site.ts`).
- [ ] Optional: add a short "Now" note (`contact.now` in `site.ts`).
- [ ] Set the repo variables `SITE_URL` and `CLOUDFLARE_PROJECT_NAME`, and the two Cloudflare secrets, before deploying.
