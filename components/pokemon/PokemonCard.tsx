import React, { FC } from 'react';
import { SmallPokemon } from '../../interfaces/pokemon-list';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  const { id, name, img } = pokemon;
  return (
    <Grid item key={id} xs={6} sm={3} md={2} xl={1}>
      <Card>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Typography> {name} </Typography>
            <Image src={img} width={100} height={100} alt={name}></Image>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
