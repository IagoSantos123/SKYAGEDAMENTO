import { skyPublicFetch } from './_lucromais.js'

function formatDurationLabel(minutes) {
  if (!minutes) return ''
  if (minutes < 60) return `${minutes} minutos`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const hoursLabel = `${hours}h`
  return rest ? `${hoursLabel}${rest}min` : hoursLabel
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const colaboradorId = req.query.colaboradorId
    const query = colaboradorId
      ? `?colaboradorId=${encodeURIComponent(colaboradorId)}`
      : ''
    const response = await skyPublicFetch(req.query.unidadeSlug, `/servicos${query}`)
    if (!response.ok) {
      return res.status(502).json({ error: 'Não foi possível carregar os serviços.' })
    }

    const servicos = await response.json()
    const services = servicos.map((s) => ({
      id: s.id,
      name: s.name,
      duration: s.duration,
      durationLabel: s.durationLabel || formatDurationLabel(s.duration),
      price: s.price,
      priceLabel: s.priceLabel,
      color: s.color || s.cor || '#C6A15B',
    }))

    return res.status(200).json(services)
  } catch (error) {
    console.error('[api/services]', error)
    return res.status(500).json({ error: 'Erro interno ao carregar serviços.' })
  }
}
