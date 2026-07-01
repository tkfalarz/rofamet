# Consolidated Page & Content Plan — Rofamet (compact, facts-only)

Scope
- Machine-actionable content and metadata spec for the site. Language: Polish (final). This English file is an implementation spec for AI/automation.

Pages
- Page 1 — Home (`/`): single page containing Home, About, and Contact sections.
- Page 2 — Portfolio (`/portfolio/`): project gallery and index. No separate project detail pages; items open in a lightbox/overlay.

Frontmatter rules (per page)
- Must include: `title` (50–60 chars target) and `description` (140–160 chars) in Polish.
- OG image path: `og_image` pointing to `images/og/{page}.png` (generated).
- Title pattern: `{Page} — Rofamet`.

Required frontmatter examples (Polish)
- Home:
  ```yaml
  title: "Rofamet — konstrukcje stalowe i bramy przemysłowe"
  description: "Rofamet projektuje, produkuje i montuje konstrukcje stalowe oraz bramy przemysłowe — kompleksowe realizacje dla firm. Sprawdź portfolio i skontaktuj się."
  og_image: "images/og/home.png"
  ```
- Portfolio:
  ```yaml
  title: "Portfolio — Rofamet"
  description: "Galeria wybranych realizacji Rofamet: konstrukcje stalowe, bramy przemysłowe i montaże. Zobacz fotografie, parametry techniczne oraz rok realizacji."
  og_image: "images/og/portfolio.png"
  ```

Content structure (concise)
- Home sections order: Header (logo+nav) → Hero (H1, lead, CTA → `/portfolio`) → Portfolio preview (6 thumbnails → lightbox) → About (2–3 paragraphs + services) → Contact (tel/mail/address links) → Footer.
- Portfolio: responsive grid of cards; each card shows responsive image, `title`, `short` (1 sentence). Clicking opens overlay with gallery and spec list (client, year, materials, dimensions).

Image pipeline (precise)
- Input folder: `assets/raw/` (images and optional `logo.svg`).
- Output folder: `assets/generated/` and copied to `docs/images/` on build.
- Variants: generate WebP + fallback JPEG/PNG at widths [320,640,1280,1920]; filenames kebab-case with width suffix (e.g., `hero-gates-1280.webp`).
- Produce per-image `lqip` (base64) for hero/key images.
- Manifest: `assets/generated/manifest.json` mapping original→[{width,webp,jpeg,lqip}].
- Metadata CSV: `assets/image-metadata.csv` columns `filename,alt_pl,caption_pl,width_px,tags`.

Hero preload and LQIP
- Preload only one image (Home hero) and the primary font via `<link rel="preload">` in `<head>`.
- Preload tag must include `imagesrcset`, `imagesizes` and `fetchpriority="high"`.
- Include LQIP as blurred inline placeholder in markup until image loads.

Open Graph generation
- Preferred Home OG: render centered site logo (`assets/raw/logo.svg` or `assets/raw/logo.png`) on branded background to 1200×630 PNG at `assets/generated/og/home.png` and copy to `docs/images/og/home.png`.
- Fallback: if logo missing, create OG from Home hero with title overlay; regenerate when logo arrives.
- Generator script: `scripts/generate-og.js` must accept frontmatter values (title) and produce consistent branded outputs.

Scripts & pipeline commands
- `dev`: `vite` (dev server + HMR).
- `images:generate`: `node scripts/images-generate.js` (sharp) to build variants, lqip, manifest and copy to docs.
- `generate:og`: `node scripts/generate-og.js` to render OG PNGs into `assets/generated/og/` and copy to `docs/images/og/`.
- `generate:sitemap`: `node scripts/generate-sitemap.js` to write `docs/sitemap.xml` from SSG routes or `dist`.
- `build:ssg`: `vite-ssg build` (ensure runs image + og + sitemap steps before or after as configured).
- `deploy:docs`: `npm run build:ssg && rm -rf docs && mv dist docs`.

SEO, head & structured data
- Each page must include: `title`, `meta name="description"` (Polish), `og:*` and `twitter:*` tags with `og:locale=pl_PL` and `twitter:card=summary_large_image`.
- Inject LocalBusiness JSON-LD into every page's `<head>` with exact values:
  - name: "Rofamet"
  - telephone: "+48 513 642 695"
  - email: "robertos242@onet.pl"
  - address: "Korczyna 286, 38-340 Biecz, PL"
  - url: "https://rofamet.pl"

Color tokens (reference)
- Use tokens defined in `/styles/tokens.css` and `/tokens.json`:
  `--color-primary`, `--color-secondary`, `--color-accent`, `--color-on-accent`, `--color-text`, `--color-muted`, `--color-surface`, `--color-border`.
- CTAs must use `--color-accent` (bg) and `--color-on-accent` (text).

Accessibility & best practices
- Pre-render useful content without JS.
- Images: `srcset`, `sizes`, `loading="lazy"` (except preloaded hero), and descriptive `alt` from CSV.
- Ensure color contrast meets WCAG AA: script must assert contrast(`--color-text`,`--color-primary`)≥4.5 and contrast(`--color-on-accent`,`--color-accent`)≥4.5.

Enforcement checks (automatable)
1. `docs/index.html` exists and contains `<html lang="pl">`.
2. `docs/sitemap.xml` exists and `docs/robots.txt` references it.
3. `docs/images/` contains files that match `assets/generated/manifest.json`.
4. Each public page contains `og:image` and a Polish `meta description`.

Deliverables (minimal)
- `/styles/tokens.css` and `/tokens.json`.
- `scripts/images-generate.js` and `scripts/generate-og.js` (sharp-based).
- `assets/generated/manifest.json` and `assets/image-metadata.csv`.
- Home and Portfolio frontmatter files with Polish `title`, `description`, `og_image`.

Quick run (after assets/raw/ added)
```bash
npm ci
npm run images:generate
npm run generate:og
npm run build:ssg
npm run generate:sitemap
``` 

This consolidated file is compact, non-redundant and intended for direct consumption by automation and AI implementers.
