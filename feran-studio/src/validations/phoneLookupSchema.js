import * as yup from 'yup'
import { isValidBrazilianMobile } from '../utils/phoneValidator'

export const phoneLookupSchema = yup.object({
  phone: yup
    .string()
    .required('Informe seu telefone')
    .test('valid-mobile', 'Digite um celular válido com DDD', (value) =>
      isValidBrazilianMobile(value || '')
    ),
})
