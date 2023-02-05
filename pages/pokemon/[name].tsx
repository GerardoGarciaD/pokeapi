import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { localFavorites } from '../../utils';
import client from '../../apollo-client';
import {
  AllPokemons,
  PokemonPokedex,
  PokemonPokedexInfo,
  PokemonV2Pokemon,
  typeColors,
} from '../../interfaces';
import { gql } from '@apollo/client/core';
import styles from '../../styles/pokedex.module.css';
import Image from 'next/image';

interface Props {
  pokemon: PokemonPokedex;
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

  const pokemonType = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  return (
    <MainLayout title={pokemon.name}>
      <div id={styles.pokedex}>
        <div className={styles.sensor}>
          <button></button>
        </div>
        <div
          className={styles['camera-display']}
          style={{
            background: typeColors[pokemonType as keyof typeof typeColors],
          }}
        >
          <Image src={pokemon.img} width={1} height={1} alt={pokemon.name} />
        </div>
        <div className={styles.divider}></div>
        <div className={styles['stats-display']}>
          <div className={styles['pokemon-header']}>
            <Typography variant="h3" className={styles.capitalize}>
              {pokemon.name}
            </Typography>
            <Typography variant="h3" className={styles.capitalize}>
              # {pokemon.id}
            </Typography>
          </div>
          <Divider></Divider>
          <Typography mt={2} variant="h4" className={styles.capitalize}>
            Type
          </Typography>
          <ul style={{ listStyleType: 'none' }}>
            {pokemon.pokemon_v2_pokemontypes.map((pokemonType) => (
              <li
                className={styles.capitalize}
                key={pokemonType.pokemon_v2_type.name}
              >
                {pokemonType.pokemon_v2_type.name}
              </li>
            ))}
          </ul>
          <Typography mt={2} variant="h4" className={styles.capitalize}>
            Abilities
          </Typography>
          <ul style={{ listStyleType: 'none' }}>
            {pokemon.pokemon_v2_pokemonabilities.map((pokemonAbility) => (
              <li
                className={styles.capitalize}
                key={pokemonAbility.pokemon_v2_ability.name}
              >
                {pokemonAbility.pokemon_v2_ability.name}
              </li>
            ))}
          </ul>
          <Typography mt={2} variant="h4" className={styles.capitalize}>
            Moves
          </Typography>
          <ul style={{ listStyleType: 'none' }}>
            {pokemon.pokemon_v2_pokemonmoves.map((pokemonMove) => (
              <li
                className={styles.capitalize}
                key={pokemonMove.pokemon_v2_move.name}
              >
                {pokemonMove.pokemon_v2_move.name}
              </li>
            ))}
          </ul>
          <Typography mt={2} variant="h4" className={styles.capitalize}>
            Stats
          </Typography>
          <ul style={{ listStyleType: 'none' }}>
            {pokemon.pokemon_v2_pokemonstats.map((pokemonStats) => (
              <li
                className={styles.capitalize}
                key={pokemonStats.pokemon_v2_stat.name}
              >
                {pokemonStats.pokemon_v2_stat.name}: {pokemonStats.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['botom-actions']}>
          <div id={styles.actions}>
            <button className={styles.a}></button>
          </div>
          <div id={styles.cross}>
            <button
              className={`${styles['cross-button']} ${styles.up}`}
            ></button>
            <button
              className={`${styles['cross-button']} ${styles.right}`}
            ></button>
            <button
              className={`${styles['cross-button']} ${styles.down}`}
            ></button>
            <button
              className={`${styles['cross-button']} ${styles.left}`}
            ></button>
            <div className={`${styles['cross-button']} ${styles.center}`}></div>
          </div>
        </div>
        <div className={styles['input-pad']}>
          <input />
        </div>

        <div className={styles['bottom-modes']}>
          <button className={styles['level-button']}></button>
          <button className={styles['level-button']}></button>
          <button className={styles['level-button']}></button>
          <button className={styles['level-button']}></button>

          <button
            className={`${styles['pokedex-mode']} ${styles['black-button']}`}
          ></button>
          <button
            className={`${styles['game-mode']} ${styles['black-button']}`}
          >
            Game
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await client.query<PokemonPokedexInfo>({
    query: gql`
      query GetPokemonsNames {
        pokemon_v2_pokemon(limit: 251) {
          name
        }
      }
    `,
  });

  const pokemons251: PokemonPokedex[] = data.pokemon_v2_pokemon;

  return {
    paths: pokemons251.map((pokemon) => ({
      params: { name: pokemon.name.split('-').join('_') },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let { name } = params as { name: string };
  const { data } = await client.query<PokemonPokedexInfo>({
    query: gql`
      query GetPokemonsInfo {
        pokemon_v2_pokemon(where: { name: { _eq: ${name}} }) {
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
  });

  const { pokemon_v2_pokemon } = data;
  if (!pokemon_v2_pokemon.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let [firstPokemon] = pokemon_v2_pokemon;

  const pokemon: PokemonPokedex = {
    ...firstPokemon,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${firstPokemon.id}.svg`,
  };

  return {
    props: {
      pokemon: pokemon,
    },
  };
};

export default PokemonByNamePage;
