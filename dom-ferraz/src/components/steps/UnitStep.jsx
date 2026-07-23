import { Box, Grid, Stack, Typography } from '@mui/material'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import { UNITS } from '../../constants/units'
import SelectableCard from '../common/SelectableCard'
import ReceptionistMessage from '../common/ReceptionistMessage'

export default function UnitStep({ selected, onSelect }) {
  return (
    <Box>
      <ReceptionistMessage
        title="Olá! Em qual unidade você gostaria de agendar?"
        subtitle="Escolha a unidade para ver os barbeiros disponíveis."
      />

      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {UNITS.map((unit) => {
          const isSelected = selected?.id === unit.id
          return (
            <Grid size={{ xs: 12, sm: 4 }} key={unit.id}>
              <SelectableCard
                selected={isSelected}
                onClick={() => onSelect(unit)}
                sx={{
                  minHeight: { sm: 270 },
                  background: isSelected
                    ? 'linear-gradient(150deg, rgba(199,148,93,.17), rgba(143,91,53,.08))'
                    : 'linear-gradient(150deg, rgba(255,255,255,.035), rgba(255,255,255,.012))',
                }}
              >
                <Stack spacing={2.25} sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3.5,
                      display: 'grid',
                      placeItems: 'center',
                      color: 'secondary.light',
                      background: 'linear-gradient(145deg, rgba(199,148,93,.2), rgba(143,91,53,.08))',
                      border: '1px solid rgba(199,148,93,.28)',
                    }}
                  >
                    <StorefrontRoundedIcon />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '.14em' }}>
                      Barbearia Dom Ferraz
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.25, fontSize: '1.45rem' }}>{unit.name}</Typography>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mt: 1 }}>
                      <LocationOnRoundedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                      <Typography variant="caption">{unit.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.7} sx={{ alignItems: 'center', mt: 1.5 }}>
                      <StorefrontRoundedIcon sx={{ fontSize: 17, color: 'secondary.light' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {unit.professionals.length}
                      </Typography>
                      <Typography variant="caption">profissionais nesta unidade</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.7} sx={{ alignItems: 'center', mt: 1 }}>
                      <CircleRoundedIcon sx={{ fontSize: 8, color: 'success.main' }} />
                      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>
                        Agendamentos disponíveis
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', justifyContent: 'center', color: '#1C100C', background: 'linear-gradient(135deg, #E6BF8A, #C7945D)', borderRadius: 2.5, py: 1.15, px: 1.5, boxShadow: '0 10px 24px -14px rgba(230,191,138,.8)' }}>
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>
                      Escolher unidade
                    </Typography>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
                  </Stack>
                </Stack>
              </SelectableCard>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
