import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

const UserSearchBar = ({
  searchInput,
  onInputChange,
  searchResults,
  onResultChosen,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="search-bar">Username</InputLabel>
        <OutlinedInput
          id="search-bar-input"
          value={searchInput}
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
          labelWidth={60}
        />
      </FormControl>
      {searchResults.length > 0 && (
        <Select
          multiple
          native
          onChange={onResultChosen}
          inputProps={{
            id: 'select-results',
          }}>
          {searchResults.map((searchedUser) => (
            <option key={searchedUser.username} value={searchedUser.username}>
              {searchedUser.username}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default UserSearchBar;
