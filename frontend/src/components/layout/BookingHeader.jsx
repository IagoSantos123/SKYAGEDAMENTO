import { Box, Stack, Typography } from '@mui/material'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'

export default function BookingHeader() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', mb: 5, textAlign: 'center' }}>
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(150deg, #232325 0%, #141415 100%)',
          border: '1px solid rgba(198, 161, 91, 0.35)',
          boxShadow: '0 12px 28px -10px rgba(0,0,0,0.7)',
        }}
      >
        <ContentCutRoundedIcon sx={{ color: '#C6A15B', fontSize: 26 }} />
      </Box>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: 'secondary.main', display: 'block', mb: 0.75 }}
        >
          Sky Barbearia
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.9rem', sm: '2.4rem' } }}>
          Agendamento
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ maxWidth: 420 }}>
        Escolha seu profissional e reserve seu horário em poucos minutos.
      </Typography>
    </Stack>
  )
}
