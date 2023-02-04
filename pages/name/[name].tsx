import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '../../interfaces/pokemon-full';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokemonListResponse, SmallPokemon } from '../../interfaces';
import { log } from 'console';

interface Props {
  pokemon: Pokemon;
}
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
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
  const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=251');

  const pokemons251: SmallPokemon[] = data.results;

  return {
    paths: pokemons251.map((pokemon) => ({
      params: { name: pokemon.name },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

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
  };
};

export default PokemonByNamePage;
