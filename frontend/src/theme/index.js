import { createTheme } from '@mui/material/styles'
import { palette } from './palette'
import { typography } from './typography'
import { components } from './components'

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.30)',
    '0 2px 6px rgba(0,0,0,0.32)',
    '0 4px 10px rgba(0,0,0,0.34)',
    '0 6px 16px rgba(0,0,0,0.36)',
    '0 8px 20px rgba(0,0,0,0.38)',
    '0 10px 24px rgba(0,0,0,0.40)',
    '0 12px 28px rgba(0,0,0,0.42)',
    '0 14px 32px rgba(0,0,0,0.44)',
    '0 16px 36px rgba(0,0,0,0.46)',
    '0 18px 40px rgba(0,0,0,0.48)',
    '0 20px 44px rgba(0,0,0,0.50)',
    '0 22px 48px rgba(0,0,0,0.52)',
    '0 24px 52px rgba(0,0,0,0.54)',
    '0 26px 56px rgba(0,0,0,0.56)',
    '0 28px 60px rgba(0,0,0,0.58)',
    '0 30px 64px rgba(0,0,0,0.60)',
    '0 32px 68px rgba(0,0,0,0.62)',
    '0 34px 72px rgba(0,0,0,0.64)',
    '0 36px 76px rgba(0,0,0,0.66)',
    '0 38px 80px rgba(0,0,0,0.68)',
    '0 40px 84px rgba(0,0,0,0.70)',
    '0 42px 88px rgba(0,0,0,0.72)',
    '0 44px 92px rgba(0,0,0,0.74)',
    '0 46px 96px rgba(0,0,0,0.76)',
  ],
  components,
})

export default theme
