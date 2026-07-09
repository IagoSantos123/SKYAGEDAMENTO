import { Box, Stack, Typography } from '@mui/material'
import logoFeran from '../../assets/logo-feran.jpeg'

export default function BookingHeader() {
  return (
    <Stack spacing={2.5} sx={{ alignItems: 'center', mb: 5, textAlign: 'center' }}>
      <Box
        sx={{
          width: 132,
          height: 132,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#000000',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 16px 36px -14px rgba(0,0,0,0.8)',
        }}
      >
        <Box
          component="img"
          src={logoFeran}
          alt="Feran Studio"
          sx={{ width: '80%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: 'secondary.main', display: 'block', mb: 0.75 }}
        >
          Agendamento Online
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.65rem', sm: '2.05rem' } }}>
          Reserve seu horário
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ maxWidth: 420 }}>
        Escolha seu profissional e reserve seu horário em poucos minutos.
      </Typography>
    </Stack>
  )
}
