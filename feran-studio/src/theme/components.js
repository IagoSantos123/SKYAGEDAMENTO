export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#0A0A0C',
        backgroundImage:
          'radial-gradient(circle at 12% -10%, rgba(173, 177, 184, 0.07) 0%, rgba(173, 177, 184, 0) 40%), radial-gradient(circle at 90% 110%, rgba(173, 177, 184, 0.05) 0%, rgba(173, 177, 184, 0) 45%), linear-gradient(180deg, #101113 0%, #060607 100%)',
        backgroundAttachment: 'fixed',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::selection': {
        backgroundColor: 'rgba(173, 177, 184, 0.28)',
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
        background: 'linear-gradient(135deg, #E7E9EC 0%, #ADB1B8 55%, #7A7E85 100%)',
        color: '#0A0A0B',
        boxShadow: '0 10px 28px -10px rgba(173, 177, 184, 0.45)',
        '&:hover': {
          boxShadow: '0 14px 32px -10px rgba(173, 177, 184, 0.55)',
          transform: 'translateY(-1px)',
          background: 'linear-gradient(135deg, #F2F3F5 0%, #BCBFC5 55%, #7A7E85 100%)',
        },
      },
      outlined: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.16)',
        color: '#F2F3F5',
        '&:hover': {
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.04)',
        },
      },
      text: {
        color: '#9A9CA1',
        '&:hover': {
          background: 'rgba(255,255,255,0.05)',
          color: '#F2F3F5',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: '#16171A',
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
        backgroundColor: '#16171A',
        border: '1px solid rgba(255, 255, 255, 0.08)',
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
            'linear-gradient(135deg, rgba(173,177,184,0.09), rgba(173,177,184,0.02))',
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
        borderRadius: 6,
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
        color: '#9A9CA1',
        '&.Mui-focused': {
          color: '#ADB1B8',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s ease',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255,255,255,0.22)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ADB1B8',
          borderWidth: 1.5,
        },
      },
      notchedOutline: {
        borderColor: 'rgba(255,255,255,0.12)',
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
        backgroundColor: '#16171A',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundImage:
          'radial-gradient(circle at 50% -20%, rgba(173,177,184,0.10) 0%, rgba(173,177,184,0) 50%)',
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
        color: '#F2F3F5',
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
