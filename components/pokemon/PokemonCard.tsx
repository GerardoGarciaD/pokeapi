import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../styles/pokemonCard.module.css';
import { PokemonV2Pokemon } from '../../interfaces/pokemon-graphql';
import { FrontCard } from './FrontCard';
import { BackCard } from './BackCard';

interface Props {
  pokemon: PokemonV2Pokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const { id, name, imgs, pokemon_v2_pokemontypes } = pokemon;
  const pokemonType = pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  const onClick = () => {
    router.push(`/pokemon/${name}`);
  };

  const [, , , pokemonSVG] = imgs;
  return (
    <Grid
      className={styles['card-container']}
      item
      key={id}
      xs={6}
      sm={4}
      lg={3}
      xl={2}
    >
      <div className={styles['card']}>
        <FrontCard
          pokemonType={pokemonType}
          onClick={onClick}
          pokemonSVG={pokemonSVG}
          name={name}
          pokemon={pokemon}
        />

        <BackCard
          pokemonType={pokemonType}
          onClick={onClick}
          name={name}
          imgs={imgs}
        ></BackCard>
      </div>
    </Grid>
  );
};
