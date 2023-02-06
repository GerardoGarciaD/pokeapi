import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { Grid, Typography } from '@mui/material';
import { NoFound } from '../../components/ui';
import { localFavorites } from '../../utils';
import { favoritePokemons } from '../../utils/localFavorites';
import { AllPokemons, PokemonV2Pokemon } from '../../interfaces';
import { gql, useQuery } from '@apollo/client';
import { PokemonCard } from '../../components/pokemon';

const GET_FAV_POKEMONS = gql`
  query GetFavPokemons($names: [String!]) {
    pokemon_v2_pokemon(where: { name: { _in: $names } }) {
      name
      id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

const Favorites: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<favoritePokemons[]>(
    []
  );
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  const favPokemonsNames = favoritePokemons.map(
    (favoritePokemons) => favoritePokemons.name
  );

  const { data, loading, error } = useQuery<AllPokemons>(GET_FAV_POKEMONS, {
    variables: {
      names: favPokemonsNames,
    },
  });

  if (loading) return null;

  const pokemons: PokemonV2Pokemon[] = data!.pokemon_v2_pokemon.map((poke) => ({
    ...poke,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg`,
  }));
  return (
    <MainLayout>
      {favoritePokemons.length === 0 ? (
        <NoFound />
      ) : (
        <>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
            ))}
          </Grid>
        </>
      )}
    </MainLayout>
  );
};

export default Favorites;
