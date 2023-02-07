import { FC } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from '../../styles/headerText.module.css';

interface Props {
  headerText: string;
}

export const HeaderText: FC<Props> = ({ headerText }) => {
  return (
    <Box mb={4} mt={0} display="flex" justifyContent="center">
      <Typography className={styles['header-text']} variant="h1">
        {headerText}
      </Typography>
    </Box>
  );
};
