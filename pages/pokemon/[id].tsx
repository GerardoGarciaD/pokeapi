import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '../../interfaces/pokemon-full';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existsInFavorites(pokemon.id));
  }, []);

  const onClickFavorites = () => {
    localFavorites.togglePokemonFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);
  };

  return (
    <MainLayout title={pokemon.name}>
      <Typography>{pokemon.name}</Typography>
      <Button variant="outlined" onClick={onClickFavorites}>
        Add to favorites
      </Button>
      {isInFavorites ? (
        <Typography>In favorites :D</Typography>
      ) : (
        <Typography>Not in favorites :C </Typography>
      )}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
