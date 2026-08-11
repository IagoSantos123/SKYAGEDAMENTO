import { Box, Grid, Stack, Typography } from '@mui/material'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import { UNITS } from '../../constants/units'
import SelectableCard from '../common/SelectableCard'
import heroImage from '../../assets/hero-dom-ferraz-v2.png'
import experienceImage from '../../assets/experiencia-dom-ferraz.jpeg'

const unitImages = [heroImage, experienceImage, heroImage]

export default function UnitStep({ selected, onSelect }) {
  return (
    <Box>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {UNITS.map((unit, index) => {
          const isSelected = selected?.id === unit.id
          return (
            <Grid size={{ xs: 12, sm: 4 }} key={unit.id}>
              <SelectableCard
                selected={isSelected}
                onClick={() => onSelect(unit)}
                sx={{
                  minHeight: { sm: 310 },
                  background: isSelected
                    ? 'linear-gradient(150deg, rgba(199,148,93,.17), rgba(143,91,53,.08))'
                    : 'linear-gradient(150deg, rgba(255,255,255,.035), rgba(255,255,255,.012))',
                }}
              >
                <Stack spacing={1.5} sx={{ height: '100%' }}>
                  <Box component="img" src={unitImages[index]} alt={`Unidade ${unit.name}`} sx={{ width: 'calc(100% + 44px)', height: 125, ml: '-22px', mt: '-22px', objectFit: 'cover', objectPosition: index === 2 ? '65% center' : 'center 48%', borderBottom: '1px solid rgba(75,41,30,.14)' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center', mt: 0.25, fontSize: '1.25rem', textTransform: 'uppercase' }}>{unit.name}</Typography>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mt: 1 }}>
                      <LocationOnRoundedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                      <Typography variant="caption">{unit.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.7} sx={{ alignItems: 'center', mt: 1 }}>
                      <CircleRoundedIcon sx={{ fontSize: 8, color: 'success.main' }} />
                      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>
                        Agendamentos disponíveis
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', justifyContent: 'center', color: '#fff8ec', background: '#4A291E', borderRadius: 1, py: 1.15, px: 1.5 }}>
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
