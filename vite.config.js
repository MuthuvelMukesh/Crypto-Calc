import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: process.env.NODE_ENV === 'production' ? [] : [basicSsl()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: './index.html',
        privacy: './privacy.html',
        terms: './terms.html'
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    https: process.env.NODE_ENV === 'production' ? true : false
  },
  preview: {
    port: 5000,
    open: true
  },
  optimizeDeps: {
    include: []
  }
})
