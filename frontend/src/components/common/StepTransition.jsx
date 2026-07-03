import { Box, Fade } from '@mui/material'

/**
 * Envolve cada etapa do fluxo com uma animação de entrada suave (fade + slide),
 * dando a sensação de que uma nova mensagem "aparece" na conversa.
 */
export default function StepTransition({ children, stepKey }) {
  return (
    <Fade in key={stepKey} timeout={450}>
      <Box
        sx={{
          animation: 'stepSlideIn 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          '@keyframes stepSlideIn': {
            from: { opacity: 0, transform: 'translateY(14px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {children}
      </Box>
    </Fade>
  )
}
