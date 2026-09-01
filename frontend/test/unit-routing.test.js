import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import availabilityHandler from '../api/availability.js'
import bookingsHandler from '../api/bookings.js'
import servicesHandler from '../api/services.js'

const frontendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(frontendDir, relativePath), 'utf8')

function responseRecorder() {
  return {
    statusCode: 200,
    body: null,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
  }
}

test('serviços preservam unidade e profissional selecionados', async () => {
  const originalFetch = global.fetch
  let calledUrl = ''
  global.fetch = async (url) => {
    calledUrl = String(url)
    return { ok: true, json: async () => [] }
  }

  try {
    const res = responseRecorder()
    await servicesHandler({ method: 'GET', query: { unidadeSlug: 'suzane', colaboradorId: '44' } }, res)
    assert.equal(res.statusCode, 200)
    assert.match(calledUrl, /\/sky-barbearia\/suzane\/servicos\?colaboradorId=44$/)
  } finally {
    global.fetch = originalFetch
  }
})

test('disponibilidade consulta agenda e duração dentro do mesmo fluxo', async () => {
  const originalFetch = global.fetch
  const urls = []
  global.fetch = async (url) => {
    urls.push(String(url))
    if (String(url).endsWith('/configuracao')) {
      return {
        ok: true,
        json: async () => ({ horaInicio: '08:00', horaFim: '18:00', intervaloMin: 40, timeZone: 'America/Fortaleza' }),
      }
    }
    if (String(url).includes('/agendamentos?')) {
      return { ok: true, json: async () => [] }
    }
    return { ok: true, json: async () => [{ id: 'srv_suzane', duration: 60 }] }
  }

  try {
    const res = responseRecorder()
    await availabilityHandler({
      method: 'GET',
      query: {
        unidadeSlug: 'suzane',
        colaboradorId: '44',
        servicoId: 'srv_suzane',
        data: '2099-08-27',
      },
    }, res)
    assert.equal(res.statusCode, 200)
    assert.ok(urls.every((url) => url.includes('/sky-barbearia/suzane/')))
    assert.ok(urls.some((url) => url.endsWith('/servicos?colaboradorId=44')))
    assert.ok(urls.some((url) => url.endsWith('/configuracao')))
    assert.equal(res.body.slotStepMinutes, 40)
    assert.deepEqual(res.body.slots.slice(0, 3).map((slot) => slot.time), ['08:00', '08:40', '09:20'])
  } finally {
    global.fetch = originalFetch
  }
})

test('criação do agendamento usa a unidade da URL pública', async () => {
  const originalFetch = global.fetch
  let calledUrl = ''
  let calledBody = null
  global.fetch = async (url, options) => {
    calledUrl = String(url)
    calledBody = JSON.parse(options.body)
    return {
      ok: true,
      status: 201,
      json: async () => ({ id: 123, status: 'aguardando', data: '2099-08-27', horario: '10:00' }),
    }
  }

  try {
    const res = responseRecorder()
    await bookingsHandler({
      method: 'POST',
      body: {
        unidadeSlug: 'suzane',
        colaboradorId: '44',
        servicoId: 'srv_suzane',
        clienteNome: 'Cliente Teste',
        data: '2099-08-27',
        horario: '10:00',
      },
    }, res)
    assert.equal(res.statusCode, 201)
    assert.match(calledUrl, /\/sky-barbearia\/suzane\/agendamentos$/)
    assert.equal(calledBody.status, 'aguardando')
    assert.equal(calledBody.unidadeId, undefined)
  } finally {
    global.fetch = originalFetch
  }
})

test('cards e resumo usam foto e enquadramento cadastrados no LucroMais', () => {
  const professionalStep = read('src/components/steps/ProfessionalStep.jsx')
  const summaryStep = read('src/components/steps/SummaryStep.jsx')

  assert.match(professionalStep, /src=\{professional\.avatarUrl \|\| undefined\}/)
  assert.match(professionalStep, /professional\.avatarPosition \|\| '50% 50%'/)
  assert.match(summaryStep, /src=\{professional\?\.avatarUrl \|\| undefined\}/)
  assert.match(summaryStep, /professional\?\.avatarPosition \|\| '50% 50%'/)
})
