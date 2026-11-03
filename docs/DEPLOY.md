# Deploy guide

How the site is deployed via **Cloudflare Workers Builds** (connected directly to GitHub),
with a fallback snippet for GitHub Pages at the end.

---

## How Workers Builds works

Cloudflare Workers Builds watches this repository on GitHub. On every push it:

1. Clones the repo and runs the **build command** (`npm run build`).
2. Runs the **deploy command** (`npx wrangler deploy`).
3. Reads `wrangler.jsonc` at the repo root to know the Worker name, assets directory,
   and 404 handling. No extra configuration is needed in the workflow.

The `wrangler.jsonc` in this repo is already configured:

```jsonc
{
  "name": "alfi-portofolio-v2",
  "compatibility_date": "2026-11-03",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

---

## Prerequisites

- A Cloudflare account (free tier is enough).
- The GitHub repository connected to Cloudflare Workers Builds (one-time setup below).
- Node 22 installed locally (see `.nvmrc`).

---

## 1. Connect the repository to Workers Builds

1. Go to **Cloudflare dashboard → Workers & Pages → Create → Worker**.
2. Choose **Connect to Git** and authorise GitHub.
3. Pick this repository and set:
   | Field           | Value               |
   |-----------------|---------------------|
   | Build command   | `npm run build`     |
   | Deploy command  | `npx wrangler deploy` |
   | Root directory  | *(leave blank)*     |
4. Click **Save and Deploy**. Cloudflare runs the first build and deploy from its own
   infrastructure. Every subsequent push to `main` triggers a new deploy automatically.

> **No GitHub Actions token needed for deploying.** Workers Builds has its own
> Cloudflare-side integration. The GitHub Actions workflow (`deploy.yml`) only
> checks for unresolved TODO placeholders and confirms the build passes — it does
> not call wrangler.

---

## 2. Get a Cloudflare API token (optional — only needed locally)

If you want to run `npx wrangler deploy` from your own machine:

1. Go to **Cloudflare → My Profile → API Tokens → Create Token**.
2. Use the **Edit Cloudflare Workers** template (gives Workers: Edit on your account).
3. Copy the token and set it in your shell: `export CLOUDFLARE_API_TOKEN=…`

Find your **Account ID** in the Cloudflare dashboard sidebar (any zone page, or the URL
`dash.cloudflare.com/<account-id>/…`).

---

## 3. GitHub repository variables

In **Settings → Secrets and variables → Actions → Variables** (not secrets):

| Name         | Value                         | Notes                                                                              |
|--------------|-------------------------------|------------------------------------------------------------------------------------|
| `SITE_URL`   | e.g. `https://yourdomain.com` | Used to build canonical URLs; must match `url` in `src/config/site.ts`             |
| `ALLOW_TODO` | `1`                           | Set while any TODO placeholder remains. Remove it before going fully public.       |

> `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are **not** needed as GitHub
> secrets — Workers Builds authenticates on Cloudflare's side, not through Actions.

---

## 4. Update `src/config/site.ts` and `public/robots.txt`

```ts
// src/config/site.ts
url: 'https://yourdomain.com',   // ← your real domain, no trailing slash
location: 'Yogyakarta',          // ← your city
```

```txt
# public/robots.txt
Sitemap: https://yourdomain.com/sitemap-index.xml
```

The domain in `site.ts` and `SITE_URL` must match exactly — they both feed the
canonical URL and the sitemap.

---

## 5. How the GitHub Actions workflow fits in

`deploy.yml` is renamed **"Deploy gate"** and does **not** call wrangler. Its role:

| Trigger        | What it does                                                        |
|----------------|---------------------------------------------------------------------|
| Push to `main` | Fails if any TODO placeholder remains (unless `ALLOW_TODO=1`); runs build |
| Pull request   | Runs build only (placeholders are allowed on PRs)                   |

Workers Builds handles the actual deploy independently on every push to `main`.
The two pipelines are complementary: Actions blocks a bad push before Cloudflare
ever sees it.

---

## 6. Custom domain

1. In the Cloudflare dashboard, open the Worker → **Settings → Domains & Routes →
   Add → Custom domain**.
2. Enter your domain (e.g. `yourdomain.com`).
3. If the domain uses Cloudflare DNS, the record is added automatically.
   For external DNS, add the CNAME as instructed.
4. HTTPS is provisioned automatically.

---

## 7. Preview deployments

Workers Builds can create preview deployments for branches other than `main`.
Configure this in the Cloudflare dashboard under the Worker's **Build configuration →
Branch deploy controls**. Each push to a non-main branch gets a unique preview URL.

---

## 8. Verify the deploy

After the first successful deploy:

```sh
curl -I https://yourdomain.com
curl https://yourdomain.com/sitemap-index.xml
curl -I https://yourdomain.com | grep -i "content-security-policy\|x-content-type"
```

---

## Fallback: GitHub Pages (reference only, not an active workflow)

> The `_headers` file does not apply on GitHub Pages, so the strict CSP is absent.
> Root-absolute links (e.g. `/projects/…`) require a custom domain configured in
> GitHub Pages settings, otherwise they break on the `/repo-name/` subpath.
> Pin every action to a commit SHA (not a tag) before using this in production.

```yaml
# .github/workflows/gh-pages.yml  (inactive — rename to activate)
name: GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      # Pin to SHA in production:
      # actions/checkout@<SHA>  # v4
      - uses: actions/checkout@v4

      # Pin to SHA in production:
      # actions/setup-node@<SHA>  # v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - run: npm ci
      - run: npm run build

      # Pin to SHA in production:
      # actions/upload-pages-artifact@<SHA>  # v3
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      # Pin to SHA in production:
      # actions/deploy-pages@<SHA>  # v4
      - id: deploy
        uses: actions/deploy-pages@v4
```

**Limitations vs Workers Builds:**

- No `_headers` support → CSP and other security headers are absent.
- Preview deployments per branch are not built-in.
- Build minutes on free tier are limited.
