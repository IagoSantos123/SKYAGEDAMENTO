import { Avatar, Box, Stack, Typography } from '@mui/material'
import logo from '../../assets/logo-dom-ferraz.png'

/**
 * Bolha de mensagem da "recepcionista virtual", usada no topo de cada etapa
 * para reforçar a sensação de conversa em vez de formulário.
 */
export default function ReceptionistMessage({ title, subtitle }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', mb: 4, animation: 'messageEnter .55s ease-out both' }}>
      <Avatar
        sx={{
          background: '#F7EAD3',
          width: 48,
          height: 48,
          p: .35,
          border: '1px solid rgba(75,41,30,.16)',
          boxShadow: '0 7px 18px -8px rgba(75,41,30,.45)',
          flexShrink: 0,
        }}
      >
        <Box component="img" src={logo} alt="Dom Ferraz" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Avatar>
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.03)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '4px 18px 18px 18px',
          px: 2.75,
          py: 2,
          maxWidth: 560,
          boxShadow: '0 16px 35px -28px rgba(0,0,0,.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h5" sx={{ mb: subtitle ? 0.5 : 0 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}
