import { Box, Grid, Stack, Typography } from '@mui/material'
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined'
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'

const services = [
  { icon: ContentCutOutlinedIcon, title: 'Corte', text: 'Cortes modernos e clássicos com acabamento impecável.' },
  { icon: FaceRetouchingNaturalOutlinedIcon, title: 'Barba', text: 'Desenho, alinhamento e cuidados para uma barba perfeita.' },
  { icon: AutoFixHighOutlinedIcon, title: 'Corte + barba', text: 'O combo perfeito para um visual alinhado e marcante.' },
  { icon: SpaOutlinedIcon, title: 'Acabamentos', text: 'Detalhes que fazem toda a diferença no seu visual.' },
  { icon: Inventory2OutlinedIcon, title: 'Produtos', text: 'Linha completa de produtos profissionais para seu estilo.' },
]

export default function ServicesStrip() {
  return (
    <Box component="section" id="servicos" sx={{ width: '100%', py: { xs: 6, md: 7 }, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', textTransform: 'uppercase', fontSize: { xs: '1.35rem', md: '1.55rem' }, mb: 4.5 }}>
        <Box component="span" sx={{ color: 'secondary.main', mr: 2 }}>—</Box>Nossos serviços<Box component="span" sx={{ color: 'secondary.main', ml: 2 }}>—</Box>
      </Typography>
      <Grid container>
        {services.map(({ icon: Icon, title, text }) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={title} sx={{ '&:not(:last-of-type)': { borderRight: { md: '1px solid rgba(75,41,30,.14)' } } }}>
            <Stack sx={{ alignItems: 'center', textAlign: 'center', px: { xs: 1.5, md: 3 }, py: 1.5, height: '100%' }}>
              <Icon sx={{ fontSize: 38, color: 'secondary.main', mb: 1.5, strokeWidth: 1 }} />
              <Typography sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '.82rem' }}>{title}</Typography>
              <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.5, maxWidth: 170 }}>{text}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
