/* global process, Buffer, global */
import test from 'node:test'
import assert from 'node:assert/strict'

process.env.LUCROMAIS_MANAIRA_EMAIL = 'teste@exemplo.com'
process.env.LUCROMAIS_MANAIRA_SENHA = 'segredo'

const jwtPayload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')
const token = `header.${jwtPayload}.signature`

test('disponibilidade da Dom Ferraz consome a grade central de 40 minutos', async () => {
  const urls = []
  global.fetch = async (url) => {
    urls.push(String(url))
    if (String(url).endsWith('/auth/login')) {
      return { ok: true, status: 200, json: async () => ({ token }) }
    }
    if (String(url).endsWith('/agendamentos/configuracao')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ horaInicio: '09:00', horaFim: '19:00', intervaloMin: 40 }),
      }
    }
    if (String(url).includes('/agendamentos/servicos')) {
      return { ok: true, status: 200, json: async () => [{ id: 'corte', duracaoMin: 30 }] }
    }
    return { ok: true, status: 200, json: async () => [] }
  }

  const { default: handler } = await import('./availability.js')
  const req = {
    method: 'GET',
    query: { unitId: 'manaira', colaboradorId: '1', servicoId: 'corte', data: '2099-09-01' },
  }
  let statusCode = 0
  let body = null
  const res = {
    setHeader() {},
    status(value) { statusCode = value; return this },
    json(value) { body = value; return value },
  }

  await handler(req, res)

  assert.equal(statusCode, 200)
  assert.equal(body.closed, false)
  assert.equal(body.slotStepMinutes, 40)
  assert.deepEqual(body.slots.slice(0, 3).map((slot) => slot.time), ['09:00', '09:40', '10:20'])
  assert.equal(body.slots.some((slot) => slot.time === '09:30'), false)
  assert.equal(urls.some((url) => url.endsWith('/agendamentos/configuracao')), true)
})
