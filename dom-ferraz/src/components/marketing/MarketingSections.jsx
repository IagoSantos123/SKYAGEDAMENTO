import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import logo from '../../assets/logo-dom-ferraz.png'
import heroImage from '../../assets/hero-dom-ferraz-v2.png'
import experienceImage from '../../assets/experiencia-dom-ferraz.jpeg'

const benefits = [
  { icon: StarBorderRoundedIcon, title: 'Profissionais qualificados', text: 'Equipe treinada e sempre atualizada para entregar o melhor resultado.' },
  { icon: WeekendOutlinedIcon, title: 'Ambiente confortável', text: 'Espaço pensado para você relaxar e ter a melhor experiência.' },
  { icon: CalendarMonthOutlinedIcon, title: 'Agendamento fácil', text: 'Agende seu horário em poucos cliques de forma rápida e prática.' },
  { icon: Inventory2OutlinedIcon, title: 'Produtos profissionais', text: 'Trabalhamos com as melhores marcas do mercado.' },
  { icon: HandshakeOutlinedIcon, title: 'Atendimento de verdade', text: 'Aqui você é tratado com respeito, atenção e personalização.' },
]

const reviews = [
  ['Lucas Ferreira', 'Ambiente top, profissionais excelentes e o resultado sempre acima da expectativa. Recomendo demais!'],
  ['Rafael Andrade', 'Atendimento diferenciado e muito profissionalismo. Melhor barbearia que já conheci!'],
  ['Bruno Lima', 'Desde o atendimento até o corte, tudo impecável. Só confio na Dom Ferraz!'],
]

const gallery = [heroImage, experienceImage, heroImage, experienceImage, heroImage, experienceImage]

const SectionTitle = ({ children }) => (
  <Typography variant="h3" sx={{ textAlign: 'center', textTransform: 'uppercase', fontSize: { xs: '1.15rem', md: '1.4rem' }, mb: 3.5 }}>
    <Box component="span" sx={{ color: 'secondary.main', mr: 2 }}>—</Box>{children}<Box component="span" sx={{ color: 'secondary.main', ml: 2 }}>—</Box>
  </Typography>
)

export default function MarketingSections() {
  const scrollToBooking = () => document.querySelector('#agendamento')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Box sx={{ width: '100%' }}>
      <Box component="section" sx={{ py: { xs: 6, md: 7 }, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <SectionTitle>Por que escolher a Dom Ferraz?</SectionTitle>
        <Grid container>
          {benefits.map(({ icon: Icon, title, text }) => (
            <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={title} sx={{ '&:not(:last-of-type)': { borderRight: { md: '1px solid rgba(75,41,30,.14)' } } }}>
              <Stack sx={{ alignItems: 'center', textAlign: 'center', px: { xs: 1.5, md: 2.5 }, py: 1.5 }}>
                <Icon sx={{ fontSize: 38, color: 'secondary.main', mb: 1.25 }} />
                <Typography sx={{ maxWidth: 150, minHeight: { md: 40 }, fontWeight: 800, textTransform: 'uppercase', fontSize: '.79rem', lineHeight: 1.25 }}>{title}</Typography>
                <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.45 }}>{text}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" id="galeria" sx={{ py: { xs: 6, md: 7 }, scrollMarginTop: 40 }}>
        <SectionTitle>Nosso trabalho</SectionTitle>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: .75 }}>
          {gallery.map((image, index) => (
            <Box component="img" key={`${image}-${index}`} src={image} alt={`Trabalho Dom Ferraz ${index + 1}`} sx={{ width: '100%', height: { xs: 145, md: 142 }, objectFit: 'cover', objectPosition: index % 3 === 0 ? '65% center' : 'center', borderRadius: 1 }} />
          ))}
        </Box>
        <Stack sx={{ alignItems: 'center', mt: 1 }}><Button variant="contained" color="secondary" size="small" startIcon={<InstagramIcon />}>Ver mais no Instagram</Button></Stack>
      </Box>

      <Box component="section" id="avaliacoes" sx={{ py: { xs: 6, md: 7 }, borderTop: '1px solid', borderColor: 'divider', scrollMarginTop: 40 }}>
        <SectionTitle>Avaliações de quem confia</SectionTitle>
        <Grid container spacing={1.5}>
          {reviews.map(([name, text], index) => (
            <Grid size={{ xs: 12, md: 4 }} key={name}>
              <Stack direction="row" spacing={2} sx={{ height: '100%', p: 2.5, border: '1px solid rgba(75,41,30,.14)', borderRadius: 1 }}>
                <Avatar sx={{ bgcolor: index === 1 ? '#71503e' : '#3f2b23', color: '#fff8ec', width: 48, height: 48, fontFamily: '"Playfair Display", serif' }}>{name[0]}</Avatar>
                <Box>
                  <Typography sx={{ color: '#4A291E', letterSpacing: '.08em', fontSize: '.88rem' }}>★★★★★</Typography>
                  <Typography variant="caption" sx={{ display: 'block', my: .75, color: 'text.primary', fontStyle: 'italic', lineHeight: 1.45 }}>“{text}”</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>{name}</Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ mx: { xs: -2, sm: -3 }, px: { xs: 3, md: 8 }, py: 3, alignItems: 'center', justifyContent: 'space-between', textAlign: { xs: 'center', md: 'left' }, bgcolor: '#3b2118', color: '#fff8ec', gap: 2 }}>
        <Box><Typography variant="h3" sx={{ textTransform: 'uppercase', fontSize: { xs: '1.35rem', md: '1.75rem' } }}>Pronto para renovar seu visual?</Typography><Typography variant="body2" sx={{ color: 'rgba(255,248,236,.72)', mt: .5 }}>Escolha sua unidade e agende agora mesmo!</Typography></Box>
        <Button variant="contained" sx={{ bgcolor: '#f5e7d6', color: '#3b2118', '&:hover': { bgcolor: '#fff8ec' } }} startIcon={<CalendarMonthOutlinedIcon />} onClick={scrollToBooking}>Agendar meu horário</Button>
      </Stack>

      <Grid component="footer" container spacing={4} sx={{ py: 5, alignItems: 'flex-start' }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box component="img" src={logo} alt="Dom Ferraz" sx={{ width: 130 }} />
          <Typography variant="caption" sx={{ display: 'block', mt: 1.25, color: 'text.secondary' }}>
            CNPJ: 48.636.600/0001-77
          </Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}><Typography sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '.75rem', mb: 1.5 }}>Navegação</Typography><Typography variant="caption" sx={{ display: 'block', lineHeight: 1.8 }}>Início<br />Serviços<br />Unidades<br />Galeria<br />Avaliações</Typography></Grid>
        <Grid size={{ xs: 6, md: 3 }}><Typography sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '.75rem', mb: 1.5 }}>Contato</Typography><Stack direction="row" spacing={1}><PhoneOutlinedIcon sx={{ fontSize: 17 }} /><Typography variant="caption">(83) 9 9105-4631<br />(83) 9 9124-6737<br />@domferrazbarbershop</Typography></Stack></Grid>
        <Grid size={{ xs: 12, md: 3 }}><Typography sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '.75rem', mb: 1.5 }}>Horário de funcionamento</Typography><Typography variant="caption" sx={{ lineHeight: 1.8 }}>Segunda a Sexta: 9h às 20h<br />Sábado: 8h às 19h<br />Domingo: Fechado</Typography></Grid>
      </Grid>
    </Box>
  )
}
