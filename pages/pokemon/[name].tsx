import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { localFavorites } from '../../utils';
import client from '../../config/apollo-client';
import {
  PokemonPokedex,
  PokemonPokedexInfo,
  typeColors,
} from '../../interfaces';
import { gql } from '@apollo/client/core';
import styles from '../../styles/pokedex.module.css';
import Image from 'next/image';
import { favoritePokemons } from '../../utils/localFavorites';
import Sound from 'react-sound';
import confetti from 'canvas-confetti';
import {
  ButtonActions,
  ButtonsFavorites,
  StatsDisplay,
} from '../../components/pokedex';
import { playingStatusEnum } from '../../interfaces';

interface Props {
  pokemon: PokemonPokedex;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [favoritePokemonsList, setFavoritePokemonsList] = useState<
    favoritePokemons[]
  >([]);
  const [playingStatus, setPlayingStatus] = useState<playingStatusEnum>(
    playingStatusEnum.playing
  );

  useEffect(() => {
    setFavoritePokemonsList(localFavorites.pokemons());
  }, []);

  useEffect(() => {
    setIsInFavorites(
      localFavorites.existsInFavorites({ id: pokemon.id, name: pokemon.name })
    );
  }, []);

  const handlePlayingStatus = () => {
    setPlayingStatus(
      playingStatus === playingStatusEnum.playing
        ? playingStatusEnum.paused
        : playingStatusEnum.playing
    );
  };

  const lastTenfavoritePokemons: number[] = new Array(10).fill('');

  const onClickFavorites = () => {
    localFavorites.togglePokemonFavorites({
      id: pokemon.id,
      name: pokemon.name,
    });
    setFavoritePokemonsList((prev) => {
      if (
        favoritePokemonsList.some((favPokemon) => favPokemon.id === pokemon.id)
      ) {
        return prev.filter((favPokemon) => favPokemon.id !== pokemon.id);
      }
      return [{ id: pokemon.id, name: pokemon.name }, ...prev];
    });
    setIsInFavorites(!isInFavorites);
    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 250,
        spread: 360,
        angle: 0,
        origin: {
          x: 0.5,
          y: 0.5,
        },
      });
    }
  };

  const pokemonType = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  return (
    <MainLayout title={pokemon.name}>
      <div id={styles.pokedex}>
        <div
          className={styles.sensor}
          title={
            playingStatus === playingStatusEnum.playing
              ? 'Pause Music'
              : 'Play Music'
          }
        >
          <button onClick={handlePlayingStatus}></button>
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

        <StatsDisplay pokemon={pokemon} />

        <ButtonActions
          isInFavorites={isInFavorites}
          onClickFavorites={onClickFavorites}
        />

        <ButtonsFavorites
          lastTenfavoritePokemons={lastTenfavoritePokemons}
          favoritePokemonsList={favoritePokemonsList}
        />
      </div>

      <Sound
        url="/music/battle1.mp3"
        playStatus={playingStatus}
        volume={50}
      ></Sound>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await client.query<PokemonPokedexInfo>({
    query: gql`
      query GetPokemonsNames {
        pokemon_v2_pokemon(limit: 50) {
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
  name = name.split('_').join('-');
  const { data } = await client.query<PokemonPokedexInfo>({
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
