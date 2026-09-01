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
        json: async () => ({ horaInicio: '08:20', horaFim: '18:20', intervaloMin: 40 }),
      }
    }
    if (String(url).includes('/agendamentos/servicos')) {
      return {
        ok: true,
        status: 200,
        json: async () => [
          { id: 'corte', duracaoMin: 30 },
          { id: 'pezinho', duracaoMin: 30 },
        ],
      }
    }
    if (String(url).includes('/agendamentos/bloqueios')) {
      return {
        ok: true,
        status: 200,
        json: async () => [{ colaboradorId: '1', diaInteiro: false, horaInicio: '15:00', horaFim: '19:00' }],
      }
    }
    return { ok: true, status: 200, json: async () => [] }
  }

  const { default: handler } = await import('./availability.js')
  const req = {
    method: 'GET',
    query: { unitId: 'manaira', colaboradorId: '1', servicoIds: 'corte,pezinho', data: '2099-09-01' },
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
  assert.deepEqual(body.slots.slice(0, 3).map((slot) => slot.time), ['08:20', '09:00', '09:40'])
  assert.equal(body.slots.some((slot) => slot.time === '09:30'), false)
  assert.equal(body.slots.find((slot) => slot.time === '13:40').available, true)
  assert.equal(body.slots.find((slot) => slot.time === '14:20').available, false)
  assert.equal(body.slots.find((slot) => slot.time === '15:00').available, false)
  assert.equal(body.slots.some((slot) => slot.time === '17:40'), false)
  assert.equal(body.slots.at(-1).time, '17:00')
  assert.equal(urls.some((url) => url.endsWith('/agendamentos/configuracao')), true)
})
