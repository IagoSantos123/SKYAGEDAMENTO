export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#0E0E0F',
        backgroundImage:
          'radial-gradient(circle at 12% -10%, rgba(198, 161, 91, 0.08) 0%, rgba(198, 161, 91, 0) 40%), radial-gradient(circle at 90% 110%, rgba(198, 161, 91, 0.05) 0%, rgba(198, 161, 91, 0) 45%), linear-gradient(180deg, #111113 0%, #0A0A0B 100%)',
        backgroundAttachment: 'fixed',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::selection': {
        backgroundColor: 'rgba(198, 161, 91, 0.28)',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: '11px 26px',
        fontSize: '0.95rem',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      sizeLarge: {
        padding: '15px 32px',
        fontSize: '1rem',
        borderRadius: 12,
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #F5F3EE 0%, #E7E4DC 100%)',
        color: '#111111',
        boxShadow: '0 10px 28px -10px rgba(0, 0, 0, 0.6)',
        '&:hover': {
          boxShadow: '0 14px 32px -10px rgba(0, 0, 0, 0.7)',
          transform: 'translateY(-1px)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EFECE3 100%)',
        },
      },
      containedSecondary: {
        background: 'linear-gradient(135deg, #D9BC85 0%, #C6A15B 55%, #A3813F 100%)',
        color: '#161104',
        boxShadow: '0 10px 28px -10px rgba(198, 161, 91, 0.55)',
        '&:hover': {
          boxShadow: '0 14px 32px -10px rgba(198, 161, 91, 0.65)',
          transform: 'translateY(-1px)',
          background: 'linear-gradient(135deg, #E4CC9C 0%, #D0AD6C 55%, #A3813F 100%)',
        },
      },
      outlined: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.16)',
        color: '#F3F2EF',
        '&:hover': {
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.04)',
        },
      },
      text: {
        color: '#9B9A97',
        '&:hover': {
          background: 'rgba(255,255,255,0.05)',
          color: '#F3F2EF',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: '#1A1A1C',
      },
      rounded: {
        borderRadius: 24,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        backgroundColor: '#1A1A1C',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  MuiCardActionArea: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        '& .MuiCardActionArea-focusHighlight': {
          background:
            'linear-gradient(135deg, rgba(198,161,91,0.08), rgba(198,161,91,0.02))',
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
        borderRadius: 8,
        fontWeight: 600,
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
        color: '#9B9A97',
        '&.Mui-focused': {
          color: '#C6A15B',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s ease',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255,255,255,0.22)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#C6A15B',
          borderWidth: 1.5,
        },
      },
      notchedOutline: {
        borderColor: 'rgba(255,255,255,0.12)',
      },
      input: {
        '&::placeholder': {
          color: '#5C5C5E',
          opacity: 1,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 24,
        backgroundColor: '#1A1A1C',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundImage:
          'radial-gradient(circle at 50% -20%, rgba(198,161,91,0.10) 0%, rgba(198,161,91,0) 50%)',
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
        color: '#F3F2EF',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255,255,255,0.08)',
      },
    },
  },
}
