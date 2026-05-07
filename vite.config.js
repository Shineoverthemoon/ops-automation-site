import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name for Pages deploys
// (project sites live at username.github.io/<repo-name>/)
export default defineConfig({
  plugins: [react()],
  base: '/ops-automation-site/',
})
