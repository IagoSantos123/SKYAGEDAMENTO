export const UNITS = [
  {
    id: 'miramar',
    name: 'Miramar',
    caption: 'Unidade Miramar',
    location: 'Miramar · João Pessoa',
    professionals: [
      'JARDIELSON ANDRADE DA SILVA',
      'ROBERTO PINTO DA SILVA',
    ],
  },
  {
    id: 'sape',
    name: 'Sapé',
    caption: 'Unidade Sapé',
    location: 'Centro · Sapé',
    professionals: [
      'ALYSSON HENRIQUE ALVES CONSTANTINO',
      'FABIO FERRAZ',
      'JEAN CARLOS FRANCISCO HERMINIO',
      'KAUAN BARBOSA',
      'JOSÉ MARCOS DA SILVA FRANÇA',
      'JOSÉ ROBSON ERNESTO DO NASCIMENTO',
    ],
  },
  {
    id: 'manaira',
    name: 'Manaíra',
    caption: 'Unidade Manaíra',
    location: 'Manaíra · João Pessoa',
    professionals: [
      'JOHN LUCAS DOS SANTOS CALCIO',
      'JOSÉ MATHEUS TARGINO DA SILVA',
    ],
  },
]

export function normalizeName(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

export function belongsToUnit(professionalName, unit) {
  const candidate = normalizeName(professionalName)
  return unit?.professionals.some((name) => {
    const expected = normalizeName(name)
    return candidate === expected || candidate.includes(expected) || expected.includes(candidate)
  })
}
