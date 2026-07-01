import fs from 'fs'
import { promises as fsp } from 'fs'
import path from 'path'
import sharp from 'sharp'

const __dirname = new URL('.', import.meta.url).pathname
const OUT = path.resolve(__dirname, '../assets/generated/og')
await fsp.mkdir(OUT, { recursive: true })

async function createHomeOG(){
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FF6B35"/><text x="50%" y="50%" font-size="64" text-anchor="middle" fill="#fff">Rofamet</text></svg>`
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT,'home.png'))
  console.log('OG generated: home.png')
}

createHomeOG().catch(err => { console.error(err); process.exit(1) })
