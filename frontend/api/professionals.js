import { skyPublicFetch } from './_lucromais.js'

// Expõe só o que a landing page precisa para montar os cards de
// profissionais — nunca repassa o token nem campos internos do LucroMais.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const response = await skyPublicFetch(req.query.unidadeSlug, '/profissionais')
    if (!response.ok) {
      return res.status(502).json({ error: 'Não foi possível carregar os profissionais.' })
    }

    const professionals = await response.json()

    return res.status(200).json(professionals)
  } catch (error) {
    console.error('[api/professionals]', error)
    return res.status(500).json({ error: 'Erro interno ao carregar profissionais.' })
  }
}
