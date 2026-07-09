import { useEffect, useState } from 'react'
import { Alert, Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'
import { getServices } from '../../services/bookingApi'
import { MESSAGES } from '../../constants/messages'
import { formatCurrency } from '../../utils/formatters'
import ReceptionistMessage from '../common/ReceptionistMessage'
import SelectableCard from '../common/SelectableCard'

export default function ServiceStep({ selected, onSelect }) {
  const [services, setServices] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let active = true
    getServices()
      .then((data) => {
        if (!active) return
        setServices(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <Box>
      <ReceptionistMessage
        title={MESSAGES.servicePraise}
        subtitle={MESSAGES.servicePrompt}
      />

      {status === 'loading' && (
        <Stack spacing={2} sx={{ alignItems: 'center', py: 5 }}>
          <CircularProgress color="secondary" />
        </Stack>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Não foi possível carregar os serviços agora. Tente novamente em instantes.
        </Alert>
      )}

      {status === 'ready' && services.length === 0 && (
        <Alert severity="info">Nenhum serviço disponível para agendamento no momento.</Alert>
      )}

      {status === 'ready' && services.length > 0 && (
        <Grid container spacing={2.5}>
          {services.map((service) => (
            <Grid size={{ xs: 12, sm: 6 }} key={service.id}>
              <SelectableCard
                selected={selected?.id === service.id}
                onClick={() => onSelect(service)}
              >
                <Stack
                  direction="row"
                  sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(173,177,184,0.1)',
                      border: '1px solid rgba(173,177,184,0.25)',
                      mb: 1.5,
                    }}
                  >
                    <ContentCutRoundedIcon sx={{ fontSize: 21, color: 'secondary.main' }} />
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', lineHeight: 1.2 }}
                    >
                      A partir de
                    </Typography>
                    <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 700 }}>
                      {formatCurrency(service.price)}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  {service.name}
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                  <ScheduleRoundedIcon sx={{ fontSize: 17, color: 'text.disabled' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {service.durationLabel}
                  </Typography>
                </Stack>
              </SelectableCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
