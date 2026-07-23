import * as yup from 'yup'
import { isValidBrazilianMobile } from '../utils/phoneValidator'

export const newClientSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Informe seu nome completo')
    .min(3, 'Digite seu nome completo')
    .matches(/^[A-Za-zÀ-ÿ]+\s+[A-Za-zÀ-ÿ\s]+$/, 'Digite nome e sobrenome'),
  phone: yup
    .string()
    .required('Informe seu telefone')
    .test('valid-mobile', 'Digite um celular válido com DDD', (value) =>
      isValidBrazilianMobile(value || '')
    ),
  email: yup
    .string()
    .trim()
    .email('Digite um e-mail válido')
    .notRequired(),
  birthDate: yup.mixed().nullable().notRequired(),
})
