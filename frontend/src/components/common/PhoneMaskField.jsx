import InputMask from 'react-input-mask'
import { InputAdornment, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'

/**
 * Campo de telefone com máscara brasileira, integrado ao React Hook Form.
 *
 * Nota: não usar `autoFocus` aqui — combinado ao ref legado do react-input-mask,
 * o autofoco do MUI entra em conflito com a máscara e a digitação para de
 * atualizar o valor do campo.
 */
export default function PhoneMaskField({ control, name = 'phone', label = 'Telefone' }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputMask
          mask="(99) 99999-9999"
          value={field.value || ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              fullWidth
              label={label}
              placeholder="(83) 99999-9999"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneRoundedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        </InputMask>
      )}
    />
  )
}
