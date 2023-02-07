import React, { FC } from 'react';
import Image from 'next/image';
import { Card } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Name, typeColors } from '../../interfaces';
import styles from '../../styles/pokemonCard.module.css';

interface Props {
  pokemonType: Name;
  imgs: string[];
  onClick: () => void;
  name: string;
}

export const BackCard: FC<Props> = ({ pokemonType, imgs, onClick, name }) => {
  return (
    <Card
      className={styles.back}
      style={{
        background: `radial-gradient(circle at 50% 0%,${
          typeColors[pokemonType as keyof typeof typeColors]
        } 36%, #ffffff 36%)`,
      }}
    >
      <Carousel
        stopAutoPlayOnHover={false}
        autoPlay={false}
        animation="slide"
        duration={300}
        indicators={true}
        swipe={true}
        className={styles['card-carousel']}
      >
        {imgs.map((img) => (
          <Image
            key={img}
            className={styles.pokemonImg}
            src={img}
            width={150}
            height={150}
            alt={name}
            onClick={onClick}
          ></Image>
        ))}
      </Carousel>
    </Card>
  );
};
