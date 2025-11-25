import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#5AFAAE', // --color-primary
    },
    secondary: {
      main: '#5AFAE4', // --color-secondary
    },
    error: {
      main: '#f44336', // Default MUI error color
    },
    background: {
      default: '#FFFFFF', // --color-white
    },
    text: {
      primary: '#333333', // --color-dark-text
    },
    action: {
      active: '#32c34c', // button hover
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
        fontWeight: 700,
    },
    h3: {
        fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      fontWeight: 'bold',
      fontSize: '15px',
      textTransform: 'none', // Buttons in the original design are not all caps
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#04911e',
          color: '#FFFFFF',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#32c34c',
          },
        },
      },
    },
  },
});

export default theme;
