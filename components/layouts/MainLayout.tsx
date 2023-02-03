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
        <meta name="description" content="Info about pokemon"></meta>
      </Head>

      <Navbar></Navbar>
      <main style={{ maxWidth: '90%', margin: '0 auto', marginTop: 20 }}>
        {children}
      </main>
    </>
  );
};
