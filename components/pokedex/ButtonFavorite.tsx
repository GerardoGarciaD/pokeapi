import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/pokedex.module.css';
import { favoritePokemons } from '../../utils/localFavorites';

interface Props {
  favoritePokemonsList: favoritePokemons[];
  index: number;
}

export const ButtonFavorite: FC<Props> = ({ favoritePokemonsList, index }) => {
  return (
    <button className={styles['level-button']}>
      {!favoritePokemonsList[index] ? (
        ''
      ) : (
        <Link href={`/pokemon/${favoritePokemonsList[index].name}`}>
          <Image
            title={favoritePokemonsList[index].name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${favoritePokemonsList[index].id}.gif`}
            width={30}
            height={30}
            alt="pokemon"
          ></Image>
        </Link>
      )}
    </button>
  );
};
