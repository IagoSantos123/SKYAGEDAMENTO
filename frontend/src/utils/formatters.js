export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDateLong(date) {
  if (!date) return ''
  const jsDate = date.toDate ? date.toDate() : new Date(date)
  return jsDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

export function onlyDigits(value = '') {
  return value.replace(/\D/g, '')
}
