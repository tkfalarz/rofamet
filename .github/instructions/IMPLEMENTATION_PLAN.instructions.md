# Implementation plan (compact, facts-only)

Purpose
- Machine-actionable implementation instructions for a Vite+React SSG portfolio. Final site language: Polish (`<html lang="pl">`).

Stack & outputs
- Tech: Vite + React; custom SSG using Vite SSR primitives (prerender script). Styling with Tailwind CSS.
- Output directory for deployment: `docs/` (GitHub Pages on `main`).
- Node engine: 20 (set `engines.node` in `package.json`). Use npm (`npm ci`).

Scripts (required)
- `dev`: `vite` (dev server + HMR).
- `images:generate`: `node scripts/images-generate.js` — reads `assets/raw/`, writes `assets/generated/`, writes `assets/generated/manifest.json` and `assets/image-metadata.csv`.
- `generate:og`: `node scripts/generate-og.js` — writes `assets/generated/og/*.png` and copies to `docs/images/og/`.
- `generate:sitemap`: `node scripts/generate-sitemap.js` — writes `docs/sitemap.xml` from SSG routes or final `dist`.
 - `generate:sitemap`: `node scripts/generate-sitemap.js` — writes `docs/sitemap.xml` from SSG routes or final `dist`.
 - `build:ssg-custom`: `node scripts/prerender.js` — custom SSG pipeline (see SSG facts). Should run `images:generate` + `generate:og` + `generate:sitemap` beforehand or as part of the pipeline.
 - `deploy:docs`: `npm run build:ssg-custom && rm -rf docs && mv dist docs`.

SSG facts
- Approach: custom prerender script using Vite SSR primitives.
- High-level steps: `vite build` (client, with `build.manifest = true`), `vite build --ssr src/entry-server.jsx` (SSR bundle), then `node scripts/prerender.js` to render routes to static HTML.
- Page sources: `pages/*.md` (frontmatter parsed with `gray-matter`) — frontmatter fields used: `title`, `description`, `og_image`, `hero`.
- Markdown rendering: use a lightweight renderer (`marked`) or `remark`/`rehype` for richer processing.
- Head injection: prerender builds per-page `<head>` from frontmatter (title/meta/OG/Twitter), injects LocalBusiness JSON-LD, and adds preload links (hero + primary font).
- Assets: `prerender.js` should use `dist/manifest.json` to reference hashed client assets and copy `assets/generated/` → `docs/images/` and `assets/generated/og/` → `docs/images/og/`.
- Route manifest: emit `dist/routes.json` (or `docs/routes.json`) for `generate-sitemap.js` and downstream steps.

Image pipeline (explicit rules)
- Tool: `sharp` in `scripts/images-generate.js`.
- Input: `assets/raw/`.
- Output: `assets/generated/` and copied to `docs/images/`.
- Variants: generate WebP + fallback JPEG/PNG at widths [320,640,1280,1920]. Filenames: kebab-case with width suffix (e.g. `hero-gates-1280.webp`).
- Produce LQIP base64 placeholder per hero/key image and include `lqip` in manifest.
- Manifest format (JSON): map original filename → array of variants {width, webp, jpeg, lqip}.
- Image metadata CSV: `assets/image-metadata.csv` columns `filename,alt_pl,caption_pl,width_px,tags`.

Open Graph and logo behavior
- OG images must be PNG 1200x630 and stored at `assets/generated/og/{page}.png` and copied to `docs/images/og/`.
- Preferred Home OG: render from provided site logo (`assets/raw/logo.svg` or `assets/raw/logo.png`). If logo absent, fallback to hero-based composition; regenerate when logo supplied.
- `generate-og.js` responsibilities: render 1200x630 PNG, overlay logo/title, save to assets and docs.

HTML/SEO/Accessibility requirements
- Pre-render per-page `<title>` and `<meta name="description">` (Polish) during SSG.
- Include OG tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:locale=pl_PL`) and Twitter card metadata.
- Inject LocalBusiness JSON-LD into `<head>` with exact contact values.
- Preload only: hero image and primary font via `<link rel="preload">` (hero link must include `fetchpriority="high"`).
- Images: use `srcset` + `sizes`, `loading="lazy"` (except preloaded hero), and `fetchpriority` on preloaded hero.
- All pages must render useful content without JS (static HTML present).

LocalBusiness JSON-LD values (exact)
- name: "Rofamet"
- telephone: "+48 513 642 695"
- email: "robertos242@onet.pl"
- address: "Korczyna 286, 38-340 Biecz, PL"
- url: "https://rofamet.pl"

Enforcement checks (must pass after build)
- `docs/index.html` exists and contains `<html lang="pl">`.
- `docs/sitemap.xml` exists and `docs/robots.txt` references it.
- `docs/images/` contains generated variants matching `assets/generated/manifest.json`.
- Each public page has `og:image` and a Polish `meta description`.

Operational notes
- No analytics by default; leave hook points for later insertion.
- Include `docs/CNAME` with `rofamet.pl` when ready.

Short actionable checklist for implementer
1. Add `scripts/images-generate.js` and `scripts/generate-og.js` (sharp-based) following image pipeline rules.
2. Implement custom SSG using Vite SSR primitives and a frontmatter-based page loader for Home and Portfolio.
3. Ensure `LocalBusiness` JSON-LD injection and preload hero font + image.
4. Run `npm ci` then `npm run build:ssg-custom` and verify enforcement checks.

