import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: { main: '#E8572A', dark: '#C2410C', light: '#FDBA74', contrastText: '#fff' },
    secondary: { main: '#15803D', contrastText: '#fff' },
    background: { default: '#FFFBF7', paper: '#FFFFFF' },
    text: { primary: '#1F2937', secondary: '#6B7280' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, paddingInline: 20 } },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06)' },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
