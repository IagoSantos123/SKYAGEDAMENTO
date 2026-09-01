import { getUnitId, lucroMaisFetch } from './_lucromais.js'

function isValidDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function isValidTimeString(value) {
  return typeof value === 'string' && /^\d{2}:\d{2}$/.test(value)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const {
    colaboradorId,
    clienteNome,
    data,
    horario,
    clienteId,
    clienteTelefone,
    clienteEmail,
    clienteNascimento,
    servicoId,
    servicoIds,
    servicos,
    servicoNome,
    observacao,
  } = req.body || {}

  if (!colaboradorId || !clienteNome || !isValidDateString(data) || !isValidTimeString(horario)) {
    return res.status(400).json({
      error: 'colaboradorId, clienteNome, data (YYYY-MM-DD) e horario (HH:mm) são obrigatórios.',
    })
  }

  try {
    const unitId = getUnitId(req)
    if (!unitId) return res.status(400).json({ error: 'Unidade inválida ou não informada.' })
    const response = await lucroMaisFetch(unitId, '/agendamentos', {
      method: 'POST',
      body: JSON.stringify({
        colaboradorId,
        clienteNome,
        data,
        horario,
        clienteId,
        clienteTelefone,
        clienteEmail,
        clienteNascimento,
        servicoId,
        servicoIds,
        servicos,
        servicoNome,
        observacao,
        // Agendamento público entra sempre como pendente de confirmação —
        // o status nunca é aceito vindo do formulário público.
        status: 'aguardando',
      }),
    })

    const body = await response.json().catch(() => null)

    if (!response.ok) {
      return res.status(response.status).json({
        error: body?.error || body?.message || 'Não foi possível criar o agendamento.',
      })
    }

    return res.status(201).json({
      id: body?.id,
      status: body?.status,
      data: body?.data,
      horario: body?.horario,
    })
  } catch (error) {
    console.error('[api/bookings]', error)
    return res.status(500).json({ error: 'Erro interno ao criar agendamento.' })
  }
}
