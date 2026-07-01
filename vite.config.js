import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rofamet/',
  plugins: [react()],
  build: {
    target: 'es2020',
    outDir: 'docs'
  }
})
