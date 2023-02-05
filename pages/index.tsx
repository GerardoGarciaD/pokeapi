import type { GetStaticProps, NextPage } from 'next';
import { MainLayout } from '../components/layouts';
import Grid from '@mui/material/Grid';
import { PokemonCard } from '../components/pokemon';
import client from '../apollo-client';
import { gql } from '@apollo/client/core';
import { AllPokemons, PokemonV2Pokemon } from '../interfaces/pokemon-graphql';
interface Props {
  pokemons: PokemonV2Pokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  console.log(pokemons);

  return (
    <MainLayout title="Index PokeApi">
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
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
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
        }
      }
    `,
  });

  const pokemons: PokemonV2Pokemon[] = data.pokemon_v2_pokemon.map(
    (poke, id) => ({
      ...poke,
      id: id + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        id + 1
      }.svg`,
    })
  );

  return {
    props: {
      pokemons: pokemons,
    },
  };
};
export default Home;
