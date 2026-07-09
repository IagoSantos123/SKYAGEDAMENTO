import { Card, CardActionArea, Box } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

/**
 * Card grande e clicável usado nas etapas de seleção (profissional, serviço,
 * tipo de cliente, confirmação). Aplica o mesmo padrão visual de hover/seleção
 * em toda a aplicação.
 */
export default function SelectableCard({ selected, onClick, children, sx }) {
  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        borderColor: selected ? 'secondary.main' : 'divider',
        borderWidth: 1,
        bgcolor: selected ? 'rgba(173,177,184,0.06)' : 'background.paper',
        boxShadow: selected
          ? '0 16px 32px -14px rgba(173,177,184,0.35)'
          : '0 2px 10px -4px rgba(0,0,0,0.3)',
        transform: selected ? 'translateY(-2px)' : 'none',
        height: '100%',
        '&:hover': {
          borderColor: selected ? 'secondary.main' : 'rgba(255,255,255,0.2)',
        },
        ...sx,
      }}
    >
      {selected && (
        <CheckCircleRoundedIcon
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            color: 'secondary.main',
            fontSize: 22,
            zIndex: 1,
            bgcolor: 'background.paper',
            borderRadius: '50%',
          }}
        />
      )}
      <CardActionArea
        onClick={onClick}
        sx={{ height: '100%', p: 2.75 }}
      >
        <Box
          sx={{
            transition: 'transform 0.25s ease',
            '&:hover': { transform: 'translateY(-1px)' },
          }}
        >
          {children}
        </Box>
      </CardActionArea>
    </Card>
  )
}
