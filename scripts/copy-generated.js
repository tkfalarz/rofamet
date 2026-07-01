import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const projectRoot = process.cwd()
const src = join(projectRoot, 'assets', 'generated')
const dest = join(projectRoot, 'docs', 'assets', 'generated')

if (!existsSync(src)) {
  console.error('Cannot copy generated assets: source directory does not exist:', src)
  process.exit(1)
}

mkdirSync(join(projectRoot, 'docs', 'assets'), { recursive: true })
cpSync(src, dest, { recursive: true })
console.log(`Copied generated assets to ${dest}`)
