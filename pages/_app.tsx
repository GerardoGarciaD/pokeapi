import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../themes/';
import { CssBaseline } from '@mui/material';
import client from '../apollo-client';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline></CssBaseline>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
