## Plan: Custom SSG with Vite SSR primitives

TL;DR
- Implement a custom SSG using Vite's SSR primitives: build a client bundle, build an SSR server bundle, and run a Node `prerender` script that imports the SSR bundle and renders each route to static HTML. Use `pages/*.md` frontmatter for per-page head/meta, inject LocalBusiness JSON-LD, preload hero image + font, copy generated images/OGs to `docs/`, and produce a route manifest for `sitemap.xml` and enforcement checks.

**Steps**
1. **Deps**: add minimal packages: `marked` (or `unified` + `remark` if preferred). Keep `gray-matter` (already present). No head library required (we'll build head from frontmatter).
2. **Vite build manifest**: update `vite.config.js` to set `build.manifest = true` so the client output manifest (`dist/manifest.json`) can be used to inject hashed client assets into prerendered HTML.
3. **Add SSR+client entries**:
   - `src/entry-server.jsx` — export `render(url, pageData)` that returns `{ html, head }`. Inside: `renderToString(<App page={pageData} url={url} />)` and build a `head` string from `pageData` (title, description, og etc.) plus LocalBusiness JSON-LD.
   - `src/entry-client.jsx` — hydrate using `hydrateRoot` and read `window.__PAGE__` to pass initial page props to `App`.
   - Keep or adapt `src/main.jsx` to reference the new client entry (or replace it with `entry-client.jsx`).
4. **SSG template**: add `src/ssr-template.html` derived from `index.html` but with placeholders for `%HEAD%` and `%APP%` and `<html lang="pl">`.
5. **Page discovery & rendering**:
   - `scripts/prerender.js` (Node script):
     - Read `pages/*.md` via `fs`, parse frontmatter using `gray-matter`, and convert markdown to HTML (`marked` or `remark`). Build an array of routes: `{ path, slug, title, description, og_image, hero, html }`.
     - Run `npm run images:generate` and `npm run generate:og` before rendering.
6. **Build pipeline inside `prerender.js`**:
   - Run `vite build` (client) to produce `dist/` (ensure `build.manifest = true`).
   - Run `vite build --ssr src/entry-server.jsx` to produce an SSR bundle (output is ESM). Be mindful of Node ESM import requirements (see Decisions below).
   - Import the built SSR module (either with dynamic `import()` of the built file or use `ssrLoadModule` during a Vite createServer step) and call its exported `render()` for each route, passing `pageData`.
   - For each route produce an HTML file by replacing `%HEAD%` and injecting the rendered app HTML into `%APP%`, and add a `script` snippet that sets `window.__PAGE__ = { ... }` for the client to hydrate with.
   - Use `dist/manifest.json` to find the hashed client JS/CSS and inject `<link rel="modulepreload">` / `<script type="module" src="...">` references.
7. **Asset & docs output**:
   - Write prerendered HTML files into `docs/<slug>/index.html` (or `docs/index.html` for `/`).
   - Copy `assets/generated/` → `docs/images/` and `assets/generated/og/` → `docs/images/og/` (scripts already exist to generate these).
   - Write `docs/CNAME` if needed.
8. **Sitemap & robots**:
   - Update `scripts/generate-sitemap.js` to either read the route list emitted by `prerender.js` or have `prerender.js` call `generate-sitemap.js` with the discovered routes. Ensure `docs/robots.txt` references `/sitemap.xml`.
9. **Scripts & package.json**:
   - Add a script: `build:ssg-custom`: `node scripts/prerender.js`.
   - Optionally alias `deploy:docs` to run `npm run build:ssg-custom && rm -rf docs && mv dist docs` (or produce `docs/` directly and skip mv).
10. **Preloads and JSON-LD**:
   - `entry-server.jsx` builds per-page `<head>` including: `<title>`, `<meta name="description">`, OG tags, Twitter card tags, `<meta property="og:locale" content="pl_PL">`, LocalBusiness JSON-LD (exact values), and preload links for hero image (with `fetchpriority="high"`) and primary font.
11. **Progressive hydration**:
   - Keep interactive parts in React components that hydrate on the client. The static HTML should contain usable content (no-JS requirement satisfied).
12. **Verification**:
   - Run `npm ci`, `npm run images:generate`, then `npm run build:ssg-custom`.
   - Checks to pass:
     1. `docs/index.html` exists and contains `<html lang="pl">`.
     2. `docs/sitemap.xml` exists and `docs/robots.txt` references it.
     3. `docs/images/` contains generated variants matching `assets/generated/manifest.json`.
     4. Each public page file contains a Polish `meta description` and an `og:image`.
     5. Opening any `docs/<page>/index.html` without JS shows useful content.

**Relevant files**
- Existing (inspect & adapt):
  - [package.json](package.json#L1-L200) — adjust scripts (add `build:ssg-custom`) and set `engines.node` to `20`.
  - [vite.config.js](vite.config.js#L1-L20) — set `build.manifest = true` (add plugin config as needed).
  - [index.html](index.html#L1-L40) — source template; copy/adapt into `src/ssr-template.html`.
  - [src/main.jsx](src/main.jsx#L1-L50) — current client entry (swap/replace with `entry-client.jsx`).
  - [src/App.jsx](src/App.jsx#L1-L50) — app component to render server-side as well.
  - [pages/index.md](pages/index.md#L1-L200) and [pages/portfolio.md](pages/portfolio.md#L1-L200) — markdown + frontmatter used as sources.
  - [scripts/images-generate.js](scripts/images-generate.js#L1-L200) — image pipeline (already matches plan).
  - [scripts/generate-og.js](scripts/generate-og.js#L1-L200) — OG generation (already present).
  - [scripts/generate-sitemap.js](scripts/generate-sitemap.js#L1-L200) — update to read route output from prerender step.
  - [assets/generated/manifest.json](assets/generated/manifest.json#L1-L50) — used to validate images.
  - [.github/instructions/IMPLEMENTATION_PLAN.instructions.md](.github/instructions/IMPLEMENTATION_PLAN.instructions.md#L1-L200) — reference plan.
- New files to add (examples):
  - src/entry-server.jsx
  - src/entry-client.jsx
  - src/ssr-template.html
  - scripts/prerender.js
  - scripts/build-routes.js (optional helper to emit routes manifest)

**Verification (detailed)**
1. `npm ci` installs deps.
2. `npm run images:generate` produces `assets/generated/*` and `assets/generated/manifest.json`.
3. `npm run build:ssg-custom` runs build+prerender and writes `docs/`:
   - open `docs/index.html` → `<html lang="pl">` and page HTML present without JS.
   - open `docs/portfolio/index.html` → contains `meta description` in Polish and an `og:image` pointing to `/images/og/portfolio.png`.
   - `docs/sitemap.xml` exists and `docs/robots.txt` references it.
   - `docs/images/` mirrors `assets/generated/`.

**Decisions & rationale**
- Use Vite SSR primitives + a dedicated `prerender.js` for full control of the pipeline (images → OG → client+server build → prerender → copy assets). This matches the repo's existing image/OG scripts and gives reproducible output.
- Build head/meta strings manually from page frontmatter (no `react-helmet`) to keep SSR simple and robust for static pages.
- Use a lightweight markdown renderer (`marked`) for speed and simplicity; recommend `remark` if you need more complex processing.
- Ensure `vite.config.js` outputs `manifest.json` so prerender can reference hashed assets reliably.
- Node ESM: SSR bundle output is ESM; the prerender runner will `import()` the server bundle. Ensure Node can import ESM (either set `type: "module"` in `package.json` or use a small loader shim).

**Further considerations (1–3)**
1. If you prefer MDX (React-renderable pages), we can add `vite-plugin-mdx` and render pages as React components directly in `entry-server.jsx` (simpler per-page rendering but more deps).
2. For local dev prerendering (fast iteration) use `vite dev` + `ssrLoadModule` (no full build) inside `scripts/prerender.js` when `NODE_ENV=development`.
3. For large sites, parallelize route rendering and generate a `routes.json` artifact for downstream tasks.

Next step
- I will not modify files yet. Confirm: should I proceed to scaffold the minimal files for the custom SSG (create `src/entry-server.jsx`, `src/entry-client.jsx`, `src/ssr-template.html`, and `scripts/prerender.js`) using `marked` for markdown rendering and manual head injection? If yes, I will implement and run the build locally to validate the verification checks.
