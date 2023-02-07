import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { Box, CircularProgress, Grid } from '@mui/material';
import { HeaderText, NoFound } from '../../components/ui';
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

  if (loading) {
    return (
      <MainLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    <MainLayout>
      <NoFound />
    </MainLayout>;
  }

  const pokemons: PokemonV2Pokemon[] =
    data?.pokemon_v2_pokemon.map((pokemon) => ({
      ...pokemon,
      imgs: [
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
      ],
    })) || [];
  return (
    <MainLayout title="Favorites Pokemon">
      <HeaderText headerText="Favorite Pokémon" />
      {favoritePokemons.length === 0 ? (
        <NoFound />
      ) : (
        <>
          <Grid mt={7} container spacing={2}>
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
