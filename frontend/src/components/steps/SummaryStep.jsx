import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import { MESSAGES } from '../../constants/messages'
import { formatCurrency, formatDateLong } from '../../utils/formatters'
import ReceptionistMessage from '../common/ReceptionistMessage'

function SummaryRow({ icon, label, value }) {
  if (!value) return null
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ color: 'secondary.main', mt: 0.3 }}>{icon}</Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }} noWrap title={value}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  )
}

export default function SummaryStep({ bookingData, onConfirm, submitting, error }) {
  const { unit, professional, services = [], date, time, notes, client } = bookingData
  const serviceNames = services.map((service) => service.name).join(' + ')
  const totalPrice = services.reduce((total, service) => total + Number(service.price || 0), 0)
  const totalDuration = services.reduce((total, service) => total + Number(service.duration || 30), 0)
  const priceSummary = services.some((service) => service.priceLabel)
    ? services.map((service) => service.priceLabel || formatCurrency(service.price || 0)).join(' + ')
    : formatCurrency(totalPrice)

  return (
    <Box>
      <ReceptionistMessage title={MESSAGES.summaryPrompt} />

      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          p: 3,
          background: 'linear-gradient(160deg, #232325 0%, #141415 100%)',
          border: '1px solid rgba(198,161,91,0.25)',
          color: '#fff',
          mb: 3,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(198,161,91,0.6), transparent)',
          },
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.5 }}>
          <Avatar
            src={professional?.avatarUrl || undefined}
            alt={professional?.name ? `Foto de ${professional.name}` : 'Profissional'}
            imgProps={{
              style: {
                objectFit: 'cover',
                objectPosition: professional?.avatarPosition || '50% 50%',
              },
            }}
            sx={{
              width: 56,
              height: 56,
              bgcolor: professional?.color,
              color: '#161104',
              fontWeight: 700,
              border: '2px solid rgba(198,161,91,0.4)',
            }}
          >
            {!professional?.avatarUrl && professional?.name?.[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              {professional?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              {serviceNames} · {priceSummary} · {totalDuration} min
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ borderColor: 'rgba(198,161,91,0.2)', mb: 2.5 }} />
        <Grid container spacing={2.5}>
          <SummaryRow
            icon={<StorefrontRoundedIcon fontSize="small" />}
            label="Unidade"
            value={unit?.name}
          />
          <SummaryRow
            icon={<EventRoundedIcon fontSize="small" />}
            label="Data"
            value={formatDateLong(date)}
          />
          <SummaryRow
            icon={<AccessTimeRoundedIcon fontSize="small" />}
            label="Horário"
            value={time}
          />
          <SummaryRow
            icon={<PersonRoundedIcon fontSize="small" />}
            label="Nome"
            value={client?.name}
          />
          <SummaryRow
            icon={<PhoneIphoneRoundedIcon fontSize="small" />}
            label="Telefone"
            value={client?.phone}
          />
          {notes && (
            <Grid size={12}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ color: 'secondary.main', mt: 0.3 }}>
                  <ChatBubbleOutlineRoundedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
                    Observação
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                    {notes}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        disabled={submitting}
        startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <ContentCutRoundedIcon />}
        onClick={onConfirm}
      >
        {submitting ? 'Confirmando...' : 'Confirmar Agendamento'}
      </Button>
    </Box>
  )
}
