import { Box, Button, Stack, Typography } from '@mui/material'
import logo from '../../assets/logo-dom-ferraz-original.jpeg'

export default function BrandNav() {
  const goTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Stack
      component="nav"
      direction="row"
      aria-label="Navegação principal"
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: { xs: 6, md: 9 },
        py: 1.25,
        borderBottom: '1px solid rgba(230,191,138,.1)',
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Box component="img" src={logo} alt="" sx={{ width: 42, height: 42, borderRadius: 2, objectFit: 'cover' }} />
        <Box>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, lineHeight: 1.05 }}>
            Dom Ferraz
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '.62rem', letterSpacing: '.16em', textTransform: 'uppercase' }}>
            Barbearia
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Button variant="text" onClick={() => goTo('#experiencia')}>Experiência</Button>
        <Button variant="text" onClick={() => goTo('#planos')}>Dom Club</Button>
        <Button variant="text" onClick={() => goTo('#unidades')}>Unidades</Button>
      </Stack>

      <Button variant="outlined" color="secondary" size="small" onClick={() => goTo('#agendamento')}>
        Agendar
      </Button>
    </Stack>
  )
}
