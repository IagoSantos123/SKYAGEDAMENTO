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
        maxWidth: 960,
        borderRadius: { xs: '8px', sm: '12px' },
        p: { xs: 2.5, sm: 4.5, md: 5 },
        boxShadow:
          '0 24px 70px -38px rgba(75,41,30,.38)',
        border: '1px solid rgba(75,41,30,.13)',
        background: '#FFF9F0',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, rgba(75,41,30,.45), transparent)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% -30%, rgba(75,41,30,.045), transparent 38%)',
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
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Paper>
  )
}
