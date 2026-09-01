import { useEffect, useState } from 'react'
import { Alert, Box, CircularProgress, Grid, Stack, Button } from '@mui/material'
import dayjs from 'dayjs'
import { getAvailability } from '../../services/bookingApi'
import { MESSAGES } from '../../constants/messages'
import ReceptionistMessage from '../common/ReceptionistMessage'

export default function TimeStep({ unitSlug, professionalId, serviceIds, date, selected, onSelect }) {
  const [slots, setSlots] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const serviceIdsKey = (serviceIds || []).join(',')

  useEffect(() => {
    if (!professionalId || !date) return undefined

    let active = true
    setStatus('loading')
    getAvailability({
      unidadeSlug: unitSlug,
      colaboradorId: professionalId,
      servicoIds: serviceIdsKey.split(',').filter(Boolean),
      date: dayjs(date).format('YYYY-MM-DD'),
    })
      .then((data) => {
        if (!active) return
        setSlots(data.slots || [])
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [unitSlug, professionalId, serviceIdsKey, date])

  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.timePrompt} />

      {status === 'loading' && (
        <Stack spacing={2} sx={{ alignItems: 'center', py: 5 }}>
          <CircularProgress color="secondary" />
        </Stack>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Não foi possível carregar os horários agora. Tente novamente em instantes.
        </Alert>
      )}

      {status === 'ready' && slots.length === 0 && (
        <Alert severity="info">Nenhum horário disponível para essa data.</Alert>
      )}

      {status === 'ready' && slots.length > 0 && (
        <Grid container spacing={1.5}>
          {slots.map(({ time, available }) => {
            const isSelected = selected === time
            return (
              <Grid size={{ xs: 4, sm: 3 }} key={time}>
                <Button
                  fullWidth
                  disabled={!available}
                  onClick={() => onSelect(time)}
                  variant={isSelected ? 'contained' : 'outlined'}
                  color="secondary"
                  sx={{
                    py: 1.4,
                    borderRadius: '12px',
                    fontWeight: 600,
                    ...(!isSelected &&
                      available && {
                        borderColor: 'rgba(198,161,91,0.35)',
                        color: 'text.primary',
                        '&:hover': {
                          borderColor: 'secondary.main',
                          bgcolor: 'rgba(198,161,91,0.08)',
                        },
                      }),
                  }}
                >
                  {time}
                </Button>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}
