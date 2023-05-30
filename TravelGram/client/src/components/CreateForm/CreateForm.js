import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputAdornment,
  Paper,
  FormControl,
  OutlinedInput,
  Box,
  IconButton,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import 'date-fns';
import ImageIcon from '@material-ui/icons/Image';
import ImageList from './helpers/ImageList';
import UserList from './helpers/UserList';
import UserSearchBar from '../SearchBar/UserSearchBar';
import LocationSearchBar from '../SearchBar/LocationSearchBar';
import TripItemTagList from './helpers/TripItemTagList';
import TripItems from './helpers/TripItems';
import axios from 'axios';
import { storeImages } from '../../services/storage';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

const maxTitleChars = 30;
const maxDescrChars = 300;

const useStyles = makeStyles((theme) => ({
  popupbg: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  tripContainer: {
    maxWidth: '80%',
    margin: '20px auto',
    backgroundColor: theme.palette.background,
  },
  itemContainer: {
    maxWidth: '80%',
    margin: '20px auto',
  },
  form: {
    padding: '16px',
    position: 'relative',
  },
  formControl: {
    margin: '5px auto',
    variant: 'outlined',
  },
  popupContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    overflowY: 'scroll',
  },
  button: {
    color: theme.palette.black,
    background:
      'linear-gradient(160deg, ' +
      theme.palette.primary.main +
      ', ' +
      theme.palette.secondary.main +
      ')',
    '&:hover': {
      color: theme.palette.white,
      background:
        'linear-gradient(160deg, ' +
        theme.palette.primary.dark +
        ', ' +
        theme.palette.secondary.dark +
        ')',
    },
  },
  cancelButton: {
    color: theme.palette.black,
    background: '#fa345f',
    '&:hover': {
      color: theme.palette.white,
      background: '#80162d',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const initializeStartEndTime = () => {
  const current = new Date();
  const startEndTime =
    current.getFullYear() +
    '-' +
    ('0' + current.getMonth()).slice(-2) +
    '-' +
    ('0' + current.getDate()).slice(-2) +
    'T' +
    ('0' + current.getHours()).slice(-2) +
    ':' +
    ('0' + current.getMinutes()).slice(-2);
  return startEndTime;
};

const initialTime = initializeStartEndTime();

const CreateForm = ({ formType, onSuccess, onError, onClose, tripId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleChars, setTitleChars] = useState(maxTitleChars);
  const [descrChars, setDescrChars] = useState(maxDescrChars);
  const [startTime, setStartTime] = useState(initialTime);
  const [endTime, setEndTime] = useState(initialTime);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: 47.444,
    lng: -122.176,
  });
  const [selectedTripItem, setSelectedTripItem] = useState('');
  const [users, setUsers] = useState([]);
  const [showActivityWarning, setShowActivityWarning] = useState(false);
  const [collaboratorsError, setCollaboratorsError] = useState('');

  const classes = useStyles();

  const currentUser = useSelector((state) => state.get('auth').user).username;

  useEffect(() => {
    axios.get('/user').then(
      (res) => {
        const users = res.data;
        setUsers(users);
      },
      (err) => {
        const errorMsg = err.response.data;
        setCollaboratorsError(errorMsg);
      }
    );
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'tripitem' && !selectedTripItem) {
      setShowActivityWarning(true);
      return;
    }
    const images = await storeImages(selectedFiles);
    const data = {
      title,
      description,
      startTime,
      endTime,
      images,
      ...(formType === 'trip' && { owner: currentUser }),
      ...(formType === 'trip' && { collaborators: selectedUsers }),
      ...(formType === 'trip' && { activities: [] }),
      ...(formType === 'tripitem' && { address }),
      ...(formType === 'tripitem' && { coordinates }),
      ...(formType === 'tripitem' && { selectedTripItem }),
    };
    console.log(data);
    const url = formType === 'trip' ? `/trip` : `/trip/${tripId}/activity`;
    try {
      const res = await axios.post(url, data);
      onSuccess(res.data);
    } catch (err) {
      const errorMsg = err.response.data;
      onError(errorMsg);
    }
  };

  const handleClosed = () => {
    setShowForm(false);
    onClose();
  };

  const checkTitle = (val) => {
    setTitle(val);
    setTitleChars(maxTitleChars - val.length);
  };

  const checkDescription = (val) => {
    setDescription(val);
    setDescrChars(maxDescrChars - val.length);
  };

  const handleFileSelected = async (e) => {
    const fileArray = Array.from(e.target.files ?? []);
    setSelectedFiles((selectedFiles) => [...selectedFiles, ...fileArray]);
  };

  const handleFileRemoved = (fileToRemove) => {
    setSelectedFiles((files) => files.filter((file) => file !== fileToRemove));
  };

  const toggleSearchBar = () => {
    setShowSearchBar((modal) => !modal);
  };

  const handleUserSearchInput = async (e) => {
    const searchTerm = e.target.value;
    setUserSearchInput(searchTerm);
    if (searchTerm) {
      const newUserSearchResults = users.filter((user) => {
        const userInfo = user.username.concat(' ', user.email);
        return userInfo.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setUserSearchResults(newUserSearchResults);
    } else {
      setUserSearchResults([]);
    }
  };

  const handleUserChosen = (e) => {
    const chosenUser = e.target.value;
    if (!selectedUsers.includes(chosenUser)) {
      setSelectedUsers((selectedUsers) => [...selectedUsers, chosenUser]);
    }
  };

  const handleUserRemoved = (removedUser) => {
    setSelectedUsers((selectedUsers) =>
      selectedUsers.filter((user) => user !== removedUser)
    );
  };

  const handleLocationSelect = async (selectedAddress, latLng) => {
    setAddress(selectedAddress);
    setCoordinates(latLng);
  };

  return (
    <div
      className={
        formType === 'trip'
          ? classes.tripContainer
          : formType === 'tripitem'
          ? classes.itemContainer
          : ''
      }>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <Paper className={classes.form}>
            <FormControl fullWidth className={classes.formControl}>
              <OutlinedInput
                id="title"
                value={title}
                inputProps={{
                  maxLength: maxTitleChars,
                }}
                required
                onChange={(e) => checkTitle(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    {titleChars}/{maxTitleChars}
                  </InputAdornment>
                }
                placeholder="Title"
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <OutlinedInput
                id="description"
                value={description}
                inputProps={{
                  maxLength: maxDescrChars,
                }}
                required
                multiline={true}
                rows={6}
                onChange={(e) => checkDescription(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    {descrChars}/{maxDescrChars}
                  </InputAdornment>
                }
                placeholder="Description"
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <Box display="flex" justifyContent="space-evenly">
                <TextField
                  id="datetime-local-start"
                  label="Start Time"
                  type="datetime-local"
                  defaultValue={startTime}
                  style={{ margin: '10px' }}
                  onChange={(time) =>
                    setStartTime(time.nativeEvent.target.value)
                  }
                />
                <TextField
                  id="datetime-local-end"
                  label="End Time"
                  type="datetime-local"
                  defaultValue={endTime}
                  style={{ margin: '10px' }}
                  onChange={(time) => setEndTime(time.nativeEvent.target.value)}
                />
              </Box>
            </FormControl>

            {formType === 'tripitem' ? (
              <Box>
                {showActivityWarning && (
                  <Alert variant="outlined" severity="warning">
                    Please choose an activity type!
                  </Alert>
                )}
                <TripItemTagList
                  items={TripItems}
                  selectedItem={selectedTripItem}
                  onSelect={(id) => {
                    setSelectedTripItem(id);
                    setShowActivityWarning(false);
                  }}
                  onRemove={() => setSelectedTripItem()}
                />
              </Box>
            ) : null}

            {selectedFiles.length > 0 ? (
              <ImageList images={selectedFiles} onRemove={handleFileRemoved} />
            ) : null}

            <FormControl fullWidth className={classes.formControl}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    multiple
                    onChange={handleFileSelected}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton aria-label="add attachments" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                </Box>
                <Button variant="contained" onClick={toggleSearchBar}>
                  {showSearchBar
                    ? 'Hide Search Bar'
                    : formType === 'trip'
                    ? 'Search Collaborators!'
                    : formType === 'tripitem'
                    ? 'Search Location!'
                    : ''}
                </Button>
              </Box>
            </FormControl>

            <FormControl className={classes.formControl}>
              {selectedUsers.length > 0 && (
                <Typography>Click to Remove</Typography>
              )}
              {selectedUsers.length > 0 && (
                <UserList
                  usernames={selectedUsers}
                  onUserRemoved={handleUserRemoved}
                />
              )}
            </FormControl>

            {showSearchBar &&
              (formType === 'trip' ? (
                <Box>
                  {collaboratorsError && (
                    <Alert variant="outlined" severity="warning">{collaboratorsError}</Alert>
                  )}
                  <UserSearchBar
                    searchInput={userSearchInput}
                    onInputChange={handleUserSearchInput}
                    searchResults={userSearchResults}
                    onResultChosen={handleUserChosen}
                  />
                </Box>
              ) : formType === 'tripitem' ? (
                <LocationSearchBar
                  address={address}
                  onLocationChange={setAddress}
                  onLocationSelect={handleLocationSelect}
                />
              ) : null)}

            <div className={classes.buttonContainer}>
              <FormControl className={classes.formControl}>
                <Button
                  fullWidth
                  className={classes.button}
                  variant="contained"
                  type="submit">
                  {formType === 'trip'
                    ? 'Create Trip!'
                    : formType === 'tripitem'
                    ? 'Create Trip Item!'
                    : ''}
                </Button>
              </FormControl>

              <FormControl className={classes.formControl}>
                <Button
                  className={classes.cancelButton}
                  variant="contained"
                  onClick={handleClosed}>
                  Cancel
                </Button>
              </FormControl>
            </div>
          </Paper>
        </form>
      )}
    </div>
  );
};

export default CreateForm;
