import { promises as fsp } from 'fs'
import path from 'path'
import sharp from 'sharp'

const __dirname = new URL('.', import.meta.url).pathname
const PROJECT_ROOT = path.resolve(__dirname, '..')
const INPUT = path.resolve(PROJECT_ROOT, 'assets/raw')
const OUT = path.resolve(PROJECT_ROOT, 'assets/generated')
const WIDTHS = [320, 640, 1280, 1920]
const CATEGORY_ALIASES = new Map([
  ['architektura-ogrodowa', 'architektura-ogrodowa'],
  ['balkony-francuskie', 'balkony-francuskie'],
  ['balustrady-barierki-porecze', 'balustrady-barierki-porecze'],
  ['balustrady', 'balustrady-barierki-porecze'],
  ['bramy-ogrodzenia', 'bramy-ogrodzenia'],
  ['cnc', 'cnc'],
  ['konstrukcje-stalowe', 'konstrukcje-stalowe'],
  ['meble-loft', 'meble-loft']
])
const DEFAULT_CATEGORY = 'konstrukcje-stalowe'

function normalizeSegment(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...await walk(fullPath))
      continue
    }

    if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function inferCategory(relativePath) {
  const segments = relativePath.split('/').filter(Boolean)
  const portfolioIndex = segments.indexOf('portfolio')

  if (portfolioIndex >= 0 && segments.length > portfolioIndex + 1) {
    const candidate = normalizeSegment(segments[portfolioIndex + 1])
    return CATEGORY_ALIASES.get(candidate) ?? candidate
  }

  if (segments.length <= 1) {
    return DEFAULT_CATEGORY
  }

  const candidate = normalizeSegment(segments[0])
  return CATEGORY_ALIASES.get(candidate) ?? candidate
}

function buildResponsiveImageMetadata(variants) {
  return {
    srcset: variants.map(variant => `${variant.webp} ${variant.width}w`).join(', '),
    src: variants[variants.length - 1]?.webp ?? ''
  }
}

function buildOutputName(relativePath) {
  return relativePath
    .replace(/\.[^.]+$/, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9/]+/gi, '-')
    .replace(/\/+/, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

async function build() {
  await fsp.mkdir(OUT, { recursive: true })
  const files = await walk(INPUT)
  const manifest = {}

  for (const file of files) {
    const relativePath = path.relative(INPUT, file).split(path.sep).join('/')
    const isPortfolioAsset = relativePath.startsWith('portfolio/')
    const category = isPortfolioAsset ? inferCategory(relativePath) : null
    const outputName = buildOutputName(relativePath)

    manifest[relativePath] = {
      kind: isPortfolioAsset ? 'portfolio' : 'hero',
      category,
      variants: []
    }

    for (const w of WIDTHS) {
      const outWebp = path.join(OUT, `${outputName}-${w}.webp`)
      await fsp.mkdir(path.dirname(outWebp), { recursive: true })
      await sharp(file).resize({ width: w }).toFile(outWebp)
      const assetPath = path.relative(PROJECT_ROOT, outWebp).split(path.sep).join('/')
      manifest[relativePath].variants.push({ width: w, webp: assetPath })
    }
  }

  await fsp.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log('images generated', Object.keys(manifest).length)
}

build().catch(err => { console.error(err); process.exit(1) })
