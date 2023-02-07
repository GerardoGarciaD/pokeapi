import { gql } from '@apollo/client';
import client from '../config/apollo-client';
import {
  AllPokemons,
  PokemonPokedex,
  PokemonPokedexInfo,
  PokemonV2Pokemon,
  PokemonsNamesPrevNext,
  PrevNextPokemons,
} from '../interfaces';

export const getPokemonsNames = async (): Promise<PokemonPokedex[]> => {
  const {
    data: { pokemon_v2_pokemon },
  } = await client.query<PokemonPokedexInfo>({
    query: gql`
      query GetPokemonsNames {
        pokemon_v2_pokemon(limit: 50) {
          name
        }
      }
    `,
  });

  return pokemon_v2_pokemon;
};

export const getPokemonInfo = async (
  name: string
): Promise<PokemonPokedex[]> => {
  const {
    data: { pokemon_v2_pokemon },
  } = await client.query<PokemonPokedexInfo>({
    query: gql`
      query GetPokemon($pokemonName: String!) {
        pokemon_v2_pokemon(where: { name: { _eq: $pokemonName } }) {
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
          pokemon_v2_pokemonmoves(limit: 4, distinct_on: move_id) {
            pokemon_v2_move {
              name
              id
            }
          }
          pokemon_v2_pokemonabilities(limit: 4) {
            pokemon_v2_ability {
              name
              id
            }
          }
        }
      }
    `,
    variables: {
      pokemonName: name,
    },
  });

  return pokemon_v2_pokemon;
};

export const get251Pokemons = async (): Promise<PokemonV2Pokemon[]> => {
  const {
    data: { pokemon_v2_pokemon },
  } = await client.query<AllPokemons>({
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

  return pokemon_v2_pokemon;
};

export const getPrevaAndNextPokemon = async (
  pokemonId: number
): Promise<PokemonsNamesPrevNext[]> => {
  const {
    data: { pokemon_v2_pokemon },
  } = await client.query<PrevNextPokemons>({
    query: gql`
      query GetPrevNextPokemons($id: Int!) {
        pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
          name
          id
        }
      }
    `,
    variables: {
      id: pokemonId,
    },
  });

  return pokemon_v2_pokemon;
};
