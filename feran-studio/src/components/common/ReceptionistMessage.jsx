import { Avatar, Box, Stack, Typography } from '@mui/material'
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded'

/**
 * Bolha de mensagem da "recepcionista virtual", usada no topo de cada etapa
 * para reforçar a sensação de conversa em vez de formulário.
 */
export default function ReceptionistMessage({ title, subtitle }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', mb: 3.5 }}>
      <Avatar
        sx={{
          background: 'linear-gradient(150deg, #E7E9EC 0%, #7A7E85 100%)',
          color: '#0A0A0B',
          width: 40,
          height: 40,
          boxShadow: '0 6px 16px -4px rgba(173,177,184,0.5)',
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
