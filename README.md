# web-porto-v2

Personal portfolio of a DevOps / SRE engineer early in their career. Static site built with Astro.

> Status: All four phases complete. Fill the `{{TODO}}` placeholders in `src/config/site.ts`
> and content files, then set the GitHub secrets described in `docs/DEPLOY.md` to go live.

## Quick start

```sh
nvm use          # Node 22 (see .nvmrc)
npm ci
npm run dev      # http://localhost:4321
```

## Scripts

| Script                 | What it does                                              |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Dev server                                                |
| `npm run build`        | Static build into `dist/`                                 |
| `npm run preview`      | Serve `dist/` locally                                     |
| `npm run lint`         | ESLint (with the Astro plugin)                            |
| `npm run format`       | Prettier, write                                           |
| `npm run format:check` | Prettier, check only                                      |
| `npm run check`        | `astro check` (TypeScript and templates)                  |
| `npm run check:todo`   | List every TODO placeholder (`-- --strict` fails if any)  |
| `npm run lhci`         | Lighthouse CI against `dist/` (run `npm run build` first) |
| `npm run og`           | Regenerate `public/og.png` from the name and role         |

## Folder map

```
.github/        workflows (ci.yml, deploy.yml) and dependabot.yml
docs/           CONTENT-TODO.md, templates/ (project, experience, skill, learning)
public/         _headers, robots.txt, favicon, og.png, theme-init.js
scripts/        check-todo.mjs, make-og.mjs
src/
  assets/diagrams/  one inline SVG per case study
  components/   Header, Footer, ThemeToggle, SectionHeading, Hero, ProjectCard, About,
                ExperienceList, Skills, LearningJourney, Contact
  config/       site.ts, the single source of personal data and copy
  content/      projects/*.md, experience/*.md, skills.yaml, learning.yaml
  content.config.ts  Zod schemas for all four collections
  layouts/      BaseLayout (SEO, JSON-LD), CaseStudyLayout
  lib/          projects.ts (loading, ordering, structure checks), skills.ts
  pages/        index, 404, colophon, projects/[...slug]
  styles/       global.css, the only place design tokens live
Dockerfile, compose.yaml, nginx.conf, nginx-security-headers.conf
```

## Add a project

1. Copy `docs/templates/project.md` to `src/content/projects/<slug>.md`. The file name is the URL.
2. Fill in the front matter and the sections. Keep the headings; the build checks them.
3. Optional: draw an SVG at `src/assets/diagrams/<slug>.svg` (see an existing one for the CSS
   classes) and set `diagram:` in the front matter.
4. `npm run build`. The card on the home page, the detail page and the prev/next links appear
   on their own. A mistake fails the build and names the file and field.

## Add a job, skill or learning item

- **Job or course:** copy `docs/templates/experience.md` to `src/content/experience/<slug>.md`.
  `order` sets the position (newest = 1). A `project:` slug links to a case study.
- **Skill:** paste a block from `docs/templates/skill.yaml` into `src/content/skills.yaml`.
  Pick `hands-on`, `familiar` or `exploring`; there are no percentage bars.
- **Learning item:** paste a block from `docs/templates/learning.yaml` into
  `src/content/learning.yaml` (`timeline`, `current` or `next`).
- A wrong field or project slug fails the build and names the file.

## Other switches in `src/config/site.ts`

- `availability.show`: show or hide the "open to roles" line in the hero (hidden now).
- `portrait`: set a path under `public/` to show a portrait next to the hero text.
- `contact.resume`: the résumé button shows only if that file exists in `public/`.
- `contact.now`: an optional short "Now" note in the contact section.
- After changing the name or role, run `npm run og` and commit `public/og.png`.

## Change the accent colour or fonts

- **Accent:** edit `--accent-base` in `src/styles/global.css` (light mode, around line 37).
  Dark mode derives a lighter tint automatically with `color-mix`. That is the only line you need
  to change. **Exception:** if you switch to a very light accent colour, `--on-accent` (the text
  drawn on top of accent fills) may need to change from `#ffffff` to a dark value — check contrast
  manually. After changing the accent run `npm run og` and commit both `public/og.png` and
  `public/favicon.svg`.
- **Fonts:** swap the two `@font-face` blocks at the top of `src/styles/global.css` and the
  matching `@fontsource-variable/*` dependency.

## Why this stack

Static HTML is fast, cheap, and has almost nothing to patch. Content will live in Markdown and
YAML so the site can be updated without touching code, and Astro ships zero JavaScript by default.
The only client JS is the theme toggle and the mobile menu.

## Dependencies

| Package                                                            | Why                                           |
| ------------------------------------------------------------------ | --------------------------------------------- |
| `astro`, `@astrojs/sitemap`                                        | Framework and sitemap                         |
| `tailwindcss`, `@tailwindcss/vite`                                 | Utility styling on top of CSS-variable tokens |
| `@fontsource-variable/fraunces`, `.../source-sans-3`               | Self-hosted fonts                             |
| `@astrojs/check`, `typescript`                                     | Type and template checking                    |
| `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro` | Linting                                       |
| `prettier`, `prettier-plugin-astro`                                | Formatting                                    |
| `@lhci/cli`                                                        | Lighthouse budgets in CI                      |

## Deploy (Cloudflare Pages via GitHub Actions)

