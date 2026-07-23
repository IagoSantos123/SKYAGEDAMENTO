export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#140D0A',
        backgroundImage:
          'radial-gradient(circle at 12% -10%, rgba(199,148,93,.18) 0%, rgba(199,148,93,0) 40%), radial-gradient(circle at 90% 110%, rgba(107,59,39,.16) 0%, rgba(107,59,39,0) 45%), linear-gradient(160deg, #1C110D 0%, #0D0806 100%)',
        backgroundAttachment: 'fixed',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::selection': {
        backgroundColor: 'rgba(199,148,93,.3)',
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
        background: 'linear-gradient(135deg, #E6BF8A 0%, #C7945D 55%, #8F5B35 100%)',
        color: '#1C100C',
        boxShadow: '0 10px 28px -10px rgba(143,91,53,.6)',
        '&:hover': {
          boxShadow: '0 14px 32px -10px rgba(143,91,53,.7)',
          transform: 'translateY(-1px)',
          background: 'linear-gradient(135deg, #F7EAD3 0%, #D5A56D 55%, #8F5B35 100%)',
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
        backgroundColor: '#211510',
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
        backgroundColor: '#211510',
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
            'linear-gradient(135deg, rgba(199,148,93,0.12), rgba(199,148,93,0.03))',
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
        color: 'rgba(255,248,236,.8)',
        borderColor: 'rgba(230,191,138,.18)',
        background: 'rgba(247,234,211,.035)',
        backdropFilter: 'blur(8px)',
        transition: 'transform .2s ease, border-color .2s ease, background .2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'rgba(230,191,138,.42)',
          background: 'rgba(199,148,93,.08)',
        },
        '& .MuiChip-icon': {
          color: '#C7945D',
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
        color: '#9A9CA1',
        '&.Mui-focused': {
          color: '#C7945D',
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
          borderColor: '#C7945D',
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
        backgroundColor: '#211510',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundImage:
          'radial-gradient(circle at 50% -20%, rgba(199,148,93,0.15) 0%, rgba(199,148,93,0) 50%)',
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
