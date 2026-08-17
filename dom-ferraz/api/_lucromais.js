// Camada de acesso ao backend do LucroMais, usada apenas pelas funções
// serverless em /api. Mantém o login (email/senha) e o token JWT só no
// servidor — nunca chegam ao navegador do visitante da landing page.

const BASE_URL =
  process.env.LUCROMAIS_BASE_URL ||
  'https://lucromais-backend-mssolucoes.vercel.app/api'

const UNIT_ENV_PREFIX = {
  manaira: 'MANAIRA',
  miramar: 'MIRAMAR',
  sape: 'SAPE',
}

const tokenCache = new Map()

export function getUnitId(req) {
  const unitId = req.method === 'POST' ? req.body?.unitId : req.query?.unitId
  if (!UNIT_ENV_PREFIX[unitId]) return null
  return unitId
}

function decodeJwtExpiry(token) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString('utf8')
    )
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null
  } catch {
    return null
  }
}

async function login(unitId) {
  const prefix = UNIT_ENV_PREFIX[unitId]
  const email = process.env[`LUCROMAIS_${prefix}_EMAIL`]
  const senha = process.env[`LUCROMAIS_${prefix}_SENHA`]

  if (!email || !senha) {
    throw new Error(
      `Credenciais do LucroMais não configuradas para a unidade ${unitId}.`
    )
  }

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })

  if (!response.ok) {
    throw new Error(`Falha ao autenticar no LucroMais (status ${response.status})`)
  }

  const data = await response.json()
  if (!data?.token) {
    throw new Error('Resposta de login do LucroMais sem token.')
  }

  const exp = decodeJwtExpiry(data.token)
  tokenCache.set(unitId, {
    token: data.token,
    expiresAt: exp ? exp - 60_000 : Date.now() + 30 * 60_000,
  })

  return data.token
}

async function getToken(unitId, { forceRefresh = false } = {}) {
  const cached = tokenCache.get(unitId)
  if (!forceRefresh && cached?.token && Date.now() < cached.expiresAt) {
    return cached.token
  }
  return login(unitId)
}

/**
 * Chama a API do LucroMais autenticada, renovando o token automaticamente
 * se a primeira tentativa voltar 401.
 */
export async function lucroMaisFetch(unitId, path, options = {}) {
  if (!UNIT_ENV_PREFIX[unitId]) throw new Error('Unidade inválida.')
  const token = await getToken(unitId)

  const doFetch = (bearerToken) =>
    fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${bearerToken}`,
      },
    })

  let response = await doFetch(token)

  if (response.status === 401) {
    const freshToken = await getToken(unitId, { forceRefresh: true })
    response = await doFetch(freshToken)
  }

  return response
}

export function sendJson(res, status, body) {
  res.status(status).json(body)
}
