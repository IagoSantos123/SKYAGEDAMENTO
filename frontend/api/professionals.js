import { lucroMaisFetch } from './_lucromais.js'

// Expõe só o que a landing page precisa para montar os cards de
// profissionais — nunca repassa o token nem campos internos do LucroMais.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const response = await lucroMaisFetch('/agendamentos/colaboradores')
    if (!response.ok) {
      return res.status(502).json({ error: 'Não foi possível carregar os profissionais.' })
    }

    const colaboradores = await response.json()
    const professionals = colaboradores
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
