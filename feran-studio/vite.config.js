import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    // As funções em /api são serverless (Vercel) e não rodam dentro do Vite.
    // Para testar localmente, rode `vercel dev` (ele sobe as functions em
    // http://localhost:3000) e mantenha este proxy apontando para lá.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
