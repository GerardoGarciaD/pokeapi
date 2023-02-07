import React, { FC, SyntheticEvent } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Autocomplete,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { PokemonV2Pokemon, pokemonTypes } from '../../interfaces';

interface Props {
  pokemonType: string;
  handleChange: (event: SelectChangeEvent) => void;
  handleChangeName: (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  pokemonsfiltered: PokemonV2Pokemon[];
}

export const PokemonFilters: FC<Props> = ({
  pokemonType,
  handleChange,
  handleChangeName,
  pokemonsfiltered,
}) => {
  return (
    <>
      <FormControl sx={{ mb: 4, width: 300 }}>
        <InputLabel id="typeSelectLabel">Type</InputLabel>
        <Select
          labelId="typeSelectLabel"
          id="demo-simple-select"
          value={pokemonType}
          label="Filter By Type"
          onChange={handleChange}
        >
          <MenuItem value={''}>
            <ListItemText primary={'All'} />
          </MenuItem>
          {pokemonTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <ListItemText
                style={{ textTransform: 'capitalize' }}
                primary={type}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Autocomplete
        disablePortal
        id="searchPokemonName"
        onInputChange={(event, value) => handleChangeName(event, value)}
        options={pokemonsfiltered}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search by name" />
        )}
      />
    </>
  );
};
