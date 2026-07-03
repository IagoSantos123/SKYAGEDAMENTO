import { Box, Button, Dialog, Fade, Stack, Typography } from '@mui/material'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import { MESSAGES } from '../../constants/messages'

export default function SuccessDialog({ open, onNewBooking }) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      slots={{ transition: Fade }}
      slotProps={{
        transition: { timeout: 400 },
        paper: { sx: { p: 1 } },
      }}
    >
      <Stack spacing={2.5} sx={{ alignItems: 'center', p: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(150deg, #D9BC85 0%, #A3813F 100%)',
            boxShadow: '0 14px 32px -10px rgba(198,161,91,0.5)',
          }}
        >
          <EventAvailableRoundedIcon sx={{ fontSize: 44, color: '#161104' }} />
        </Box>
        <Typography variant="h4">{MESSAGES.successTitle}</Typography>
        <Typography variant="body1" color="text.secondary">
          {MESSAGES.successSub}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={onNewBooking}
          sx={{ mt: 1 }}
        >
          Novo Agendamento
        </Button>
      </Stack>
    </Dialog>
  )
}
