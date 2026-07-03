import { Box, Grid, Stack, Typography } from '@mui/material'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'
import FaceRetouchingNaturalRoundedIcon from '@mui/icons-material/FaceRetouchingNaturalRounded'
import FaceRoundedIcon from '@mui/icons-material/FaceRounded'
import BrushRoundedIcon from '@mui/icons-material/BrushRounded'
import { services } from '../../mocks/services'
import { MESSAGES } from '../../constants/messages'
import { formatCurrency } from '../../utils/formatters'
import ReceptionistMessage from '../common/ReceptionistMessage'
import SelectableCard from '../common/SelectableCard'

const SERVICE_ICONS = {
  'serv-1': ContentCutRoundedIcon,
  'serv-2': FaceRetouchingNaturalRoundedIcon,
  'serv-3': FaceRoundedIcon,
  'serv-4': BrushRoundedIcon,
}

export default function ServiceStep({ selected, onSelect }) {
  return (
    <Box>
      <ReceptionistMessage
        title={MESSAGES.servicePraise}
        subtitle={MESSAGES.servicePrompt}
      />
      <Grid container spacing={2.5}>
        {services.map((service) => {
          const ServiceIcon = SERVICE_ICONS[service.id] ?? ContentCutRoundedIcon
          return (
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
                      bgcolor: 'rgba(198,161,91,0.1)',
                      border: '1px solid rgba(198,161,91,0.25)',
                      mb: 1.5,
                    }}
                  >
                    <ServiceIcon sx={{ fontSize: 21, color: 'secondary.main' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    color="secondary.main"
                    sx={{ fontWeight: 700 }}
                  >
                    {formatCurrency(service.price)}
                  </Typography>
                </Stack>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5 }}>
                  {service.description}
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                  <ScheduleRoundedIcon sx={{ fontSize: 17, color: 'text.disabled' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {service.durationLabel}
                  </Typography>
                </Stack>
              </SelectableCard>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
