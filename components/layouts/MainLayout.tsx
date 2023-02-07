import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui/Navbar';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Gerardo García"></meta>
        <meta name="description" content={`Information about ${title}`}></meta>
        <meta name="keywords" content={`${title}, pokemon, pokedex`}></meta>
        <meta property="og:title" content={`${title}`} />
        <meta property="og:description" content={`Page about ${title}`} />
        <meta
          property="og:image"
          content="https://m.media-amazon.com/images/I/71SicEByFZL._SL1333_.jpg"
        />
      </Head>

      <Navbar></Navbar>
      <main
        style={{
          maxWidth: '90%',
          margin: '4rem auto',
          paddingBottom: '4rem',
        }}
      >
        {children}
      </main>
    </>
  );
};
