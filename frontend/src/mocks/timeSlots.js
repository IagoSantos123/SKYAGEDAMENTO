const ALL_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:30',
  '17:00',
]

/**
 * Simula disponibilidade de horários para uma data.
 * Usa o dia do mês para variar quais horários aparecem indisponíveis,
 * mantendo o mock determinístico entre renders.
 */
export function getAvailableSlots(date) {
  const day = date ? new Date(date).getDate() : 1
  return ALL_SLOTS.map((time, index) => ({
    time,
    available: (day + index) % 4 !== 0,
  }))
}
