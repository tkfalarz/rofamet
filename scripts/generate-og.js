import fs from 'fs'
import { promises as fsp } from 'fs'
import path from 'path'
import sharp from 'sharp'

const __dirname = new URL('.', import.meta.url).pathname
const OUT = path.resolve(__dirname, '../assets/generated/og')
await fsp.mkdir(OUT, { recursive: true })

async function createOG(filename, title) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FF6B35"/><text x="50%" y="46%" font-family="Arial, sans-serif" font-size="72" font-weight="700" text-anchor="middle" fill="#fff">Rofamet</text><text x="50%" y="60%" font-family="Arial, sans-serif" font-size="34" text-anchor="middle" fill="#fff">${title}</text></svg>`
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, filename))
  console.log(`OG generated: ${filename}`)
}

Promise.all([
  createOG('home.png', 'Bramy, balustrady i konstrukcje stalowe'),
  createOG('portfolio.png', 'Portfolio realizacji')
]).catch(err => { console.error(err); process.exit(1) })
