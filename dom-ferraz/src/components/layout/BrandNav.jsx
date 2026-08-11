import { Box, Button, Stack } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import logo from '../../assets/logo-dom-ferraz.svg'

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
        minHeight: { xs: 84, md: 92 },
        py: 1,
        borderBottom: '1px solid rgba(75,41,30,.1)',
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Box component="img" src={logo} alt="Barbearia Dom Ferraz" sx={{ width: { xs: 84, md: 108 }, height: { xs: 62, md: 78 }, objectFit: 'contain', objectPosition: 'left center' }} />
      </Stack>

      <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Button variant="text" onClick={() => goTo('#servicos')}>Serviços</Button>
        <Button variant="text" onClick={() => goTo('#unidades')}>Unidades</Button>
        <Button variant="text" onClick={() => goTo('#galeria')}>Galeria</Button>
        <Button variant="text" onClick={() => goTo('#avaliacoes')}>Avaliações</Button>
      </Stack>

      <Button variant="contained" color="secondary" size="small" startIcon={<CalendarMonthOutlinedIcon />} onClick={() => goTo('#agendamento')}>
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Agendar agora</Box>
        <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Agendar</Box>
      </Button>
    </Stack>
  )
}
