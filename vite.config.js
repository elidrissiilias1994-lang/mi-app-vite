import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Si estamos en Cloudflare Pages, usamos raíz. Si no (GitHub Pages/Local), usamos el nombre del repo.
  base: process.env.CF_PAGES ? '/' : '/mi-app-vite/',
})
