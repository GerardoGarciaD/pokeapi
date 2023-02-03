import { Box, AppBar, Toolbar, Button } from '@mui/material';
import React from 'react';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Image
              src="/PokeApi.svg"
              width={100}
              height={40}
              alt="PokeApi"
              color="primary"
            ></Image>
          </Box>
          <Box>
            <Button color="primary">Typo</Button>
            <Button color="primary">Color</Button>
            <Button color="primary">Tamaño</Button>
            <Button color="primary">Region</Button>
            <Button color="primary">Favoritos</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
