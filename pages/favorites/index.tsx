import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts';
import { Box, Typography } from '@mui/material';
import { NoFound } from '../../components/ui';
import { localFavorites } from '../../utils';

const Favorites: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <MainLayout>
      {favoritePokemons.length === 0 ? (
        <NoFound />
      ) : (
        <>
          {favoritePokemons.map((id) => (
            <Typography key={id}> {id}</Typography>
          ))}
        </>
      )}
    </MainLayout>
  );
};

export default Favorites;
