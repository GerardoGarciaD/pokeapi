import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { localFavorites } from '../../utils';
import {
  PokemonPokedex,
  PokemonsNamesPrevNext,
  typeColors,
} from '../../interfaces';
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
import {
  getPokemonInfo,
  getPokemonsNames,
  getPrevaAndNextPokemon,
} from '../../apiQueries';
import { HeaderText } from '../../components/ui';

interface Props {
  pokemon: PokemonPokedex;
  prevPokemon: PokemonsNamesPrevNext;
  nextPokemon: PokemonsNamesPrevNext;
}

const PokemonByNamePage: NextPage<Props> = ({
  pokemon,
  prevPokemon,
  nextPokemon,
}) => {
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
  }, [pokemon.id, pokemon.name]);

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
      <HeaderText headerText="Pokedex" />
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
          prevPokemon={prevPokemon}
          nextPokemon={nextPokemon}
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
  const pokemons251: PokemonPokedex[] = await getPokemonsNames();

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

  const pokemon_v2_pokemon = await getPokemonInfo(name);
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

  const prevPokemonId = pokemon.id - 1 === 0 ? 649 : pokemon.id - 1;
  const nextPokemonId = pokemon.id + 1 === 650 ? 1 : pokemon.id + 1;

  const [prevPokemon] = await getPrevaAndNextPokemon(prevPokemonId);
  const [nextPokemon] = await getPrevaAndNextPokemon(nextPokemonId);

  return {
    props: {
      pokemon,
      prevPokemon,
      nextPokemon,
    },
  };
};

export default PokemonByNamePage;
