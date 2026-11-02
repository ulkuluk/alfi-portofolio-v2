# web-porto-v2

Personal portfolio of an aspiring DevOps engineer. Static site built with Astro.

> Status: Phase 1 (foundation) is done. Content model, sections and full docs follow in later phases.

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

## Folder map

```
.github/        workflows (ci.yml, deploy.yml) and dependabot.yml
docs/           CONTENT-TODO.md (and, later, guide and templates)
public/         _headers, robots.txt, favicon, theme-init.js
scripts/        check-todo.mjs
src/
  components/   Header, Footer, ThemeToggle
  config/       site.ts, the single source of personal data
  layouts/      BaseLayout.astro
  pages/        index, 404, colophon
  styles/       global.css, the only place design tokens live
Dockerfile, compose.yaml, nginx.conf, nginx-security-headers.conf
```

## Change the accent colour or fonts

- Accent: edit `--accent` (and `--on-accent` if contrast needs it) in `src/styles/global.css`.
  Light and dark values are separate; each is one line.
- Fonts: swap the two `@font-face` blocks at the top of `src/styles/global.css` and the
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

Full steps arrive in Phase 4. In short, `deploy.yml` needs:

- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variables: `CLOUDFLARE_PROJECT_NAME`, `SITE_URL`, and (temporarily) `ALLOW_TODO=1` while
  placeholders remain. The main deploy fails on any unresolved TODO otherwise.

The deploy job never fails just because it cannot deploy: for Dependabot runs, fork PRs, or
when the Cloudflare secrets/variables are missing, it skips with a notice and a job summary.

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
- **Placeholders.** Personal details are `{{TODO}}` markers in `src/config/site.ts`, tracked in
  `docs/CONTENT-TODO.md`.
- **Known audit noise.** `npm audit` reports issues in `sharp` (pulled in by Astro for image
  optimisation, unused here) and in Lighthouse CI dev tooling. The fix for `sharp` is Astro 7.
  Nothing from these ships to visitors.
