import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fade,
  Stack,
  Typography,
} from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { MESSAGES } from '../../constants/messages'
import { phoneLookupSchema } from '../../validations/phoneLookupSchema'
import { lookupClientByPhone } from '../../services/bookingApi'
import ReceptionistMessage from '../common/ReceptionistMessage'
import PhoneMaskField from '../common/PhoneMaskField'

export default function ExistingClientStep({ onConfirm, onNotFound }) {
  const [status, setStatus] = useState('input') // input | searching | found | not_found | error
  const [foundClient, setFoundClient] = useState(null)

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(phoneLookupSchema),
    defaultValues: { phone: '' },
  })

  const onSearch = async ({ phone }) => {
    setStatus('searching')
    try {
      const client = await lookupClientByPhone(phone)
      if (client) {
        setFoundClient(client)
        setStatus('found')
      } else {
        setStatus('not_found')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Box>
      <ReceptionistMessage
        title={MESSAGES.existingClientPraise}
        subtitle={MESSAGES.existingClientPrompt}
      />

      {status === 'input' && (
        <Box component="form" onSubmit={handleSubmit(onSearch)}>
          <PhoneMaskField control={control} />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            startIcon={<SearchRoundedIcon />}
            sx={{ mt: 3 }}
          >
            Buscar meu cadastro
          </Button>
        </Box>
      )}

      {status === 'searching' && (
        <Stack spacing={2} sx={{ alignItems: 'center', py: 5 }}>
          <CircularProgress color="secondary" />
          <Typography variant="body2" color="text.secondary">
            Procurando seu cadastro...
          </Typography>
        </Stack>
      )}

      {status === 'found' && foundClient && (
        <Fade in>
          <Box>
            <Box
              sx={{
                bgcolor: 'rgba(173,177,184,0.06)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
                p: 3,
                mb: 3,
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar
                  sx={{
                    background: 'linear-gradient(150deg, #E7E9EC 0%, #7A7E85 100%)',
                    color: '#0A0A0B',
                    width: 52,
                    height: 52,
                  }}
                >
                  <PersonRoundedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{foundClient.name}</Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                    <PhoneIphoneRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {foundClient.phone}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {MESSAGES.existingClientFoundPrompt}
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => onConfirm(foundClient)}
              >
                Sim, sou eu
              </Button>
              <Button variant="outlined" color="inherit" fullWidth onClick={onNotFound}>
                Não
              </Button>
            </Stack>
          </Box>
        </Fade>
      )}

      {status === 'not_found' && (
        <Fade in>
          <Box>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start', mb: 3 }}>
              <InfoOutlinedIcon sx={{ color: 'secondary.main', fontSize: 20, mt: 0.2 }} />
              <Typography variant="body1" color="text.secondary">
                Não encontramos um cadastro com esse telefone. Sem problemas, vamos criar
                um novo em instantes.
              </Typography>
            </Stack>
            <Button variant="contained" color="secondary" fullWidth onClick={onNotFound}>
              Criar meu cadastro
            </Button>
          </Box>
        </Fade>
      )}

      {status === 'error' && (
        <Fade in>
          <Box>
            <Alert severity="error" sx={{ mb: 3 }}>
              Não foi possível buscar seu cadastro agora. Tente novamente.
            </Alert>
            <Button variant="contained" color="secondary" fullWidth onClick={() => setStatus('input')}>
              Tentar novamente
            </Button>
          </Box>
        </Fade>
      )}
    </Box>
  )
}
