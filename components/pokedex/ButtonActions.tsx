import { FC } from 'react';
import {
  ArrowDropUpSharp,
  ArrowLeftSharp,
  ArrowDropDownSharp,
  ArrowRightSharp,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import styles from '../../styles/pokedex.module.css';
import { PokemonsNamesPrevNext } from '../../interfaces';
import { useRouter } from 'next/router';

interface Props {
  onClickFavorites: () => void;
  isInFavorites: boolean;
  prevPokemon: PokemonsNamesPrevNext;
  nextPokemon: PokemonsNamesPrevNext;
}

export const ButtonActions: FC<Props> = ({
  onClickFavorites,
  isInFavorites,
  prevPokemon,
  nextPokemon,
}) => {
  const router = useRouter();
  const onClickArrows = (pokemon: string) => {
    router.push(`/pokemon/${pokemon}`);
  };
  return (
    <div className={styles['botom-actions']}>
      <div id={styles.actions}>
        <Button
          onClick={onClickFavorites}
          title={
            !isInFavorites ? 'Add to favorites' : 'Remove from to favorites'
          }
          className={styles.a}
        >
          {!isInFavorites ? (
            <FavoriteBorderOutlinedIcon color="error" fontSize="large" />
          ) : (
            <FavoriteOutlinedIcon color="error" fontSize="large" />
          )}
        </Button>
      </div>
      <div id={styles.cross}>
        <button className={`${styles['cross-button']} ${styles.up}`}>
          <ArrowDropUpSharp />
        </button>

        <button
          title={`Previous pokemon - ${prevPokemon.name}`}
          onClick={() => onClickArrows(prevPokemon.name)}
          className={`${styles['cross-button']} ${styles.right}`}
        >
          <ArrowLeftSharp />
        </button>

        <button className={`${styles['cross-button']} ${styles.down}`}>
          <ArrowDropDownSharp />
        </button>
        <button
          title={`Next Pokemon - ${nextPokemon.name}`}
          onClick={() => onClickArrows(nextPokemon.name)}
          className={`${styles['cross-button']} ${styles.left}`}
        >
          <ArrowRightSharp />
        </button>
        <div className={`${styles['cross-button']} ${styles.center}`}></div>
      </div>
    </div>
  );
};
