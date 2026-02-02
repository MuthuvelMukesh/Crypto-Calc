import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]'
      }
    }
  },
  preview: {
    port: 5000
  }
})
