import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/pj3/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('jspdf')) return 'export-pdf'
          if (id.includes('jszip')) return 'export-zip'
          if (id.includes('html-to-image')) return 'export-image'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
