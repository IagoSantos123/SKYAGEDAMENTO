import { Box, Button, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import { MESSAGES } from '../../constants/messages'
import ReceptionistMessage from '../common/ReceptionistMessage'

export default function WelcomeStep({ onStart }) {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 1, sm: 2 } }}>
      <Stack sx={{ alignItems: 'flex-start', textAlign: 'left' }}>
        <ReceptionistMessage
          title={MESSAGES.welcomeGreeting}
          subtitle={`${MESSAGES.welcomeSub}`}
        />
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<ArrowForwardRoundedIcon />}
        onClick={onStart}
        sx={{ mt: 1, minWidth: 220 }}
      >
        Começar
      </Button>
      <Stack
        direction="row"
        spacing={0.75}
        sx={{ alignItems: 'center', justifyContent: 'center', mt: 2.25 }}
      >
        <ScheduleRoundedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
        <Typography variant="caption">Leva menos de 1 minuto</Typography>
      </Stack>
    </Box>
  )
}
