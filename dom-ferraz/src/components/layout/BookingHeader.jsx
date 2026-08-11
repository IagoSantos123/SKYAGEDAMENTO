import { Box, Button, Stack, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import experienciaImage from '../../assets/hero-dom-ferraz-v2.png'

export default function BookingHeader() {
  return (
    <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '40% 60%' }, minHeight: { xs: 660, md: 500 }, bgcolor: '#efe2d2', overflow: 'hidden', animation: 'heroEnter .8s cubic-bezier(.2,.8,.2,1) both' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'flex-start',
          px: { xs: 3.5, sm: 7, md: 5 }, py: { xs: 6, md: 7 },
          position: 'relative', zIndex: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'secondary.main', display: 'block', mb: 2.5, letterSpacing: '.22em' }}
        >
          Barbearia desde 2016
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.75rem', sm: '3.8rem', md: '3.65rem' },
            lineHeight: .98,
            letterSpacing: '-.045em',
            textWrap: 'balance',
            textTransform: 'none',
            color: '#351f17',
          }}
        >
          Seu estilo.<br />Nosso padrão.
        </Typography>
        <Box sx={{ width: 38, height: 2, bgcolor: 'secondary.main', my: 3 }} />
        <Typography sx={{ maxWidth: 390, lineHeight: 1.75, color: '#6f5b50', fontSize: { xs: '.98rem', sm: '1.05rem' } }}>
          Corte, barba e uma experiência completa para quem valoriza qualidade, atenção e confiança.
        </Typography>
        <Button variant="contained" color="secondary" size="large" startIcon={<CalendarMonthOutlinedIcon />} onClick={() => document.querySelector('#agendamento')?.scrollIntoView({ behavior: 'smooth' })} sx={{ mt: 4 }}>
          Agendar agora
        </Button>
      </Box>
      <Box sx={{ position: 'relative', minHeight: { xs: 340, md: 'auto' }, overflow: 'hidden' }}>
        <Box component="img" src={experienciaImage} alt="Cliente durante atendimento na Barbearia Dom Ferraz" sx={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover', objectPosition: '57% center' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: { xs: 'linear-gradient(180deg, rgba(239,226,210,.15), transparent 30%)', md: 'linear-gradient(90deg, rgba(239,226,210,.28), transparent 22%)' } }} />
        <Stack sx={{ position: 'absolute', right: 22, bottom: 22, bgcolor: 'rgba(35,21,16,.86)', color: '#fff8ec', px: 2.25, py: 1.5, backdropFilter: 'blur(10px)' }}>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>Atendimento premium</Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,248,236,.7)' }}>em três unidades</Typography>
        </Stack>
      </Box>
    </Box>
  )
}
