import type { GetStaticProps, NextPage } from 'next';
import { MainLayout } from '../components/layouts';
import Grid from '@mui/material/Grid';
import { PokemonCard } from '../components/pokemon';
import client from '../apollo-client';
import { gql } from '@apollo/client/core';
import { AllPokemons, PokemonV2Pokemon } from '../interfaces/pokemon-graphql';
import { SyntheticEvent, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  SelectChangeEvent,
  Autocomplete,
  TextField,
  Box,
} from '@mui/material';
import { pokemonTypes } from '../interfaces';
import { useRouter } from 'next/router';

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
      <Box display="flex" justifyContent="space-between">
        <FormControl sx={{ mb: 4, width: 300 }}>
          <InputLabel id="typeSelectLabel">Type</InputLabel>
          <Select
            labelId="typeSelectLabel"
            id="demo-simple-select"
            value={pokemonType}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value={''}>
              <ListItemText primary={'All'} />
            </MenuItem>
            {pokemonTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <ListItemText
                  style={{ textTransform: 'capitalize' }}
                  primary={type}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          disablePortal
          id="searchPokemonName"
          onInputChange={(event, value) => handleChangeName(event, value)}
          // onChange={(event, value) => handleChangeName(event, value)}
          options={pokemonsfiltered}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Pokemon Name" />
          )}
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
  const { data } = await client.query<AllPokemons>({
    query: gql`
      query GetPokemonsInfo {
        pokemon_v2_pokemon(limit: 251) {
          name
          id
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `,
  });

  const pokemons: PokemonV2Pokemon[] = data.pokemon_v2_pokemon.map(
    (pokemon) => ({
      ...pokemon,
      label: pokemon.name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
    })
  );

  return {
    props: {
      pokemons: pokemons,
    },
  };
};
export default Home;
