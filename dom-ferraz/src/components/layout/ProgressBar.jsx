import { Box, LinearProgress, Typography } from '@mui/material'

export default function ProgressBar({ value }) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', letterSpacing: '0.12em' }}
        >
          Seu agendamento
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main' }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 4,
          borderRadius: 10,
          bgcolor: 'rgba(255,255,255,0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 10,
            background: 'linear-gradient(90deg, #8F5B35, #E6BF8A)',
          },
        }}
      />
    </Box>
  )
}
