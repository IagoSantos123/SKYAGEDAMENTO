// Camada de acesso às funções serverless em /api (que por sua vez falam
// com o backend do LucroMais). O frontend nunca vê token, senha ou a lista
// completa de clientes — só os endpoints estreitos definidos aqui.
import axios from 'axios'

const apiClient = axios.create({ baseURL: '/api' })

function extractErrorMessage(error, fallback) {
  return error?.response?.data?.error || fallback
}

export async function getProfessionals(unitId, date) {
  try {
    const { data } = await apiClient.get('/professionals', { params: { unitId, date } })
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Não foi possível carregar os profissionais.'))
  }
}

export async function getServices(unitId) {
  try {
    const { data } = await apiClient.get('/services', { params: { unitId } })
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Não foi possível carregar os serviços.'))
  }
}

export async function getAvailability({ unitId, colaboradorId, servicoId, date }) {
  try {
    const { data } = await apiClient.get('/availability', {
      params: { unitId, colaboradorId, servicoId, data: date },
    })
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Não foi possível calcular a disponibilidade.'))
  }
}

export async function lookupClientByPhone(unitId, phone) {
  try {
    const { data } = await apiClient.get('/clients-lookup', { params: { unitId, phone } })
    return data
  } catch (error) {
    if (error?.response?.status === 404) return null
    throw new Error(extractErrorMessage(error, 'Não foi possível buscar o cliente.'))
  }
}

export async function createBooking(payload) {
  try {
    const { data } = await apiClient.post('/bookings', payload)
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Não foi possível criar o agendamento.'))
  }
}
