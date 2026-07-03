import { Box, Button, Grid } from '@mui/material'
import { MESSAGES } from '../../constants/messages'
import { getAvailableSlots } from '../../mocks/timeSlots'
import ReceptionistMessage from '../common/ReceptionistMessage'

export default function TimeStep({ date, selected, onSelect }) {
  const slots = getAvailableSlots(date)

  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.timePrompt} />
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
    </Box>
  )
}
