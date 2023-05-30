import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  form: {
    width: '0',
    minWidth: '100%'
  },
  input: {
    padding: 0,
  }
});

const TripSearchBar = ({ searchInput, onInputChange }) => {

  const classes = useStyles();

  return (
    <FormControl className={classes.form}>
      <OutlinedInput className={classes.input}
        id="search-bar-input"
        value={searchInput}
        placeholder="Search..."
        onChange={onInputChange}
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              aria-label="search-icon"
              onClick={null}
              onMouseDown={null}
              edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default TripSearchBar;
