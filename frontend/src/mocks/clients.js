export const clients = [
  {
    id: 'client-1',
    name: 'João Silva',
    phone: '(83) 99999-9999',
    email: 'joao.silva@email.com',
  },
  {
    id: 'client-2',
    name: 'Maria Oliveira',
    phone: '(83) 98888-7777',
    email: 'maria.oliveira@email.com',
  },
  {
    id: 'client-3',
    name: 'Pedro Santos',
    phone: '(11) 97777-6666',
    email: 'pedro.santos@email.com',
  },
]

/**
 * Simula uma busca de cliente por telefone em uma base de dados.
 */
export function findClientByPhone(phone) {
  const digitsOnly = phone.replace(/\D/g, '')
  return clients.find(
    (client) => client.phone.replace(/\D/g, '') === digitsOnly
  )
}
