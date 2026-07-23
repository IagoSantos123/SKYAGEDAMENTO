import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import experienciaImage from '../../assets/experiencia-dom-ferraz.jpeg'
import planosImage from '../../assets/planos-dom-ferraz.jpeg'

const plans = [
  {
    name: 'Dom Club Cut',
    price: '99,90',
    description: 'Cortes ilimitados durante o mês.',
  },
  {
    name: 'Dom Club Premium',
    price: '179,90',
    description: 'Cortes e barbas ilimitados durante o mês.',
    featured: true,
  },
]

const locations = [
  {
    name: 'Sapé',
    address: 'Coronel Antônio Uchoa, 150 · Salas 06 e 07',
    city: 'Centro · Sapé/PB · 58340-000',
  },
  {
    name: 'Miramar',
    address: 'Av. Presidente Epitácio Pessoa, 3663',
    city: 'Miramar · João Pessoa/PB · 58032-000',
    phone: '(83) 9 9105-4631',
  },
  {
    name: 'Manaíra',
    address: 'Av. Gov. Flávio Ribeiro Coutinho, 213',
    city: 'Manaíra · João Pessoa/PB · 58037-000',
    phone: '(83) 9 9124-6737',
  },
]

export default function MarketingSections() {
  const scrollToBooking = () => {
    document.querySelector('#agendamento')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Stack spacing={{ xs: 8, md: 12 }} sx={{ width: '100%', mt: { xs: 9, md: 14 } }}>
      <Box
        component="section"
        id="experiencia"
        sx={{
          minHeight: { xs: 500, md: 560 },
          borderRadius: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          p: { xs: 3, sm: 5, md: 7 },
          backgroundImage: `linear-gradient(180deg, rgba(12,7,5,.05) 20%, rgba(12,7,5,.94) 92%), url(${experienciaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 48%',
          border: '1px solid rgba(230,191,138,.18)',
          boxShadow: '0 38px 100px -50px rgba(0,0,0,.95)',
        }}
      >
        <Box sx={{ maxWidth: 560, position: 'relative' }}>
          <Chip label="Experiência Dom Ferraz" sx={{ mb: 2.5 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' }, lineHeight: 1.05 }}>
            O tratamento que você merece.
          </Typography>
          <Typography sx={{ mt: 2, color: 'rgba(255,248,236,.76)', maxWidth: 470, lineHeight: 1.7 }}>
            Técnica, cuidado e atenção aos detalhes em uma experiência criada para valorizar seu estilo.
          </Typography>
          <Button variant="contained" color="secondary" onClick={scrollToBooking} endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 3.5 }}>
            Agendar meu horário
          </Button>
        </Box>
      </Box>

      <Box component="section" id="planos" sx={{ scrollMarginTop: 24 }}>
        <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" color="secondary.light">Dom Club</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.15rem', md: '3.25rem' }, mt: 1 }}>
            Seu visual alinhado o mês inteiro
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 520 }}>
            Planos ilimitados disponíveis nas unidades Miramar e Manaíra.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src={planosImage}
              alt="Planos Dom Club da Barbearia Dom Ferraz"
              sx={{
                width: '100%',
                height: { xs: 440, md: '100%' },
                minHeight: { md: 520 },
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 5,
                border: '1px solid rgba(230,191,138,.16)',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5} sx={{ height: '100%' }}>
              {plans.map((plan) => (
                <Box
                  key={plan.name}
                  sx={{
                    flex: 1,
                    p: { xs: 3, sm: 4 },
                    borderRadius: 5,
                    border: plan.featured ? '1px solid rgba(230,191,138,.48)' : '1px solid rgba(230,191,138,.15)',
                    background: plan.featured
                      ? 'linear-gradient(145deg, rgba(143,91,53,.34), rgba(35,21,16,.95))'
                      : 'linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.015))',
                    boxShadow: plan.featured ? '0 30px 65px -42px rgba(199,148,93,.65)' : 'none',
                  }}
                >
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <WorkspacePremiumRoundedIcon color="secondary" />
                        <Typography variant="h4">{plan.name}</Typography>
                      </Stack>
                      <Typography color="text.secondary" sx={{ mt: 1.5 }}>{plan.description}</Typography>
                    </Box>
                    {plan.featured && <Chip label="Mais completo" color="secondary" />}
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'baseline', mt: 3 }}>
                    <Typography sx={{ fontWeight: 700, color: 'secondary.light', mr: 1 }}>R$</Typography>
                    <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '3rem', sm: '4rem' }, lineHeight: 1, color: 'secondary.light', fontWeight: 700 }}>
                      {plan.price}
                    </Typography>
                    <Typography color="text.secondary">/mês</Typography>
                  </Stack>
                  <Button variant={plan.featured ? 'contained' : 'outlined'} color="secondary" onClick={scrollToBooking} endIcon={<ContentCutRoundedIcon />} sx={{ mt: 3 }}>
                    Quero conhecer
                  </Button>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" id="unidades" sx={{ pb: { xs: 5, md: 8 }, scrollMarginTop: 24 }}>
        <Typography variant="overline" color="secondary.light">Onde estamos</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.15rem', md: '3.1rem' }, mt: 1, mb: 4 }}>
          Encontre a Dom Ferraz mais perto
        </Typography>
        <Grid container spacing={2}>
          {locations.map((location) => (
            <Grid size={{ xs: 12, md: 4 }} key={location.name}>
              <Box sx={{ height: '100%', p: 3, borderRadius: 4, border: '1px solid rgba(230,191,138,.14)', background: 'rgba(255,255,255,.025)' }}>
                <Box sx={{ width: 44, height: 44, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: 'rgba(199,148,93,.12)', color: 'secondary.light', mb: 2.5 }}>
                  <LocationOnRoundedIcon />
                </Box>
                <Typography variant="h4">{location.name}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.6 }}>{location.address}</Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>{location.city}</Typography>
                {location.phone && (
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 2.5, color: 'secondary.light' }}>
                    <PhoneRoundedIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontWeight: 700 }}>{location.phone}</Typography>
                  </Stack>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}
