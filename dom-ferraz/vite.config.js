import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import professionalsHandler from './api/professionals.js'
import servicesHandler from './api/services.js'
import availabilityHandler from './api/availability.js'
import clientsLookupHandler from './api/clients-lookup.js'
import bookingsHandler from './api/bookings.js'

const apiHandlers = {
  '/professionals': professionalsHandler,
  '/services': servicesHandler,
  '/availability': availabilityHandler,
  '/clients-lookup': clientsLookupHandler,
  '/bookings': bookingsHandler,
}

function localApiPlugin() {
  return {
    name: 'dom-ferraz-local-api',
    configureServer(server) {
      server.middlewares.use('/api', async (req, response, next) => {
        const url = new URL(req.url, 'http://localhost')
        const handler = apiHandlers[url.pathname]
        if (!handler) return next()

        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const rawBody = Buffer.concat(chunks).toString('utf8')

        req.query = Object.fromEntries(url.searchParams.entries())
        req.body = rawBody ? JSON.parse(rawBody) : undefined

        const res = {
          setHeader: (...args) => response.setHeader(...args),
          status(code) {
            response.statusCode = code
            return this
          },
          json(body) {
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(body))
            return this
          },
        }

        try {
          await handler(req, res)
        } catch (error) {
          console.error('[local-api]', error)
          if (!response.headersSent) {
            response.statusCode = 500
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
          }
          response.end(JSON.stringify({ error: 'Erro interno na API local.' }))
        }
      })
    },
  }
}

// Em produção, /api continua sendo executado pelas funções da Vercel.
// Em desenvolvimento, o plugin acima executa as mesmas funções dentro do Vite.
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
  plugins: [react(), localApiPlugin()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  }
})
