import { lucroMaisFetch } from './_lucromais.js'

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function phoneVariants(value) {
  let digits = onlyDigits(value)
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    digits = digits.slice(2)
  }

  const variants = new Set([digits])
  // Aceita também cadastros antigos sem o nono dígito do celular.
  if (digits.length === 11 && digits[2] === '9') {
    variants.add(`${digits.slice(0, 2)}${digits.slice(3)}`)
  } else if (digits.length === 10) {
    variants.add(`${digits.slice(0, 2)}9${digits.slice(2)}`)
  }
  return variants
}

function phonesMatch(first, second) {
  const firstVariants = phoneVariants(first)
  return [...phoneVariants(second)].some((phone) => firstVariants.has(phone))
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
      (c) => phonesMatch(c.telefone, phoneDigits) || phonesMatch(c.whatsapp, phoneDigits)
    )

    if (!found) {
      return res.status(404).json({ error: 'Cliente não encontrado.' })
    }

    return res.status(200).json({
      id: found.id,
      name: found.nome,
      phone: found.telefone || found.whatsapp || req.query.phone,
      email: found.email,
      birthDate: found.nascimento,
    })
  } catch (error) {
    console.error('[api/clients-lookup]', error)
    return res.status(500).json({ error: 'Erro interno ao buscar cliente.' })
  }
}
