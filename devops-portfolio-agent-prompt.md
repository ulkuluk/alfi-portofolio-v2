# Prompt: Build my DevOps portfolio website

You are a senior front-end engineer and technical writer with strong DevOps instincts. Build a personal portfolio website for me, an **aspiring DevOps engineer looking for an internship or junior role**. Read this whole brief before writing any code.

---

## 0. How to work

- Work in the phases in section 10. After each phase, commit (Conventional Commits) and give me a summary of at most 5 lines.
- Do not stop to ask questions unless something truly blocks you. For every fact I have not given you, write a placeholder `{{TODO: what is needed}}` in the content and list it in `docs/CONTENT-TODO.md`. **Never invent facts, metrics, dates, employers, certificates, or links.**
- Where this brief leaves a choice open, decide, and record the decision in a "Decisions" section of the README.
- Site language: **English** (single language, no i18n layer, to keep maintenance low).

---

## 1. Goal and audience

**Readers:** recruiters, hiring managers and engineers at tech companies in Indonesia and remote. They skim for 60–90 seconds, and a few will read one case study closely.

**What they should conclude:** "This person learns fast, thinks clearly about problems, explains their decisions well, and would be a good person to mentor."

**What the site is not:** a claim of expertise, a skills-logo wall, or a monitoring dashboard.

---

## 2. Positioning and voice

- Position me as an **aspiring DevOps Engineer / DevOps intern** interested in infrastructure, automation, cloud, CI/CD, containerization and reliability.
- Voice: first person, plain sentences, concrete nouns, short paragraphs. Humble but not self-deprecating. Saying "I haven't done X yet" is fine and good.
- Banned words: passionate, rockstar, ninja, guru, expert, cutting-edge, seamless, leverage, synergy. No skill-percentage bars, no star ratings.
- Hero direction (refine the wording, keep the spirit):
  - Headline: *"I like understanding how systems work, and making them quietly reliable."*
  - Sub: *"{{NAME}} · aspiring DevOps engineer. Through an internship, a bootcamp and a team project I've worked on cloud infrastructure, CI/CD, Kubernetes and secret management."*
  - Primary button "See my projects", secondary "Get in touch".
  - A small status line: "Open to DevOps internship and junior roles {{TODO: confirm availability}}".

### The four traits: show, don't label

The site should make a reader feel four traits: **curiosity, problem solving, adaptability, growth mindset**. Do **not** render them as four badges or icons. Show them through real examples (use these, they come from my actual work):

| Trait | Evidence to surface in copy |
|---|---|
| Curiosity | Went straight to Spegel's raw `/metrics` endpoint to work out which signals actually matter for cache hit ratio. Asked "what does a license change mean for us?" and evaluated OpenBao as an alternative to Vault. |
| Problem solving | SSH allowlisting by IP broke for a team with dynamic IPs, so I moved to Cloudflare Tunnel plus Access policies and closed port 22 to the internet. Managed Postgres had no public access in that region, so the CVM became a bastion. |
| Adaptability | Tencent Cloud, Kubernetes, GitLab CI, containerd; deployed a Next.js frontend and a .NET backend, plus a multi-language bootcamp app `{{TODO: which languages my chosen app used}}`; moved between bootcamp, team project and internship. |
| Growth mindset | Every case study ends with "What I'd do next". The Learning Journey is honest about what is in progress. |

Put these into: (a) a short "How I work" block on the About section, four short paragraphs each anchored in one real example, and (b) the "What I learned" and "What I'd do next" parts of each case study.

---

## 3. Site structure

My original idea had seven sections: Home, About Me, Projects, Experience, Skills, Learning Journey, Contact. Keep all seven, with these improvements:

- **One scrolling home page** with anchored sections in this order: Hero → Selected Projects → About → Experience → Skills → Learning Journey → Contact. Projects come before About because recruiters look for work first.
- **Each project gets its own page** at `/projects/<slug>` (the four-part story needs space). Home shows only cards.
- Also: `/404`, and a small `/colophon` page ("How this site is built", see section 8).
- Sticky, minimal nav (anchor links + a theme toggle). Mobile menu without a UI framework.
- No contact form (nothing to run, no spam). Use `mailto:` and links.

