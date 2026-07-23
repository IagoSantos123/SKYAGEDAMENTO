import dayjs from 'dayjs'

/**
 * Simula dias totalmente indisponíveis (folgas, domingos etc).
 * Retorna true se a data não puder ser selecionada.
 */
export function isDayUnavailable(date) {
  const d = dayjs(date)
  if (d.day() === 0) return true // domingo fechado
  if (d.isBefore(dayjs(), 'day')) return true // dias passados
  return false
}
