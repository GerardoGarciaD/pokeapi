import { SyntheticEvent, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import { PokemonV2Pokemon } from '../interfaces/pokemon-graphql';
import { SelectChangeEvent, Box } from '@mui/material';
import { PokemonCard, PokemonFilters } from '../components/pokemon';
import { MainLayout } from '../components/layouts';
import { HeaderText } from '../components/ui';
import { getPokemons } from '../apiQueries';

interface Props {
  pokemons: PokemonV2Pokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  const [pokemonType, setPokemonType] = useState<string>('');
  const router = useRouter();

  let pokemonsfiltered: PokemonV2Pokemon[] = pokemons.filter((pokemon) =>
    pokemon.pokemon_v2_pokemontypes.some((pokemonTypeInfo) =>
      pokemonTypeInfo.pokemon_v2_type.name.includes(pokemonType)
    )
  );

  const handleChange = (event: SelectChangeEvent) => {
    setPokemonType(event.target.value as string);
  };

  const handleChangeName = (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    router.push(`/pokemon/${value}`);
  };

  return (
    <MainLayout title="Index PokeApi">
      <HeaderText headerText="All Pokémon" />
      <Box mt={8} display="flex" justifyContent="space-between">
        <PokemonFilters
          pokemonType={pokemonType}
          handleChange={handleChange}
          handleChangeName={handleChangeName}
          pokemonsfiltered={pokemonsfiltered}
        />
      </Box>

      <Grid container spacing={2}>
        {pokemonsfiltered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
        ))}
      </Grid>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let pokemons: PokemonV2Pokemon[] = await getPokemons();

  pokemons = pokemons.map((pokemon) => ({
    ...pokemon,
    label: pokemon.name,
    imgs: [
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`,
    ],
  }));

  return {
    props: {
      pokemons,
    },
  };
};
export default Home;
