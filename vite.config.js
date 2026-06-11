import { defineConfig } from 'vite'

export default defineConfig({
  base: '/manager-wars/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html'
      }
    }
  }
})
