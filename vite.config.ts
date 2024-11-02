import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/flag-colors-front/",
  plugins: [svelte()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.first.org/data/v1/countries?limit=250',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
