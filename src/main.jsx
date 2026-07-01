// Minimal Buffer polyfill for browser environment (covers Buffer.from/toString usage)
// This prevents "ReferenceError: Can't find variable: Buffer" for modules
// that expect Node's Buffer in client-side runs. It's intentionally small.
if (typeof globalThis.Buffer === 'undefined') {
  class MinimalBuffer extends Uint8Array {
    static from(input, encoding = 'utf8') {
      if (typeof input === 'string') {
        return new MinimalBuffer(new TextEncoder().encode(input))
      }
      if (input instanceof ArrayBuffer) return new MinimalBuffer(new Uint8Array(input))
      if (ArrayBuffer.isView(input)) return new MinimalBuffer(new Uint8Array(input.buffer))
      throw new TypeError('MinimalBuffer.from: unsupported input')
    }
    toString(encoding = 'utf8') {
      if (encoding && encoding !== 'utf8' && encoding !== 'utf-8') {
        // best-effort: only utf8 supported in this tiny shim
        console.warn('MinimalBuffer.toString: only utf8 supported in polyfill')
      }
      return new TextDecoder().decode(this)
    }
    static isBuffer(obj) {
      return obj instanceof MinimalBuffer || obj instanceof Uint8Array
    }
  }
  globalThis.Buffer = MinimalBuffer
}

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
