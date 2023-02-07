import React, { FC } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
} from '@mui/material';
import { Name, PokemonV2Pokemon, typeColors } from '../../interfaces';
import styles from '../../styles/pokemonCard.module.css';

interface Props {
  pokemonType: Name;
  onClick: () => void;
  pokemonSVG: string;
  name: string;
  pokemon: PokemonV2Pokemon;
}

export const FrontCard: FC<Props> = ({
  pokemonType,
  onClick,
  pokemonSVG,
  name,
  pokemon,
}) => {
  return (
    <Card
      className={styles.front}
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
            src={pokemonSVG}
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
  );
};
