import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'forms-hex2rgb',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
