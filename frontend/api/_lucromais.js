// Camada de acesso ao backend do LucroMais, usada apenas pelas funções
// serverless em /api. Mantém o login (email/senha) e o token JWT só no
// servidor — nunca chegam ao navegador do visitante da landing page.

const BASE_URL =
  process.env.LUCROMAIS_BASE_URL || 'https://lucro-mais-backend.vercel.app/api'

let cachedToken = null
let cachedTokenExpiresAt = 0

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

async function login() {
  const email = process.env.LUCROMAIS_EMAIL
  const senha = process.env.LUCROMAIS_SENHA

  if (!email || !senha) {
    throw new Error(
      'LUCROMAIS_EMAIL/LUCROMAIS_SENHA não configuradas nas variáveis de ambiente do servidor.'
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

  cachedToken = data.token
  const exp = decodeJwtExpiry(data.token)
  // Renova um pouco antes do vencimento real; se não der pra decodificar, usa 30min.
  cachedTokenExpiresAt = exp ? exp - 60_000 : Date.now() + 30 * 60_000

  return cachedToken
}

async function getToken({ forceRefresh = false } = {}) {
  if (!forceRefresh && cachedToken && Date.now() < cachedTokenExpiresAt) {
    return cachedToken
  }
  return login()
}

/**
 * Chama a API do LucroMais autenticada, renovando o token automaticamente
 * se a primeira tentativa voltar 401.
 */
export async function lucroMaisFetch(path, options = {}) {
  const token = await getToken()

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
    const freshToken = await getToken({ forceRefresh: true })
    response = await doFetch(freshToken)
  }

  return response
}

export function sendJson(res, status, body) {
  res.status(status).json(body)
}
