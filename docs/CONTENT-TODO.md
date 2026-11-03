# Content TODO

Every `{{TODO ...}}` placeholder in the repo, grouped by file. `npm run check:todo` prints the
live list; the file sections below must match it (30 placeholders in 10 files at the time of
writing).

## General (not tied to a file)

- [ ] Get approval from mentor or company before publishing the internship case studies
      (OpenBao Migration, Image Pull-Cache Mirror).

## `src/config/site.ts`

- [ ] `url`: domain
- [ ] `location`: city
- [ ] `availability`: confirm availability

## `public/robots.txt`

- [ ] Replace `example.com` with the real domain (also in the `Sitemap:` line).

## `src/content/projects/openbao-migration.md`

- [ ] `period`: internship dates
- [ ] How it went: confirm order of steps
- [ ] Outcome: confirm whether Vault was fully retired or runs alongside OpenBao
- [ ] What I'd do next: add my own next steps

## `src/content/projects/image-pull-cache-mirror.md`

- [ ] `period`: internship dates
- [ ] How it went: confirm order of steps
- [ ] What I'd do next: add my own next steps

## `src/content/projects/petepete-infrastructure.md`

- [ ] `status`: confirm current status
- [ ] Background: confirm whether I built it alone or had help
- [ ] How it went: confirm order of steps (I merged "private database + bastion" and "server + Docker"
      into one step, and "email OTP" and "text-to-speech" into one, to stay within 8 steps)
- [ ] Outcome: what the team achieved, and scale
- [ ] What I learned: confirm that `NEXT_PUBLIC_*` values are baked in at build time

## `src/content/projects/devops-bootcamp-final-project.md`

- [ ] `period`: bootcamp dates
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

Each SVG in `src/assets/diagrams/` carries a `{{TODO: review diagram for accuracy}}` comment
(stripped when the diagram is inlined), so they appear in `check:todo` under these four files:

- [ ] `openbao-migration.svg`
- [ ] `image-pull-cache-mirror.svg`
- [ ] `petepete-infrastructure.svg` (check where the CI runner lives and how it reaches the VM)
- [ ] `devops-bootcamp-final-project.svg` (check that deploy.sh and gitops-ecm are drawn as you built them)