Full steps are in [`docs/DEPLOY.md`](docs/DEPLOY.md). In short:

1. Create a Cloudflare Pages project (dashboard or `wrangler pages project create`).
2. Add two **secrets** to the GitHub repo: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
   - Token scope: **Cloudflare Pages: Edit** on your account.
   - Account ID: shown on the Cloudflare dashboard sidebar.
3. Add three **variables**: `CLOUDFLARE_PROJECT_NAME`, `SITE_URL`, and (temporarily)
   `ALLOW_TODO=1` while placeholders remain. Remove `ALLOW_TODO` before going public.
4. Update `url` in `src/config/site.ts` and the `Sitemap:` line in `public/robots.txt`
   to match `SITE_URL`.

Push to `main` → production deploy. Open a PR → preview URL on a unique subdomain.

The deploy job skips without failing for Dependabot runs, fork PRs, or when the
secrets/variables are missing.

Prod-like local check: `docker compose up --build`, then open <http://localhost:8080>.

## Decisions

- **Astro 6.4.8, not 7.** Astro 7 needs Node >= 22.23.4. Astro 6 supports Node >= 22.12 and is
  the version that works on the current local Node, so versions are pinned to it. Revisit when
  upgrading Node. `.nvmrc` says `22`, which resolves to a compatible release in CI.
- **`overrides.vite = 7.3.7`.** `@tailwindcss/vite` pulled in Vite 8 next to Astro's Vite 7,
  and the build failed. Forcing one Vite fixes it. Remove the override once Astro moves to Vite 8.
- **Fonts.** Source Sans 3 for body (a humanist sans that stays calm and readable) and Fraunces
  for headings only (a soft serif that gives the page some personality). Latin subset only,
  self-hosted. Mono is the system stack, so it costs nothing.
- **Strict CSP.** All CSS and JS are emitted as external hashed files (`inlineStylesheets: never`,
  `assetsInlineLimit: 0`), so the policy allows `'self'` only. The pre-paint theme script is the
  external `public/theme-init.js`.
- **No-JS behaviour.** Nav links stay visible without JS. The menu button and theme toggle only
  appear once `theme-init.js` adds the `js` class.
- **Clean URLs.** Pages are emitted as `name.html` and served without the extension
  (`trailingSlash: never`).
- **Content config location.** Astro 6 reads `src/content.config.ts`, not the older
  `src/content/config.ts` named in the brief. `z` comes from `astro/zod`.
- **Structure checks beyond Zod.** `src/lib/projects.ts` fails the build if a case study lacks a
  required heading, has fewer than 5 or more than 8 numbered steps in "How it went", or shares
  an `order` with another project. Word count outside 250-450 only warns.
- **Diagrams.** Inline SVG imported with `?raw`. They style themselves with CSS classes from
  `global.css` (the CSP blocks `style` attributes), so they follow light and dark mode.
- **Drafts.** `draft: true` projects show in `npm run dev` and are dropped from production builds.
- **Positioning.** "DevOps / SRE engineer, early in my career". Kumparan work is `type: work`
  (an enum value added alongside `internship`, which stays for the KAI internship).
- **Extra skill category.** Skills use the brief's seven categories plus "Web & Data" so that
  Node.js and PostgreSQL have a home.
- **Skill confirmation markers.** The Appendix C skills carry one TODO per level group, not one
  per line; the three skills added from the KAI internship carry their own.
- **OG image.** A static PNG rendered by `scripts/make-og.mjs` with `sharp`, using system fonts.
  Regenerate it with `npm run og`.
- **Canonical URLs.** Built pages are `name.html` but the canonical and sitemap URLs drop the
  extension, as served.
- **Link checks.** The weekly external check skips `example.com` (placeholder domain) and
  `linkedin.com` (it blocks bots).
- **Placeholders.** Personal details are `{{TODO}}` markers in `src/config/site.ts`, tracked in
  `docs/CONTENT-TODO.md`.
- **Known audit noise.** `npm audit` reports issues in `sharp` (pulled in by Astro for image
  optimisation, unused here) and in Lighthouse CI dev tooling. The fix for `sharp` is Astro 7.
  Nothing from these ships to visitors.
- **Render-blocking assets.** `theme-init.js` and the CSS bundle appear as render-blocking in
  Lighthouse. Both are intentional: the CSP allows only `'self'` (no `'unsafe-inline'`), so
  the theme script must be an external file, and inlining CSS is disabled to keep the same
  policy. Scores stay at 100 because the files are tiny and cached; the trade-off is
  documented here rather than hidden.
- **Accent centralised.** All colour mode values derive from `--accent-base`. Dark mode uses
  `color-mix(in oklab, var(--accent-base) 50%, white)` instead of a hard-coded second value,
  so changing the accent is a one-line edit. `--on-accent` (text on accent fills) is still
  hard-coded and needs a manual contrast check if a light accent is chosen.
- **`npm run og` regenerates both `public/og.png` and `public/favicon.svg`.** Both read
  `--accent-base` from `src/styles/global.css`, so they stay in sync with the accent colour
  automatically after running the script.
- **Security scan.** Full git history was scanned for tokens, passwords, API keys, private keys,
  internal hostnames, IP addresses, account IDs, and bucket names. No secrets found.
  All Cloudflare credentials are referenced only as `${{ secrets.NAME }}` placeholders.
