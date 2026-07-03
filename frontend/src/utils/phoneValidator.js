import { onlyDigits } from './formatters'

const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
  37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
  65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
])

/**
 * Valida se o número corresponde a um celular brasileiro válido:
 * DDD reconhecido + 9 dígitos começando em 9.
 */
export function isValidBrazilianMobile(phone) {
  const digits = onlyDigits(phone)
  if (digits.length !== 11) return false

  const ddd = Number(digits.slice(0, 2))
  const firstDigit = digits.charAt(2)

  return DDDS_VALIDOS.has(ddd) && firstDigit === '9'
}
