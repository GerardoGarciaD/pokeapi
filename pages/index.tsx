import type { NextPage } from 'next';
import { MainLayout } from '../components/layouts';
import { Box } from '@mui/system';

const Home: NextPage = () => {
  return (
    <MainLayout title="Index PokeApi">
      <Box>PokeAPI</Box>
    </MainLayout>
  );
};

export default Home;
