import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();

  const onClick = (route: String) => {
    router.push(`${route}`);
  };
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
              onClick={() => onClick('/')}
              style={{ cursor: 'pointer' }}
              src="/PokeApi.svg"
              width={100}
              height={40}
              alt="PokeApi"
              color="primary"
            ></Image>
          </Box>
          <Box>
            <Button onClick={() => onClick('/favorites')} color="primary">
              Favoritos
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