### Section specs

**Hero.** As in section 2. Optional small portrait slot (config flag; hidden if no image).

**Selected Projects.** Cards for the four projects below, ordered by the `order` field. Each card: type tag (`Internship` / `Team project` / `Bootcamp`), title, one-sentence problem statement, 3–4 text tech tags, "Read case study →".

**About.** 150–200 words of story: how I got into DevOps and what I enjoy about it `{{TODO: my own story and motivation}}`, then the "How I work" block.

**Experience.** Simple vertical list, no heavy graphics. Three entries, each with 2–4 bullets drawn from the fact sheets and a link to its case study:
1. Kumparan, DevOps Intern `{{TODO: dates}}`
2. Dibimbing, DevOps Engineer Bootcamp `{{TODO: dates}}`
3. petepete, DevOps (team project) `{{TODO: dates}}`

**Skills.** Group by honesty, not by percentage: **Hands-on** (used in a real project), **Familiar**, **Exploring**. Within each group, sub-label by category (Cloud, Containers & Kubernetes, CI/CD & GitOps, Security & Secrets, Observability, Networking, Linux & Scripting). Each skill may list the project slugs where I used it, rendered as small links. Source of truth: `src/content/skills.yaml`. Start from Appendix C.

**Learning Journey.** A vertical timeline (bootcamp → team project → internship → now), followed by "Currently learning" and "Next up". Start from Appendix C and mark everything uncertain with `{{TODO: confirm}}`.

**Contact.** Email, LinkedIn, GitHub, resume PDF (button hidden if the file is absent). One warm sentence about what kind of conversation I'm open to.

**Footer.** Year, "Built with Astro", link to source repo, link to colophon.

---

## 4. Case study format

Every project is one Markdown file in `src/content/projects/` and follows this schema (validate with Zod; the build must fail with a clear message on a missing or invalid field):

```md
---
title: ""
summary: ""            # one sentence: the problem, not the tech
type: internship | team | bootcamp | homelab
org: ""
role: ""
period: ""
status: ""             # e.g. "PoC validated", "Deployed to UAT" — be precise
order: 1
featured: true
stack: []              # text tags
diagram: ""            # optional path to an SVG in src/assets/diagrams/
repo: ""               # optional public URL
draft: false
---

## Background        <!-- what was the context? -->
## Challenge         <!-- what problem needed solving? -->
## Approach          <!-- what I did and why -->
### Key decisions    <!-- bullets: decision → reason → trade-off -->
## Outcome           <!-- what resulted, honestly scoped -->
### What I learned
### What I'd do next
```

