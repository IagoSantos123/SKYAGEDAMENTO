import { lucroMaisFetch } from './_lucromais.js'

// Expõe só o que a landing page precisa para montar os cards de
// profissionais — nunca repassa o token nem campos internos do LucroMais.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const date = typeof req.query.date === 'string' ? req.query.date : null
    const [response, blocksResponse] = await Promise.all([
      lucroMaisFetch('/agendamentos/colaboradores'),
      date
        ? lucroMaisFetch(`/agendamentos/bloqueios?data=${encodeURIComponent(date)}`)
        : Promise.resolve(null),
    ])

    if (!response.ok || (blocksResponse && !blocksResponse.ok)) {
      return res.status(502).json({ error: 'Não foi possível carregar os profissionais.' })
    }

    const colaboradores = await response.json()
    const blocks = blocksResponse ? await blocksResponse.json() : []
    const blockedIds = new Set(blocks.map((block) => String(block.colaboradorId)))
    const professionals = colaboradores
      .filter((c) => !blockedIds.has(String(c.id)))
      .slice()
      .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
      .map((c) => ({
        id: c.id,
        name: c.usuarioNome,
        color: c.cor || '#C6A15B',
      }))

    return res.status(200).json(professionals)
  } catch (error) {
    console.error('[api/professionals]', error)
    return res.status(500).json({ error: 'Erro interno ao carregar profissionais.' })
  }
}
