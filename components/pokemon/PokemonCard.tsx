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

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { id, name, img } = pokemon;
  return (
    <Grid item key={id} xs={6} sm={3} md={2} xl={1}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography> {name} </Typography>
            <Image src={img} width={100} height={100} alt={name}></Image>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
