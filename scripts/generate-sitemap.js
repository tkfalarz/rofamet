import { promises as fsp } from 'fs'
import path from 'path'
import { categoryDefinitions } from '../src/lib/gallery-categories.js'

const __dirname = new URL('.', import.meta.url).pathname
const OUT = path.resolve(__dirname, '../docs')
await fsp.mkdir(OUT, { recursive: true })

const urls = ['/', '/portfolio/', ...categoryDefinitions.map(category => category.path)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>https://rofamet.pl${u}</loc></url>`).join('\n')}\n</urlset>`
await fsp.writeFile(path.join(OUT, 'sitemap.xml'), sitemap)
console.log('sitemap generated')
