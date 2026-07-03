// -----------------------------------------------------------------------------
// groqService.js
// -----------------------------------------------------------------------------
// Camada de serviço PLACEHOLDER para futura integração com a API da Groq.
//
// Objetivo futuro: permitir que uma IA gere mensagens humanizadas para a
// "recepcionista virtual" e responda dúvidas do usuário durante o
// agendamento, sem alterar o fluxo principal (que continuará funcionando
// 100% com dados mockados caso a IA esteja indisponível).
//
// Nenhuma chamada real é feita neste momento. A chave de API NUNCA deve ser
// exposta no código-fonte: ela deve vir de uma variável de ambiente do Vite
// (VITE_GROQ_API_KEY), configurada em um arquivo .env local (não versionado).
// -----------------------------------------------------------------------------

import axios from 'axios'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const groqClient = axios.create({
  baseURL: GROQ_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${GROQ_API_KEY}`,
  },
})

/**
 * Gera uma mensagem humanizada para a etapa atual do agendamento.
 *
 * Uso futuro (não implementado):
 *   const message = await generateReceptionistMessage({
 *     step: 'PROFESSIONAL_SELECTED',
 *     context: { professionalName: 'Ana Paula' },
 *   })
 *
 * @param {{ step: string, context?: Record<string, unknown> }} params
 * @returns {Promise<string>} mensagem gerada pela IA
 */
export async function generateReceptionistMessage(params) {
  if (!GROQ_API_KEY) {
    console.warn(
      '[groqService] VITE_GROQ_API_KEY não configurada. Retornando mensagem padrão.'
    )
    return null
  }

  // TODO: implementar chamada real quando a integração for habilitada.
  // const { data } = await groqClient.post('', {
  //   model: 'llama-3.3-70b-versatile',
  //   messages: [
  //     { role: 'system', content: 'Você é uma recepcionista virtual educada e simpática de uma barbearia/salão.' },
  //     { role: 'user', content: JSON.stringify(params) },
  //   ],
  // })
  // return data.choices?.[0]?.message?.content ?? null

  return null
}

/**
 * Responde a uma dúvida livre do usuário durante o fluxo de agendamento.
 * Placeholder para uso futuro com um chat de suporte contextual.
 *
 * @param {string} question
 * @returns {Promise<string|null>}
 */
export async function askReceptionist(question) {
  if (!GROQ_API_KEY) {
    console.warn('[groqService] Integração com IA ainda não configurada.')
    return null
  }

  // TODO: implementar futuramente.
  return null
}

export default groqClient
