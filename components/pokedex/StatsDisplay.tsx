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
        <Typography variant="h3" className={styles.capitalize}>
          {name}
        </Typography>
        <Typography variant="h3" className={styles.capitalize}>
          # {id}
        </Typography>
      </div>
      <Divider></Divider>

      <Typography mt={2} variant="h4" className={styles.capitalize}>
        Type
      </Typography>

      <ul>
        {pokemon_v2_pokemontypes.map((pokemonType) => (
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
      <ul>
        {pokemon_v2_pokemonabilities.map((pokemonAbility) => (
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
      <ul>
        {pokemon_v2_pokemonmoves.map((pokemonMove) => (
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
      <ul>
        {pokemon_v2_pokemonstats.map((pokemonStats) => (
          <li
            className={styles.capitalize}
            key={pokemonStats.pokemon_v2_stat.name}
          >
            {pokemonStats.pokemon_v2_stat.name}: {pokemonStats.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};
