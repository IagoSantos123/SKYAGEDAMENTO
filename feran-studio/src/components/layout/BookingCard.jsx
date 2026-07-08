import { Box, IconButton, Paper, Stack, Tooltip } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ProgressBar from './ProgressBar'

export default function BookingCard({ progress, showProgress, canGoBack, onBack, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 720,
        borderRadius: { xs: '24px', sm: '28px' },
        p: { xs: 3, sm: 5 },
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 70px -30px rgba(0,0,0,0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(198,161,91,0.5), transparent)',
        },
      }}
    >
      {(canGoBack || showProgress) && (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: showProgress ? 3.5 : 0 }}>
          {canGoBack && (
            <Tooltip title="Voltar">
              <IconButton
                onClick={onBack}
                size="small"
                sx={{
                  bgcolor: 'grey.50',
                  flexShrink: 0,
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <ArrowBackRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {showProgress && (
            <Box sx={{ flexGrow: 1 }}>
              <ProgressBar value={progress} />
            </Box>
          )}
        </Stack>
      )}
      <Box>{children}</Box>
    </Paper>
  )
}
