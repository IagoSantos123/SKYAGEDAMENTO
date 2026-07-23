import { Box, Chip, Stack, Typography } from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import logoDomFerraz from '../../assets/logo-dom-ferraz-original.jpeg'

export default function BookingHeader() {
  return (
    <Stack spacing={0} sx={{ alignItems: 'center', mb: { xs: 5, sm: 7 }, textAlign: 'center', animation: 'heroEnter .8s cubic-bezier(.2,.8,.2,1) both' }}>
      <Box
        sx={{
          width: { xs: 184, sm: 220 },
          aspectRatio: '1 / 1',
          borderRadius: { xs: '28px', sm: '34px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#F7EAD3',
          border: '1px solid rgba(230,191,138,.5)',
          boxShadow: '0 32px 90px -26px rgba(199,148,93,.72), 0 0 0 8px rgba(247,234,211,.045)',
          transform: 'rotate(-1deg)',
          mb: { xs: 4, sm: 5 },
          animation: 'sealEnter .9s cubic-bezier(.2,.8,.2,1) both',
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={logoDomFerraz}
          alt="Barbearia Dom Ferraz"
          sx={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
        />
      </Box>
      <Box sx={{ maxWidth: 680 }}>
        <Typography
          variant="overline"
          sx={{ color: 'secondary.light', display: 'block', mb: 2, letterSpacing: '.24em' }}
        >
          Tradição desde 2016
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.4rem', sm: '3.65rem' },
            lineHeight: 1.02,
            letterSpacing: '-.045em',
            textWrap: 'balance',
            textTransform: 'none',
          }}
        >
          Seu melhor estilo começa aqui
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ maxWidth: 540, lineHeight: 1.7, mt: 2.5, color: 'rgba(255,248,236,.82)', fontSize: { xs: '1rem', sm: '1.12rem' } }}>
        Escolha sua unidade e reserve seu momento de cuidado em poucos passos.
      </Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1.25, mt: 3.5 }}>
        <Chip icon={<BoltRoundedIcon />} label="Menos de 1 minuto" variant="outlined" />
        <Chip icon={<AutoAwesomeRoundedIcon />} label="Atendimento premium" variant="outlined" />
        <Chip icon={<CheckCircleOutlineRoundedIcon />} label="Confirmação automática" variant="outlined" />
      </Stack>
    </Stack>
  )
}
