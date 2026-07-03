import { Avatar, Box, Divider, Grid, Stack, Typography } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { professionals } from '../../mocks/professionals'
import { MESSAGES } from '../../constants/messages'
import ReceptionistMessage from '../common/ReceptionistMessage'
import SelectableCard from '../common/SelectableCard'

export default function ProfessionalStep({ selected, onSelect }) {
  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.professionalPrompt} />
      <Grid container spacing={2.5}>
        {professionals.map((professional) => {
          const isSelected = selected?.id === professional.id
          return (
            <Grid size={{ xs: 12, sm: 6 }} key={professional.id}>
              <SelectableCard
                selected={isSelected}
                onClick={() => onSelect(professional)}
              >
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar
                    src={professional.avatar}
                    alt={professional.name}
                    sx={{
                      width: 68,
                      height: 68,
                      border: '2px solid rgba(198,161,91,0.35)',
                    }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="h6" noWrap>
                      {professional.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary.main"
                      sx={{ fontWeight: 600, mt: 0.25 }}
                      noWrap
                    >
                      {professional.specialty}
                    </Typography>
                    <Stack direction="row" spacing={0.3} sx={{ mt: 0.5 }}>
                      {Array.from({ length: professional.rating }).map((_, i) => (
                        <StarRoundedIcon key={i} sx={{ fontSize: 15, color: 'secondary.main' }} />
                      ))}
                    </Stack>
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.75, minHeight: 40 }}>
                  {professional.description}
                </Typography>

                <Divider sx={{ my: 1.75 }} />

                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
                  <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
                    <ScheduleRoundedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {professional.avgDuration}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
                    <WorkspacePremiumRoundedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {professional.appointmentsCount} atendimentos
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.4}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    mt: 1.25,
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
    </Box>
  )
}
