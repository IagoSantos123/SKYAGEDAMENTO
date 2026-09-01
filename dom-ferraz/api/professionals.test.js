/* global process, Buffer, global */
import test from 'node:test'
import assert from 'node:assert/strict'

process.env.LUCROMAIS_SAPE_EMAIL = 'teste@exemplo.com'
process.env.LUCROMAIS_SAPE_SENHA = 'segredo'

const jwtPayload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url')
const token = `header.${jwtPayload}.signature`

test('bloqueio parcial mantém o profissional e repassa sua foto para a landing', async () => {
  global.fetch = async (url) => {
    const requestUrl = String(url)
    if (requestUrl.endsWith('/auth/login')) {
      return { ok: true, status: 200, json: async () => ({ token }) }
    }
    if (requestUrl.endsWith('/agendamentos/colaboradores')) {
      return {
        ok: true,
        status: 200,
        json: async () => [
          {
            id: '1',
            usuarioNome: 'Profissional parcial',
            cor: '#123456',
            ordem: 1,
            avatarUrl: 'https://res.cloudinary.com/exemplo/avatar.jpg',
            avatarPosition: '45% 30%',
          },
          { id: '2', usuarioNome: 'Profissional dia inteiro', ordem: 2 },
        ],
      }
    }
    if (requestUrl.includes('/agendamentos/bloqueios')) {
      return {
        ok: true,
        status: 200,
        json: async () => [
          { colaboradorId: '1', diaInteiro: false, horaInicio: '15:00', horaFim: '19:00' },
          { colaboradorId: '2', diaInteiro: true, horaInicio: null, horaFim: null },
        ],
      }
    }
    return { ok: false, status: 404, json: async () => ({}) }
  }

  const { default: handler } = await import('./professionals.js')
  const req = { method: 'GET', query: { unitId: 'sape', date: '2099-09-01' } }
  let statusCode = 0
  let body = null
  const res = {
    setHeader() {},
    status(value) { statusCode = value; return this },
    json(value) { body = value; return value },
  }

  await handler(req, res)

  assert.equal(statusCode, 200)
  assert.equal(body.length, 1)
  assert.equal(body[0].name, 'Profissional parcial')
  assert.equal(body[0].avatarUrl, 'https://res.cloudinary.com/exemplo/avatar.jpg')
  assert.equal(body[0].avatarPosition, '45% 30%')
})
