import { skyPublicFetch } from './_lucromais.js'

// Regra de negócio da SKY BARBEARIA: Segunda a Sábado, 09:00-19:00.
// A API do LucroMais não expõe horário de funcionamento nem disponibilidade
// pronta — só valida conflito no POST — então calculamos aqui.
const OPENING_MINUTES = 9 * 60
const CLOSING_MINUTES = 19 * 60
const SLOT_STEP_MINUTES = 30
const DEFAULT_SERVICE_DURATION = 30
const TIME_ZONE = 'America/Sao_Paulo'

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function toHHMM(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function isValidDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function getNowInTimeZone() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  }).formatToParts(new Date())

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))
  return {
    dateString: `${map.year}-${map.month}-${map.day}`,
    minutesSinceMidnight: Number(map.hour) * 60 + Number(map.minute),
  }
}

function getWeekday(dateString) {
  // dateString é YYYY-MM-DD; construir em UTC evita deslocar o dia por fuso.
  return new Date(`${dateString}T12:00:00Z`).getUTCDay()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { unidadeSlug, colaboradorId, data, servicoId } = req.query

  if (!colaboradorId || !isValidDateString(data)) {
    return res.status(400).json({ error: 'Parâmetros colaboradorId e data (YYYY-MM-DD) são obrigatórios.' })
  }

  const weekday = getWeekday(data)
  const now = getNowInTimeZone()
  const isPastDate = data < now.dateString

  if (weekday === 0 || isPastDate) {
    return res.status(200).json({ closed: true, slots: [] })
  }

  try {
    const [agendamentosRes, servicosRes] = await Promise.all([
      skyPublicFetch(
        unidadeSlug,
        `/agendamentos?inicio=${data}&fim=${data}&colaboradorId=${encodeURIComponent(colaboradorId)}`
      ),
      skyPublicFetch(unidadeSlug, '/servicos'),
    ])

    if (!agendamentosRes.ok || !servicosRes.ok) {
      return res.status(502).json({ error: 'Não foi possível calcular a disponibilidade.' })
    }

    const agendamentos = await agendamentosRes.json()
    const servicos = await servicosRes.json()
    const durationById = new Map(servicos.map((s) => [String(s.id), s.duration]))

    const requestedDuration =
      (servicoId && durationById.get(String(servicoId))) || DEFAULT_SERVICE_DURATION

    const busyIntervals = agendamentos
      .filter((a) => a.status !== 'cancelado')
      .map((a) => {
        const start = toMinutes(a.horario)
        const duration = durationById.get(String(a.servicoId)) || DEFAULT_SERVICE_DURATION
        return [start, start + duration]
      })

    const isToday = data === now.dateString

    const slots = []
    for (
      let start = OPENING_MINUTES;
      start + requestedDuration <= CLOSING_MINUTES;
      start += SLOT_STEP_MINUTES
    ) {
      const end = start + requestedDuration
      const overlapsBooking = busyIntervals.some(
        ([busyStart, busyEnd]) => start < busyEnd && end > busyStart
      )
      const isPastTime = isToday && start <= now.minutesSinceMidnight
      slots.push({
        time: toHHMM(start),
        available: !overlapsBooking && !isPastTime,
      })
    }

    return res.status(200).json({ closed: false, slots })
  } catch (error) {
    console.error('[api/availability]', error)
    return res.status(500).json({ error: 'Erro interno ao calcular disponibilidade.' })
  }
}
