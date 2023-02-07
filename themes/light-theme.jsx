import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#eff3ff',
    },
    primary: {
      main: '#1E1E1E',
    },
    secondary: {
      main: '#3A64D8',
    },
    info: {
      main: '#fff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.34)',
          height: 80,
          borderRadius: 5,
          maxWidth: '95%',
          margin: '0 auto',
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ':hover': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
    fontSize: 12,
    letterSpacing: '10px',

    h1: {
      fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
      fontSize: 60,
      padding: 0,
      lineHeight: '10px',
    },
    h2: {
      fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
      fontSize: 16,
    },
    h6: {
      fontFamily: ['Press Start 2P', 'sans-serif'].join(','),
      fontSize: 14,
    },
  },
});
