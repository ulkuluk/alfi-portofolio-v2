# Deploy guide

How to get the site live on Cloudflare Pages, with a GitHub Actions deploy pipeline.
Fallback instructions for GitHub Pages are at the end (as a reference, not an active workflow).

---

## Prerequisites

- A Cloudflare account (free tier is enough).
- A GitHub repository containing this project.
- Node 22 installed locally (see `.nvmrc`).

---

## 1. Create the Cloudflare Pages project

### Option A — Cloudflare dashboard (recommended for first-timers)

1. Go to **Cloudflare → Workers & Pages → Create → Pages → Connect to Git**.
2. Authorise GitHub and pick this repository.
3. Set the build settings:
   | Field | Value |
   |---|---|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave blank)* |
4. Click **Save and Deploy**. Cloudflare runs the first build from its own CI.
   After this, you will use GitHub Actions instead (below).

### Option B — Wrangler CLI

```sh
npx wrangler pages project create <your-project-name> --production-branch main
```

---

## 2. Get a Cloudflare API token

1. Go to **Cloudflare → My Profile → API Tokens → Create Token**.
2. Use the **Edit Cloudflare Workers** template, or create a custom token with:
   - **Account** — Cloudflare Pages: Edit
   - **Zone** — (none required unless you add a custom domain through the API)
3. Copy the token — you can only see it once.

Find your **Account ID** on the Cloudflare dashboard right sidebar (any zone overview page
shows it, or go to **Workers & Pages** and look at the URL: `dash.cloudflare.com/<account-id>/…`).

---

## 3. Add secrets and variables to GitHub

In your GitHub repository go to **Settings → Secrets and variables → Actions**.

### Secrets (encrypted, never shown in logs)

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | The API token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

### Variables (visible in logs, not secret)

| Name | Value | Notes |
|---|---|---|
| `CLOUDFLARE_PROJECT_NAME` | e.g. `alfi-portfolio` | Must match the Pages project name |
| `SITE_URL` | e.g. `https://yourdomain.com` | Used to build canonical URLs; must match `url` in `src/config/site.ts` |
| `ALLOW_TODO` | `1` | Set this while any TODO placeholder remains. Remove it before going fully public. |

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

## 5. How the deploy pipeline works

`deploy.yml` runs on every push to `main` and on every pull request.

| Trigger | Branch passed to Wrangler | Result |
|---|---|---|
| Push to `main` | `main` | Cloudflare promotes it to the production URL |
| Pull request | PR branch name | Cloudflare creates a unique preview URL |

The job skips (without failing) when:
- The actor is Dependabot.
- The PR comes from a fork (forks have no access to secrets).
- `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` are not set.
- `CLOUDFLARE_PROJECT_NAME` is not set.

The main-branch deploy fails if any TODO placeholder remains — unless `ALLOW_TODO=1`.

---

## 6. Custom domain

1. In Cloudflare Pages, open your project → **Custom domains → Set up a custom domain**.
2. Enter your domain (e.g. `yourdomain.com` or `portfolio.yourdomain.com`).
3. Cloudflare adds a CNAME record automatically if the domain is on Cloudflare DNS.
   For external DNS, add the CNAME manually as instructed.
4. HTTPS is provisioned automatically.

---

## 7. Verify the deploy

After the first successful deploy:

```sh
# Check canonical and sitemap URLs are correct
curl -I https://yourdomain.com
curl https://yourdomain.com/sitemap-index.xml
# Check security headers
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

**Limitations vs Cloudflare Pages:**
- No `_headers` support → CSP and other security headers are absent.
- Preview deployments per PR are not built-in.
- Build minutes on free tier are limited.
