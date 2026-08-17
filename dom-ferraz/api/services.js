import { getUnitId, lucroMaisFetch } from './_lucromais.js'

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
    const unitId = getUnitId(req)
    if (!unitId) return res.status(400).json({ error: 'Unidade inválida ou não informada.' })
    const response = await lucroMaisFetch(unitId, '/agendamentos/servicos')
    if (!response.ok) {
      return res.status(502).json({ error: 'Não foi possível carregar os serviços.' })
    }

    const servicos = await response.json()
    const services = servicos.map((s) => ({
      id: s.id,
      name: s.nome,
      duration: s.duracaoMin,
      durationLabel: formatDurationLabel(s.duracaoMin),
      price: s.preco,
      color: s.cor || '#C6A15B',
    }))

    return res.status(200).json(services)
  } catch (error) {
    console.error('[api/services]', error)
    return res.status(500).json({ error: 'Erro interno ao carregar serviços.' })
  }
}
