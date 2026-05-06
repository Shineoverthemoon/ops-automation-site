import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages under a repo subpath, change `base` to '/<repo-name>/'
export default defineConfig({
  plugins: [react()],
  base: './',
})