Rules:
- 250–450 words per case study. Page layout: header with an "At a glance" row (role, org, period, status, stack) → the four sections → one architecture/flow diagram → prev/next project link.
- **Diagram:** draw one clean inline SVG per project from the fact sheet (simple boxes and arrows, uses the site's tokens, works in light and dark, has `<title>`/`<desc>`). Mark each with `{{TODO: review diagram for accuracy}}` in the CONTENT-TODO file.
- Separate **what I did** ("I") from **what the team did** ("we"). If unsure, use a TODO.
- Do not use the word "production" unless the fact sheet says so.
- Default order: 1 OpenBao Migration, 2 Image Pull-Cache Mirror, 3 petepete Infrastructure, 4 DevOps Bootcamp Final Project. (Real company work first; I can change `order` later.)

---

## 5. Visual design

Direction: **minimalist, modern, calm, with a personal touch.** It should feel like a well-edited technical blog, not a control room.

- **Colour:** warm neutrals plus exactly **one accent**. Defaults (tweak only if contrast fails WCAG AA):
  - Light: bg `#FAFAF8`, surface `#FFFFFF`, text `#1A1A18`, muted `#6B6B66`, border `#E7E5E0`, accent `#0F766E`.
  - Dark: bg `#121211`, surface `#1A1A18`, text `#ECECE8`, muted `#A3A39C`, border `#2B2B28`, accent `#4FD1C5`.
  - Respect `prefers-color-scheme`, plus a manual toggle that remembers the choice (wrap storage access in try/catch; the page must work without it).
  - All of this lives as CSS variables in **one** file, so changing the accent is a one-line edit.
- **Typography:** at most two families plus a mono. A humanist or neo-grotesque sans for body and UI, optionally a serif for headings only to give personality. Self-host with Fontsource, subset to Latin. Mono only for small tags and inline code, used sparingly. Body 17–18px, line-height 1.6–1.7, max line length about 65ch. Avoid default-looking Inter-on-white; make a deliberate choice and justify it in one line in the README.
- **Layout:** content width about 1040px, text width about 680px, generous whitespace (96–128px between sections), 8px spacing scale. Cards: 1px border, no heavy shadows. Mobile first, no horizontal scroll at 360px.
- **Motion:** minimal. Hover and focus transitions of about 150ms and, at most, one subtle fade-in on load. Honour `prefers-reduced-motion`. No parallax, particles, typing effects, or scroll-jacking.
- **Do not:** terminal windows, fake shell prompts, neon or glow, metric tiles or "uptime 99.9%" widgets, logo walls, gradient blobs, emoji bullets, stock illustrations. Technology appears as text tags (small monochrome icons optional).
- **Personal touch (keep it small):** warm microcopy, an optional "Now" note in the Contact section, one distinctive typographic detail, and the honest "What I'd do next" lines.

---

## 6. Tech stack (decided, no need to ask)

| Concern | Choice |
|---|---|
| Framework | **Astro** (latest stable, versions pinned), static output |
| Language | TypeScript, `strict` |
| Styling | **Tailwind CSS v4** with CSS-variable design tokens |
| Content | Astro **Content Collections** + Zod schemas; plain Markdown and YAML (no MDX) |
| Client JS | Only for theme toggle and mobile nav, under about 5 KB. No React/Vue/Svelte. |
| Fonts / icons | Fontsource (self-hosted); inline SVG icons |
| SEO | `@astrojs/sitemap`, `robots.txt`, meta + Open Graph + Twitter tags, JSON-LD `Person`, one static OG image |
| Package manager | npm with committed lockfile; Node pinned via `.nvmrc` and `engines` |
| Quality | ESLint (with Astro plugin), Prettier, `astro check` |
| Hosting | **Cloudflare Pages** via GitHub Actions (README also documents GitHub Pages as a fallback) |

Why this stack (put one short paragraph in README): static HTML is fast, cheap and has almost nothing to patch; content lives in Markdown so I can update the site without touching code; Astro ships zero JS by default.

---

## 7. Maintainability requirements (high priority)

I want to maintain this alone for years with little effort.

1. **All personal data** (name, tagline, email, social links, resume path, availability, analytics flag) in `src/config/site.ts`. **No copy hard-coded in components.**
2. **Adding a project, job, skill or learning item = editing a Markdown/YAML file.** No code change. Provide ready-to-copy templates in `docs/templates/`.
3. Schemas fail the build with readable errors; `draft: true` entries are excluded from production builds.
4. Design tokens in one CSS file. Fewer than about 15 small components with typed props and no speculative abstractions.
5. Minimal dependencies; justify each in the README. Dependabot (see section 8) keeps them current.
6. Documentation:
   - `README.md`: quick start, script list, folder map, how to add a project/skill/experience, how to change accent and fonts, how to deploy, decisions log.
   - `docs/CONTENT-GUIDE.md`: the writing rules from sections 2, 4 and 9 as a checklist I can use when writing new case studies.
   - `docs/CONTENT-TODO.md`: every `{{TODO ...}}` in the repo, grouped by file.
7. `npm run check:todo` scans for `{{TODO` and prints a list.

Target folder map:

```
.
├── .github/ (workflows/, dependabot.yml)
├── docs/ (CONTENT-GUIDE.md, CONTENT-TODO.md, templates/)
├── public/ (_headers, robots.txt, favicon, og.png, resume.pdf)
├── src/
│   ├── assets/diagrams/
│   ├── components/
│   ├── config/site.ts
│   ├── content/ (projects/*.md, experience/*.md, skills.yaml, learning.yaml, config.ts)
│   ├── layouts/
│   ├── pages/ (index.astro, projects/[...slug].astro, colophon.astro, 404.astro)
│   └── styles/global.css
├── Dockerfile, compose.yaml, nginx.conf
└── README.md
```

---

## 8. DevOps layer (the site should be good practice, quietly)

- **CI (`ci.yml`)** on pull requests and pushes: `npm ci` with cache → lint → format check → `astro check` → `check:todo` (warning on PRs) → build → link check with lychee (internal links on PRs; external links weekly on a cron) → Lighthouse CI against the built output.
  - Lighthouse budgets: Performance, Accessibility, Best Practices and SEO each **≥ 95**.
- **Deploy (`deploy.yml`)** on push to `main`: build and deploy to Cloudflare Pages with Wrangler; PRs get preview deployments. The main deploy **fails if any `{{TODO` remains** (escape hatch: `ALLOW_TODO=1`). Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. Document exact token scopes in README.
- Actions are pinned by full commit SHA (with the version in a comment) and use the minimum `permissions:`.
- **Dockerfile:** multi-stage (Node build → `nginxinc/nginx-unprivileged` serving `dist/`), pinned versions (no `latest`), non-root, `HEALTHCHECK`, sensible cache/gzip and security headers in `nginx.conf`. `compose.yaml` runs it locally for prod-like checks. (This is optional for hosting but shows containerization.)
- **Headers:** `public/_headers` with a strict CSP (self only, plus analytics host only if enabled), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and long cache for hashed assets.
- **Dependabot:** npm, github-actions and docker; weekly; minor and patch updates grouped.
- **Analytics:** none by default. Optional Cloudflare Web Analytics behind a flag in `site.ts`.
- **`/colophon`:** about 100 words on how the site is built plus one simple diagram (commit → CI checks → build → deploy). Same visual style as the rest of the site, no terminal look.

---

## 9. Content rules (honesty and safety), IMPORTANT

- **Never include** credentials, tokens, passwords, API keys, cloud account or org IDs, bucket names, internal hostnames, IP addresses, private repo URLs, employee names, or screenshots that reveal internal data. The fact sheets in Appendix B are already sanitized. Keep them that way, and never ask me to paste secrets.
- **Employer work (Kumparan):** describe techniques and reasoning, not proprietary details. Do not state numbers from internal systems unless I supply and confirm them. Add to `docs/CONTENT-TODO.md`: "Get approval from mentor or company before publishing the internship case studies."
- No expertise claims ("expert", "senior") and no certifications unless I list them.
- Anything you infer that is not in the fact sheet gets `{{TODO: confirm}}`.
- Do not add screenshots at first. Leave an optional `figure` slot in the case-study layout and note in CONTENT-GUIDE that screenshots must be cropped and sanitized.

---

## 10. Phases and acceptance

**Phase 1: Foundation.** Scaffold, tooling, design tokens, base layout, nav, theme toggle, CI, Dockerfile, headers. *Accept:* `npm run build` passes, CI is green, Lighthouse budgets met on the empty shell.

**Phase 2: Content model and case studies.** Schemas, templates, the four case studies from Appendix B with diagrams, project cards and detail pages. *Accept:* adding a fifth project works by dropping in one `.md` file.

**Phase 3: Remaining sections and polish.** Hero, About, Experience, Skills, Learning Journey, Contact, footer, colophon, 404, SEO, OG image. *Accept:* every section reads well at 360px and 1440px, in light and dark.

**Phase 4: Hardening and docs.** Accessibility pass (semantic landmarks, skip link, visible focus, AA contrast, alt text, keyboard navigation), performance pass, README, CONTENT-GUIDE, CONTENT-TODO, deploy docs. *Accept:* checklist below.

### Final acceptance checklist
- [ ] Lighthouse ≥ 95 in all four categories on mobile
- [ ] No horizontal scroll at 360px; works with JavaScript disabled (except the theme toggle)
- [ ] No secrets or internal identifiers anywhere in the repo or its git history
- [ ] Changing the accent colour requires editing one variable
- [ ] Adding a project, skill, job or learning item requires editing one data file
- [ ] `check:todo` output matches `docs/CONTENT-TODO.md`
- [ ] README lets a stranger run, edit and deploy the site in under 10 minutes

### Final report to me
End with: what you built, decisions you made, the full list of open TODOs, exact steps to connect Cloudflare Pages and the GitHub secrets, and the five things I should fill in first.

---

## Appendix A: My details (all still to be filled)

| Field | Value |
|---|---|
| Full name | `{{TODO}}` |
| Role line | Aspiring DevOps Engineer / DevOps Intern |
| Location | `{{TODO}}` (Indonesia) |
| Email | `{{TODO}}` |
| LinkedIn | `{{TODO}}` |
| GitHub | `{{TODO}}` |
| Resume PDF | `{{TODO}}` (optional) |
| Availability | `{{TODO}}` |
| Domain | `{{TODO}}` |
| Portrait photo | `{{TODO}}` (optional) |
| Internship, bootcamp and project dates | `{{TODO}}` |

---

## Appendix B: Project fact sheets (sanitized source material)

Write each case study from these. Anything not stated here is unknown and must be a TODO.

### B1. OpenBao Migration (Kumparan internship)

- **Type / status:** Internship. Documented as a TRD; validated in a **local Docker simulation**. `{{TODO: was it adopted or rolled out? State the true status.}}`
- **Background:** HashiCorp moved Vault from MPL 2.0 to BSL 1.1, which raises licensing, compliance and vendor-dependency concerns. Vault's IAM and access-control model can also get complicated as services and identities grow.
- **Goals:** (1) reduce licensing, compliance and vendor-dependency risk; (2) simplify secret management and IAM to cut operational overhead and policy drift.
- **Approach:**
  - Ran OpenBao with Docker Compose: file storage, persistent volumes for data and for audit logs, file audit log, UI enabled.
  - **Two migration paths** evaluated: (a) `operator migrate`, which needs both source and destination offline; (b) reusing the Vault data volume directly, which works only if the storage type is the same. After either path OpenBao starts **sealed**, and the original Vault unseal key shares are the ones that work.
  - **SSO for people:** OIDC with Google OAuth 2.0 (consent screen + client ID). A default OIDC role is required, and as of OpenBao 2.6.2 the UI cannot create OIDC roles, so it has to be done through CLI/API.
  - **Team access model:** one ACL policy per team granting read/list only on that team's paths (for KV v2, both `data` and `metadata` paths are needed) → an internal group per team with the policy attached → one entity per person with an alias bound to their email on the OIDC mount → entity added to group, so policies resolve at login through group membership.
  - **Getting secrets into Kubernetes:** External Secrets Operator (ESO) with a `SecretStore` pointing at OpenBao, and Stakater Reloader to restart workloads when a secret changes (deployments use `envFrom` plus a reloader annotation).
  - **Auto-discovery script:** a Bash script that recursively lists KV paths and generates one `ExternalSecret` manifest per path, then applies them, so nobody maintains a path list by hand.
  - **Compared ESO with the existing Vault Synchronizer:** the synchronizer polls roughly every 5 minutes (updates lag up to ~5 min), needs checking logs per job, can overlap runs, and is hard-wired to Vault/OpenBao. ESO is a continuous controller with a refresh interval in seconds, gives central status via `kubectl get externalsecret`, has no overlap problem, and is provider-agnostic. The trade-off is that ESO does not restart workloads, so Reloader is required.
- **Key decisions to highlight:** group-based policies instead of per-person policies (less policy drift); ESO over the synchronizer (latency, observability, portability); a script instead of hand-written manifests.
- **Outcome:** a documented migration path, an access model and a Kubernetes sync design, validated locally. `{{TODO: real outcome, and any figures I approve}}`
- **Stack tags:** OpenBao, Vault, OIDC, Docker Compose, Kubernetes, External Secrets Operator, Reloader, Bash.
- **Never include:** any token, the real secret paths, internal service names.

### B2. Image Pull-Cache Mirror (Kumparan internship)

- **Type / status:** Internship; PoC with validation on a cluster. `{{TODO: true status}}`
- **Background:** each node runs containerd and pulls images on its own from external registries. Nothing provides a cluster-wide pull cache. Consequences: repeated egress for the same image (avoidable cloud data-transfer cost) and a risk of hitting public registry rate limits such as Docker Hub when many nodes pull at once.
- **Goals:** (1) fewer redundant pulls to external registries from nodes in the same cluster; (2) avoid Docker Hub rate limits.
- **Approach:** deployed **Spegel** as a DaemonSet (one pod per node). Spegel writes mirror config into containerd through `hosts.toml` under `/etc/containerd/certs.d/<registry>/`. Pull flow on a node: containerd asks the local Spegel first → if missing, Spegel asks peer nodes over a P2P protocol → if no peer has it, fall back to the upstream registry. There is no central mirror, so no single point of failure or bottleneck. Installed with Helm; `values.yaml` lists mirrored registries (public and private) and enables a ServiceMonitor and a Grafana dashboard. Two containerd settings matter: `config_path = "/etc/containerd/certs.d"` (so containerd reads the mirror config Spegel writes) and `discard_unpacked_layers = false` (otherwise containerd drops the layers Spegel needs to serve to other nodes).
- **Validation:** explored Spegel's `/metrics` endpoint directly and picked the useful signals: mirror requests (for cache hit ratio), resolve duration, and advertised image and content digests. Built a Grafana dashboard across three Spegel pods, checked Spegel's debug web page, confirmed mirror hits in logs, and verified the generated containerd mirror config.
- **Key decisions to highlight:** P2P DaemonSet over a central pull-through cache (no SPOF, nothing extra to run); explicit containerd settings and why each one matters.
- **Outcome:** `{{TODO: measured results I'm allowed to share, e.g. hit ratio; do not invent numbers}}`
- **Stack tags:** Spegel, containerd, Kubernetes, Helm, Prometheus, Grafana.
- **Never include:** registry account IDs, internal registry URLs, or cluster names.

### B3. petepete Infrastructure (team project)

- **Type / status:** Team project; I was the DevOps engineer. Environments described are **dev/UAT**; do not claim production. `{{TODO: team size, period, current status}}`
- **Background:** petepete is a donation platform for content creators (similar to Saweria). My job: provision and operate the cloud infrastructure and the deployment pipeline for the team.
- **Cloud:** Tencent Cloud, Jakarta region.
- **Approach (chronological pain points make a good story):**
  - **Network:** a VPC with a public subnet (the app server) and a private subnet (the database). The database security group allows traffic by **referencing the app server's security group** instead of raw IPs.
  - **Least privilege:** separate CAM sub-accounts per purpose: one for object storage uploads, scoped with a custom policy; one for the text-to-speech service. `{{TODO: confirm whether TTS permissions could be narrowed; if so, add as "what I'd do next"}}`
  - **Database:** managed PostgreSQL. Public access is not supported in that region, so access goes through the app server as a bastion.
  - **Compute:** one Ubuntu 24.04 LTS virtual machine (2 vCPU / 4 GB) running Docker and Docker Compose.
  - **Access, the main story:** SSH was first allowed by IP allowlist, which broke because team members have dynamic IPs. I moved to **Cloudflare Tunnel** (running as a systemd service) with **Cloudflare Access** email-based policies. Port 22 no longer needs to be exposed. Each teammate uses their own SSH key, not a shared one. The same tunnel also routes the UAT frontend and API hostnames.
  - **Deployment:** Next.js frontend and .NET backend with Docker Compose on the VM. Troubleshooting covered a backend crash loop, `NEXT_PUBLIC_*` variables still pointing at an old local IP (fixed by pointing them at the Cloudflare hostname; `{{TODO: confirm lesson, e.g. these are baked in at build time}}`), and CORS.
  - **CI/CD:** the backend deploys through **GitLab CI** using a self-hosted runner (shell executor) that SSHes to the VM and runs `docker compose`.
  - **Uploads:** presigned-URL flow: frontend asks backend for a presigned URL → backend generates it with the object-storage SDK using the scoped sub-account → frontend uploads directly to storage (files never pass through the app server).
  - **Email OTP:** Tencent Cloud SES over SMTP for login codes; domain verification records (MX, SPF, DKIM, DMARC) configured in Cloudflare DNS on a dedicated mail subdomain.
  - **Text-to-speech:** accessed through its own dedicated sub-account.
- **Key decisions to highlight:** SG referencing over IPs; Tunnel + Access over IP allowlists; presigned uploads; separate sub-accounts per purpose.
- **Outcome:** `{{TODO: what the team achieved, scale, what I'd do next, e.g. IaC, monitoring}}`
- **Stack tags:** Tencent Cloud, Docker Compose, Cloudflare Tunnel, Cloudflare Access, GitLab CI, PostgreSQL, Next.js, .NET.
- **Never include:** real hostnames, bucket names, account IDs, IP ranges beyond a generic description.

### B4. DevOps Bootcamp Final Project (Dibimbing)

- **Type / status:** Bootcamp capstone. `{{TODO: which of the three apps I chose (Point of Sales, Core Banking Syariah, or E-Commerce); my own architecture and tooling decisions; final outcome}}`
- **Background (given by the bootcamp):** build a delivery system from scratch for a multi-service application: services in different languages (Go, JavaScript, Python or Java) plus a React or Vue frontend, backed by a pre-seeded database. Required stack: containerization, GitOps, Kubernetes and GitLab CI, with monitoring in Grafana.
- **Challenge (given):**
  - A single reusable ("general") GitLab CI pipeline usable by every service.
  - Dockerfile per service and a deploy script used by CI.
  - Kubernetes manifests for all components, with three environments (dev, uat, prod) as separate namespaces.
  - Healthchecks for each backend and resource requests/limits following best practice.
  - Frontend reachable through a URL and connected to several backends.
  - A GitOps repository structure that stays manageable.
  - Grafana dashboards covering transactions, traffic, errors and resource usage.
  - Architecture diagram and documentation written before deploying.
- **Approach:** `{{TODO: my real design: pipeline stages and branching/tagging strategy, GitOps tool and repo layout, ingress, resource sizing, which dashboards I built and why}}` Do not fill this in from the brief above. Use the brief only for the Background and Challenge parts.
- **Outcome:** `{{TODO}}`
- **Stack tags:** Docker, Kubernetes, GitLab CI, GitOps, Grafana `{{TODO: add what I actually used}}`
- **Never include:** bootcamp-provided URLs, credentials or database hosts.

---

## Appendix C: Suggested starting point for skills and learning (confirm everything)

Build `skills.yaml` and `learning.yaml` from this and mark each line `{{TODO: confirm level}}`. Remove anything I do not confirm.

**Hands-on (used in a project above):** Docker, Docker Compose, GitLab CI, Cloudflare Tunnel and Access, Tencent Cloud (VPC, CVM, CAM, COS, TencentDB for PostgreSQL, SES), Linux/Ubuntu, systemd, SSH, Bash scripting, OpenBao/Vault basics (OIDC, ACL policies, KV v2), Kubernetes (manifests, namespaces, DaemonSets), Helm, External Secrets Operator, Spegel and containerd mirror config, Prometheus metrics and Grafana dashboards.

**Familiar:** Kubernetes resource management and healthchecks, GitOps repo structure, DNS (MX, SPF, DKIM, DMARC), VPC and security-group design, deploying Next.js and .NET apps.

**Exploring / Next up (suggestions):** Infrastructure as Code (e.g. Terraform) to codify the infrastructure I built by hand, deeper observability (alerting, SLOs), a GitOps controller, Kubernetes certification path `{{TODO: pick what's true}}`.

**Learning timeline:** Bootcamp (containerization, GitOps, Kubernetes, GitLab CI, monitoring) → team project (cloud infrastructure from scratch) → internship (secret management, image distribution) → now `{{TODO}}`.
