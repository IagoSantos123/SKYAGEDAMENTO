import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import { MESSAGES } from '../../constants/messages'
import { newClientSchema } from '../../validations/newClientSchema'
import ReceptionistMessage from '../common/ReceptionistMessage'
import PhoneMaskField from '../common/PhoneMaskField'

export default function NewClientStep({ onSubmit }) {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(newClientSchema),
    defaultValues: { name: '', phone: '', email: '', birthDate: null },
  })

  const submit = (data) => {
    onSubmit({
      name: data.name.trim(),
      phone: data.phone,
      email: data.email?.trim() || null,
      birthDate: data.birthDate,
    })
  }

  return (
    <Box>
      <ReceptionistMessage
        title={MESSAGES.newClientPraise}
        subtitle={MESSAGES.newClientPrompt}
      />
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <Stack spacing={2.5}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                autoFocus
                label="Nome completo *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <PhoneMaskField control={control} label="Telefone *" />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Email (opcional)"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Data de nascimento (opcional)"
                value={field.value}
                onChange={field.onChange}
                disableFuture
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    slotProps: {
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CakeRoundedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    },
                  },
                }}
              />
            )}
          />
          <Button type="submit" variant="contained" color="secondary" size="large" fullWidth>
            Continuar
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
