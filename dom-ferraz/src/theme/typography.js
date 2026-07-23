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
    fontWeight: 700,
    fontSize: '2.6rem',
    letterSpacing: '0.01em',
    lineHeight: 1.14,
    textTransform: 'uppercase',
  },
  h2: {
    fontFamily: displayFont,
    fontWeight: 700,
    fontSize: '2.05rem',
    letterSpacing: '0.01em',
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  h3: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '1.55rem',
    letterSpacing: '0.005em',
    lineHeight: 1.26,
  },
  h4: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '1.3rem',
    letterSpacing: '0',
    lineHeight: 1.3,
  },
  h5: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '1.1rem',
    letterSpacing: '0',
  },
  h6: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0',
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '1.05rem',
    color: '#9A9CA1',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.9rem',
    color: '#9A9CA1',
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
    fontFamily: displayFont,
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0',
  },
  overline: {
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.22em',
    lineHeight: 1.6,
  },
  caption: {
    fontSize: '0.75rem',
    color: '#9A9CA1',
  },
}
