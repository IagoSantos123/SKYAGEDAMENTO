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
        borderColor: selected ? 'secondary.main' : 'rgba(230,191,138,.12)',
        borderWidth: 1,
        bgcolor: selected ? 'rgba(199,148,93,.08)' : 'background.paper',
        boxShadow: selected
          ? '0 20px 44px -20px rgba(199,148,93,.5)'
          : '0 12px 30px -22px rgba(0,0,0,.8)',
        transform: selected ? 'translateY(-3px)' : 'none',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: selected ? 'secondary.main' : 'rgba(230,191,138,.38)',
          boxShadow: '0 22px 45px -22px rgba(0,0,0,.9)',
        },
        height: '100%',
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
