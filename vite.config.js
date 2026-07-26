import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    outDir: isSsrBuild ? 'dist-ssr' : 'docs',
    manifest: isSsrBuild ? false : 'manifest.json'
  }
}))
