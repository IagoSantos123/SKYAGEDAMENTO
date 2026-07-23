import { Avatar, Box, Stack, Typography } from '@mui/material'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'

/**
 * Bolha de mensagem da "recepcionista virtual", usada no topo de cada etapa
 * para reforçar a sensação de conversa em vez de formulário.
 */
export default function ReceptionistMessage({ title, subtitle }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', mb: 4, animation: 'messageEnter .55s ease-out both' }}>
      <Avatar
        sx={{
          background: 'linear-gradient(150deg, #E6BF8A 0%, #8F5B35 100%)',
          color: '#1C100C',
          width: 40,
          height: 40,
          boxShadow: '0 6px 16px -4px rgba(143,91,53,0.55)',
          flexShrink: 0,
        }}
      >
        <ContentCutRoundedIcon fontSize="small" />
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
