import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'
import { categoryDefinitions } from '../src/lib/gallery-categories.js'
import { buildHead, pageMetadata } from '../src/lib/seo.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = path.join(projectRoot, 'docs')
const ssrDir = path.join(projectRoot, 'dist-ssr')
const routes = ['/', '/portfolio/', ...categoryDefinitions.map(category => category.path)]

function buildDocument({ route, appHtml, assetManifest }) {
  const entry = Object.values(assetManifest).find(asset => asset.isEntry)
  if (!entry) throw new Error('Client manifest is missing its HTML entry')

  const cssLinks = (entry.css ?? [])
    .map(file => `    <link rel="stylesheet" href="/${file}">`)
    .join('\n')
  const pageState = JSON.stringify({ route }).replaceAll('<', '\\u003c')

  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${buildHead(route)}
${cssLinks}
  </head>
  <body>
    <div id="app">${appHtml}</div>
    <script>window.__PAGE__=${pageState}</script>
    <script type="module" src="/${entry.file}"></script>
  </body>
</html>
`
}

await rm(ssrDir, { recursive: true, force: true })
await build({ root: projectRoot })
await build({ root: projectRoot, build: { ssr: 'src/entry-server.jsx' } })

const assetManifest = JSON.parse(await readFile(path.join(docsDir, 'manifest.json'), 'utf8'))
const server = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

for (const route of routes) {
  const outputDirectory = route === '/' ? docsDir : path.join(docsDir, route.slice(1))
  await mkdir(outputDirectory, { recursive: true })
  await writeFile(
    path.join(outputDirectory, 'index.html'),
    buildDocument({ route, appHtml: server.render(route), assetManifest })
  )
}

await cp(path.join(projectRoot, 'assets', 'generated'), path.join(docsDir, 'assets', 'generated'), { recursive: true })

const sitemapEntries = routes
  .map(route => `  <url><loc>https://rofamet.pl${route}</loc></url>`)
  .join('\n')
await writeFile(
  path.join(docsDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${routes.length} pages: ${Object.keys(pageMetadata).join(', ')}`)