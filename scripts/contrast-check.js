#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

function hexToRgb(hex) {
  if (!hex) return null
  const h = hex.replace('#', '').trim()
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16)
    const g = parseInt(h[1] + h[1], 16)
    const b = parseInt(h[2] + h[2], 16)
    return [r, g, b]
  } else if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return [r, g, b]
  } else {
    return null
  }
}

function srgbToLinear(channel) {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance(rgb) {
  const [r, g, b] = rgb
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
}

function contrastRatio(hexA, hexB) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  if (!a || !b) return null
  const la = luminance(a)
  const lb = luminance(b)
  const L1 = Math.max(la, lb)
  const L2 = Math.min(la, lb)
  return (L1 + 0.05) / (L2 + 0.05)
}

function fmt(n) {
  return typeof n === 'number' ? n.toFixed(2) : 'n/a'
}

try {
  const root = process.cwd()
  const tokensPath = path.join(root, 'tokens.json')
  if (!fs.existsSync(tokensPath)) {
    console.error('tokens.json not found at', tokensPath)
    process.exit(2)
  }
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))

  const get = (name) => tokens[name] || (tokens.rgb && tokens.rgb[name])

  const combos = [
    { name: 'Text / Surface', a: '--color-text', b: '--color-surface', min: 4.5 },
    { name: 'Accent / On-accent', a: '--color-accent', b: '--color-on-accent', min: 4.5 },
    { name: 'Accent / Surface (CTA)', a: '--color-accent', b: '--color-surface', min: 3.0 },
    { name: 'Muted / Surface', a: '--color-muted', b: '--color-surface', min: 3.0 },
    { name: 'Primary / Text', a: '--color-primary', b: '--color-text', min: 3.0 }
  ]

  console.log('Contrast check — using tokens.json at', tokensPath)
  let failed = 0
  combos.forEach(c => {
    const va = get(c.a)
    const vb = get(c.b)
    if (!va || !vb) {
      console.log(`- ${c.name}: missing token ${!va ? c.a : c.b}`)
      failed++
      return
    }
    const ratio = contrastRatio(va, vb)
    const pass = ratio !== null && ratio >= c.min
    console.log(`- ${c.name}: ${va} vs ${vb} → ${fmt(ratio)} :1 — ${pass ? 'PASS' : 'FAIL (min ' + c.min + ')'}`)
    if (!pass) failed++
  })

  if (failed > 0) {
    console.error(`\nContrast check failed (${failed} issues).`)
    process.exit(2)
  } else {
    console.log('\nAll contrast checks passed.')
    process.exit(0)
  }
} catch (err) {
  console.error('Error running contrast check:', err)
  process.exit(2)
}
