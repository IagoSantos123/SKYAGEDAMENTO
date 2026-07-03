const displayFont = ['"Playfair Display"', 'Georgia', 'serif'].join(',')

const bodyFont = [
  '"Inter"',
  '"Segoe UI"',
  '-apple-system',
  'BlinkMacSystemFont',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',')

export const typography = {
  fontFamily: bodyFont,
  h1: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '2.75rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.12,
  },
  h2: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '2.125rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.18,
  },
  h3: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '1.625rem',
    letterSpacing: '-0.005em',
    lineHeight: 1.25,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.375rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.125rem',
    letterSpacing: '-0.005em',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: 0,
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '1.05rem',
    color: '#9B9A97',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.9rem',
    color: '#9B9A97',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.55,
  },
  button: {
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0',
  },
  overline: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    lineHeight: 1.6,
  },
  caption: {
    fontSize: '0.75rem',
    color: '#9B9A97',
  },
}
