import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../themes/';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline></CssBaseline>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
