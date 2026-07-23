import { useEffect, useState } from 'react'
import { Alert, Avatar, Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { getProfessionals } from '../../services/bookingApi'
import ReceptionistMessage from '../common/ReceptionistMessage'
import SelectableCard from '../common/SelectableCard'
import { belongsToUnit } from '../../constants/units'

function initials(name) {
  return (name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export default function ProfessionalStep({ selected, unit, onSelect }) {
  const [professionals, setProfessionals] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let active = true
    getProfessionals()
      .then((data) => {
        if (!active) return
        setProfessionals(data.filter((professional) => belongsToUnit(professional.name, unit)))
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [unit])

  return (
    <Box>
      <ReceptionistMessage
        title={`Com quem você deseja agendar na unidade ${unit?.name}?`}
        subtitle="Mostramos somente os profissionais desta unidade."
      />

      {status === 'loading' && (
        <Stack spacing={2} sx={{ alignItems: 'center', py: 5 }}>
          <CircularProgress color="secondary" />
        </Stack>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Não foi possível carregar os profissionais agora. Tente novamente em instantes.
        </Alert>
      )}

      {status === 'ready' && professionals.length === 0 && (
        <Alert severity="info">
          Ainda não há profissionais da unidade {unit?.name} cadastrados para agendamento no sistema.
        </Alert>
      )}

      {status === 'ready' && professionals.length > 0 && (
        <Grid container spacing={2.5}>
          {professionals.map((professional) => {
            const isSelected = selected?.id === professional.id
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={professional.id}>
                <SelectableCard selected={isSelected} onClick={() => onSelect(professional)}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: professional.color,
                        color: '#0A0A0B',
                        fontWeight: 700,
                        border: '2px solid rgba(173,177,184,0.35)',
                      }}
                    >
                      {initials(professional.name)}
                    </Avatar>
                    <Typography variant="h6" noWrap>
                      {professional.name}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={0.4}
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      mt: 2,
                      color: isSelected ? 'secondary.main' : 'text.disabled',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      {isSelected ? 'Selecionado' : 'Selecionar'}
                    </Typography>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
                  </Stack>
                </SelectableCard>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}
