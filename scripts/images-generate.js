import fs from 'fs'
import { promises as fsp } from 'fs'
import path from 'path'
import sharp from 'sharp'

const __dirname = new URL('.', import.meta.url).pathname
const INPUT = path.resolve(__dirname, '../assets/raw')
const OUT = path.resolve(__dirname, '../assets/generated')
const WIDTHS = [320, 640, 1280, 1920]

async function build(){
  await fsp.mkdir(OUT, { recursive: true })
  const files = (await fsp.readdir(INPUT)).filter(f => /\.(jpe?g|png|webp)$/i.test(f))
  const manifest = {}
  for (const file of files) {
    const name = path.parse(file).name.replace(/\s+/g, '-').toLowerCase()
    manifest[file] = []
    for (const w of WIDTHS) {
      const outWebp = path.join(OUT, `${name}-${w}.webp`)
      await sharp(path.join(INPUT, file)).resize({ width: w }).toFile(outWebp)
      manifest[file].push({ width: w, webp: `assets/generated/${path.basename(outWebp)}` })
    }
  }
  await fsp.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log('images generated', Object.keys(manifest).length)
}

build().catch(err => { console.error(err); process.exit(1) })
