import { lucroMaisFetch } from './_lucromais.js'

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

// IMPORTANTE: GET /agendamentos/clientes devolve a lista inteira de clientes
// da empresa (nome, telefone, email, nascimento). Nunca repassamos essa
// lista completa para o navegador — filtramos aqui no servidor e devolvemos
// só o único cliente que corresponde ao telefone informado.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const phoneDigits = onlyDigits(req.query.phone)
  if (!phoneDigits) {
    return res.status(400).json({ error: 'Parâmetro phone é obrigatório.' })
  }

  try {
    const response = await lucroMaisFetch('/agendamentos/clientes')
    if (!response.ok) {
      return res.status(502).json({ error: 'Não foi possível buscar o cliente.' })
    }

    const clientes = await response.json()
    const found = clientes.find(
      (c) => onlyDigits(c.telefone) === phoneDigits || onlyDigits(c.whatsapp) === phoneDigits
    )

    if (!found) {
      return res.status(404).json({ error: 'Cliente não encontrado.' })
    }

    return res.status(200).json({
      id: found.id,
      name: found.nome,
      phone: found.telefone,
      email: found.email,
    })
  } catch (error) {
    console.error('[api/clients-lookup]', error)
    return res.status(500).json({ error: 'Erro interno ao buscar cliente.' })
  }
}
