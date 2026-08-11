export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#F7EDDF',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::selection': {
        backgroundColor: 'rgba(75,41,30,.2)',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 10,
        padding: '11px 26px',
        fontSize: '0.95rem',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      sizeLarge: {
        padding: '15px 32px',
        fontSize: '1rem',
        borderRadius: 10,
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #EDEEF0 0%, #D7D9DC 100%)',
        color: '#0A0A0B',
        boxShadow: '0 10px 28px -10px rgba(0, 0, 0, 0.6)',
        '&:hover': {
          boxShadow: '0 14px 32px -10px rgba(0, 0, 0, 0.7)',
          transform: 'translateY(-1px)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F2F3F5 100%)',
        },
      },
      containedSecondary: {
        background: '#4A291E', color: '#FFF8EC',
        boxShadow: '0 10px 28px -10px rgba(143,91,53,.6)',
        '&:hover': {
          boxShadow: '0 14px 32px -10px rgba(143,91,53,.7)',
          transform: 'translateY(-1px)',
          background: '#2C1710',
        },
      },
      outlined: {
        borderWidth: 1,
        borderColor: 'rgba(75,41,30,.22)', color: '#4A291E',
        '&:hover': {
          borderWidth: 1,
          borderColor: 'rgba(75,41,30,.5)', background: 'rgba(75,41,30,.04)',
        },
      },
      text: {
        color: '#5E493F',
        '&:hover': {
          background: 'rgba(75,41,30,.05)', color: '#2C1710',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: '#FFF9F0',
      },
      rounded: {
        borderRadius: 24,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        backgroundColor: '#FFF9F0', border: '1px solid rgba(75,41,30,.13)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  MuiCardActionArea: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        '& .MuiCardActionArea-focusHighlight': {
          background:
            'linear-gradient(135deg, rgba(75,41,30,.08), rgba(75,41,30,.02))',
        },
        '&:hover .MuiCardActionArea-focusHighlight': {
          opacity: 1,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        fontWeight: 600,
        height: 36,
        color: '#5E493F', borderColor: 'rgba(75,41,30,.16)', background: 'rgba(75,41,30,.035)',
        backdropFilter: 'blur(8px)',
        transition: 'transform .2s ease, border-color .2s ease, background .2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'rgba(75,41,30,.38)', background: 'rgba(75,41,30,.08)',
        },
        '& .MuiChip-icon': {
          color: '#4A291E',
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#756258',
        '&.Mui-focused': {
          color: '#4A291E',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,.5)',
        transition: 'all 0.2s ease',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(75,41,30,.3)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4A291E',
          borderWidth: 1.5,
        },
      },
      notchedOutline: {
        borderColor: 'rgba(75,41,30,.18)',
      },
      input: {
        '&::placeholder': {
          color: '#54565B',
          opacity: 1,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 24,
        backgroundColor: '#FFF9F0', border: '1px solid rgba(75,41,30,.12)',
        backgroundImage:
          'radial-gradient(circle at 50% -20%, rgba(75,41,30,.08) 0%, rgba(75,41,30,0) 50%)',
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        border: '2px solid rgba(255,255,255,0.1)',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: 'rgba(255,255,255,0.08)',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: '#4A291E',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(75,41,30,.1)',
      },
    },
  },
}
