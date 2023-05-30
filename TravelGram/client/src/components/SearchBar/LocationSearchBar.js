import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

const LocationSearchBar = ({ address, onLocationChange, onLocationSelect }) => {
  const classes = useStyles();

  const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[ 0 ]);
    onLocationSelect(selectedAddress, latLng);
  };

  return (
    <Box className={classes.container}>
      <PlacesAutocomplete
        value={address}
        onChange={onLocationChange}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <FormControl variant="outlined">
              <InputLabel htmlFor="search-bar">Location</InputLabel>
              <OutlinedInput
                id="search-bar-input"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="location-icon"
                      onClick={null}
                      onMouseDown={null}
                      edge="end">
                      <LocationOnIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={60}
                {...getInputProps({
                  placeholder: 'Type address',
                })}></OutlinedInput>
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor:
                      'linear-gradient(160deg, ' +
                      '#85C4FF' +
                      ', ' +
                      '#B8FF99' +
                      ')',
                    cursor: 'pointer',
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </FormControl>
          );
        }}
      </PlacesAutocomplete>
    </Box>
  );
};

export default LocationSearchBar;
