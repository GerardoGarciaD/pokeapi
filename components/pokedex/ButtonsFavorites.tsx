import { FC } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { favoritePokemons } from '../../utils/localFavorites';
import styles from '../../styles/pokedex.module.css';
import { ButtonFavorite } from './ButtonFavorite';

interface Props {
  lastTenfavoritePokemons: number[];
  favoritePokemonsList: favoritePokemons[];
}

export const ButtonsFavorites: FC<Props> = ({
  lastTenfavoritePokemons,
  favoritePokemonsList,
}) => {
  return (
    <div className={styles['buttons-favorites']}>
      <Typography
        sx={{ typography: { xs: 'body2', md: 'body1' } }}
        className={styles['favorite-text']}
      >
        Last Ten Favorite Pokemons
      </Typography>

      {lastTenfavoritePokemons.map((element, i) => (
        <ButtonFavorite
          key={i}
          favoritePokemonsList={favoritePokemonsList}
          index={i}
        />
      ))}

      <Link
        href="/favorites"
        className={`${styles['pokedex-mode']} ${styles['black-button']}`}
      >
        <Typography
          sx={{ typography: { xs: 'body2', md: 'h5' } }}
          textAlign="center"
        >
          Go to all Favorites
        </Typography>
      </Link>
    </div>
  );
};
