import { Box, AppBar, Toolbar } from '@mui/material';
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
              width={130}
              height={50}
              alt="PokeApi"
              color="primary"
            ></Image>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
