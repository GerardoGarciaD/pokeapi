import React, { FC } from 'react';
import { Typography, Divider } from '@mui/material';
import { PokemonPokedex } from '../../interfaces';
import styles from '../../styles/pokedex.module.css';

interface Props {
  pokemon: PokemonPokedex;
}

export const StatsDisplay: FC<Props> = ({ pokemon }) => {
  const {
    id,
    name,
    pokemon_v2_pokemontypes,
    pokemon_v2_pokemonabilities,
    pokemon_v2_pokemonmoves,
    pokemon_v2_pokemonstats,
  } = pokemon;
  return (
    <div className={styles['stats-display']}>
      <div className={styles['pokemon-header']}>
        <Typography
          sx={{ typography: { xs: 'body1', md: 'h3' } }}
          className={styles.capitalize}
        >
          {name}
        </Typography>
        <Typography
          sx={{ typography: { xs: 'body1', md: 'h3' } }}
          className={styles.capitalize}
        >
          # {id}
        </Typography>
      </div>
      <Divider></Divider>

      <Typography
        mt={2}
        sx={{ typography: { xs: 'body2', md: 'h4' } }}
        className={styles.capitalize}
      >
        Type
      </Typography>

      <ul>
        {pokemon_v2_pokemontypes.map((pokemonType) => (
          <li
            className={styles.capitalize}
            key={pokemonType.pokemon_v2_type.name}
          >
            <Typography sx={{ typography: { xs: 'body2', md: 'h5' } }}>
              {pokemonType.pokemon_v2_type.name}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography
        mt={2}
        sx={{ typography: { xs: 'body2', md: 'h4' } }}
        className={styles.capitalize}
      >
        Abilities
      </Typography>
      <ul>
        {pokemon_v2_pokemonabilities.map((pokemonAbility) => (
          <li
            className={styles.capitalize}
            key={pokemonAbility.pokemon_v2_ability.name}
          >
            <Typography sx={{ typography: { xs: 'body2', md: 'h5' } }}>
              {pokemonAbility.pokemon_v2_ability.name}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography
        mt={2}
        sx={{ typography: { xs: 'body2', md: 'h4' } }}
        className={styles.capitalize}
      >
        Moves
      </Typography>
      <ul>
        {pokemon_v2_pokemonmoves.map((pokemonMove) => (
          <li
            className={styles.capitalize}
            key={pokemonMove.pokemon_v2_move.name}
          >
            <Typography sx={{ typography: { xs: 'body2', md: 'h5' } }}>
              {pokemonMove.pokemon_v2_move.name}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography
        mt={2}
        sx={{ typography: { xs: 'body2', md: 'h4' } }}
        className={styles.capitalize}
      >
        Stats
      </Typography>
      <ul>
        {pokemon_v2_pokemonstats.map((pokemonStats) => (
          <li
            className={styles.capitalize}
            key={pokemonStats.pokemon_v2_stat.name}
          >
            <Typography sx={{ typography: { xs: 'body2', md: 'h5' } }}>
              {pokemonStats.pokemon_v2_stat.name}: {pokemonStats.base_stat}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};
