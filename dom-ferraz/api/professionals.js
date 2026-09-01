import { getUnitId, lucroMaisFetch } from './_lucromais.js'

// Expõe só o que a landing page precisa para montar os cards de
// profissionais — nunca repassa o token nem campos internos do LucroMais.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const unitId = getUnitId(req)
    if (!unitId) return res.status(400).json({ error: 'Unidade inválida ou não informada.' })
    const date = typeof req.query.date === 'string' ? req.query.date : null
    const [response, blocksResponse] = await Promise.all([
      lucroMaisFetch(unitId, '/agendamentos/colaboradores'),
      date
        ? lucroMaisFetch(unitId, `/agendamentos/bloqueios?data=${encodeURIComponent(date)}`)
        : Promise.resolve(null),
    ])

    if (!response.ok || (blocksResponse && !blocksResponse.ok)) {
      return res.status(502).json({ error: 'Não foi possível carregar os profissionais.' })
    }

    const colaboradores = await response.json()
    const blocks = blocksResponse ? await blocksResponse.json() : []
    // Bloqueios parciais não retiram o profissional da escolha: eles apenas
    // desabilitam os horários correspondentes na etapa de disponibilidade.
    const blockedIds = new Set(
      blocks
        .filter((block) => block.diaInteiro || (!block.horaInicio && !block.horaFim))
        .map((block) => String(block.colaboradorId))
    )
    const professionals = colaboradores
      .filter((c) => !blockedIds.has(String(c.id)))
      .slice()
      .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
      .map((c) => ({
        id: c.id,
        name: c.usuarioNome,
        color: c.cor || '#C6A15B',
        avatarUrl: c.avatarUrl || c.avatar_url || null,
        avatarPosition: c.avatarPosition || c.avatar_position || '50% 50%',
      }))

    return res.status(200).json(professionals)
  } catch (error) {
    console.error('[api/professionals]', error)
    return res.status(500).json({ error: 'Erro interno ao carregar profissionais.' })
  }
}
