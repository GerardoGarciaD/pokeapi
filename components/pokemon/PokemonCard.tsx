import React, { FC, useState } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/pokemonCard.module.css';
import { PokemonV2Pokemon } from '../../interfaces/pokemon-graphql';
import Button from '@mui/material/Button';
import { typeColors } from '../../interfaces';

interface Props {
  pokemon: PokemonV2Pokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const { id, name, img, pokemon_v2_pokemontypes } = pokemon;
  const pokemonType = pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  const onClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid item key={id} xs={6} sm={4} lg={3} xl={2}>
      <Card
        className={styles['card']}
        style={{
          background: `radial-gradient(circle at 50% 0%,${
            typeColors[pokemonType as keyof typeof typeColors]
          } 36%, #ffffff 36%)`,
        }}
      >
        <CardContent>
          <CardActionArea onClick={onClick}>
            <Image
              className={styles.pokemonImg}
              src={img}
              width={150}
              height={150}
              alt={name}
            ></Image>
            <Typography className={styles.capitalize} textAlign="center">
              {name}
            </Typography>
          </CardActionArea>
          <div className={styles.type}>
            {pokemon.pokemon_v2_pokemontypes.map((type) => {
              const pokemonType = type.pokemon_v2_type.name;
              return (
                <Button
                  className={styles.capitalize}
                  style={{
                    background: `${
                      typeColors[pokemonType as keyof typeof typeColors]
                    }`,
                    color: 'white',
                  }}
                  key={pokemonType}
                >
                  {pokemonType}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
