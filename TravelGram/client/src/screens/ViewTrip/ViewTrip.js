// Package imports
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import SplitPane from 'react-split-pane';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Component Imports
import Map from '../../components/TripMap/Map';
import CreateFormButton from '../../components/CreateForm/CreateFormButton';
import DraggableSchedule from './DraggableSchedule';
import TripImageListButton from '../../components/TripImageList/TripImageListButton';
import EditableContentButton from '../../components/EditableContent/EditableContentButton';
import CreateTemplatePopup from './CreateTemplatePopup';
import { Alert } from '@material-ui/lab';
import theme from '../../theme';
import { useSelector } from 'react-redux';

// Styling Imports
import './Resizer.css';

const useStyles = makeStyles({
  leftPanel: {
    color: 'white',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    background:
      'radial-gradient(at top left, ' +
      theme.palette.primary.dark +
      ', transparent 60%), ' +
      'radial-gradient(at top right, ' +
      theme.palette.primary.main +
      ', transparent 70%), ' +
      'radial-gradient(at bottom left, ' +
      theme.palette.secondary.main +
      ', transparent 70%), ' +
      'radial-gradient(at bottom right, ' +
      theme.palette.secondary.dark +
      ', transparent 90%)',
  },
  rightPanel: {
    maxHeight: '500px !important',
    width: '100%',
  },
  popupOuter: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  popupInner: {
    width: '90%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    margin: '20px',
  },
  alertBox: {
    margin: '5px 20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background,
  },
  buttonContainer2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
  },
});

const defaultCenter = {
  lat: 49.28273,
  lng: -123.120735,
};

const ViewTripPage = (props) => {
  let history = useHistory();
  // Component Hooks
  const [ center, setCenter ] = useState({});

  const tripId = props.location.state;
  const [ trip, setTrip ] = useState({});
  const currentUser = useSelector((state) => state.get('auth').user).username;
  const [ isOwner, setIsOwner ] = useState(false);

  const [ markers, setMarkers ] = useState([]);
  const [ showActivityPopup, setShowActivityPopup ] = useState(false);
  const [ selectedActivity, setSelectedActivity ] = useState(null);
  const [ activities, setActivities ] = useState([]);
  const [ selectedActivities, setSelectedActivities ] = useState([]);
  const [ showAboutButton, setShowAboutButton ] = useState(true);
  const [ showActivityFormButton, setShowActivityFormButton ] = useState(true);
  const [ showImagesButton, setShowImagesButton ] = useState(true);
  const [ showTemplatePopup, setShowTemplatePopup ] = useState(false);
  const [ activitiesError, setActivitiesError ] = useState('');
  const [ templateError, setTemplateError ] = useState('');
  const [ deleteError, setDeleteError ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ tripUpdate, setTripUpdate ] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const coords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCenter(coords);
          },
          function (error) {
            console.log(`error: ${error.message}`);
            setCenter(defaultCenter);
          }
        );
      }
    };
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const tripInfoRes = await axios.get(`/trip/${tripId}`);
        const tripInfo = tripInfoRes.data;
        setTrip(tripInfo);
        const isOwner =
          tripInfo.owner === currentUser ||
          tripInfo.collaborators.includes(currentUser);
        setIsOwner(isOwner);
        const res = await axios.get(`/trip/${tripId}/activity`);
        const activites = res.data;
        const markers = activites.map((activity) => activity.coordinates);
        setActivities(activites);
        setMarkers(markers);
        setIsLoading(false);
      } catch (err) {
        const errorMsg = err.response.data;
        setActivitiesError(errorMsg);
      }
    };
    getGeolocation();
    fetchActivities();
  }, [ currentUser, tripId, tripUpdate ]);

  // Component Functions
  const togglePopup = (theActivity) => {
    if (showActivityPopup) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(theActivity);
    }
    setShowActivityPopup(!showActivityPopup);
  };

  const handleSubmit = (data) => {
    setActivities((activities) => [ data, ...activities ]);
    setMarkers((markerCoordinates) => [ ...markerCoordinates, data.coordinates ]);
    setCenter(data.coordinates);
  };

  const handleEdit = async (trip) => {
    try {
      const res = await axios.get(`/trip/${tripId}`);
      const newTrip = res.data;
      setTrip(newTrip);
    } catch (err) {
      console.log(err);
    }
    setTripUpdate(trip);
  };

  const handleFileRemoved = async (fileToRemove) => {
    const newImages = trip.images.filter((image) => image !== fileToRemove);
    try {
      const res = await axios.patch(`/trip/${tripId}`, {
        images: newImages,
      });
      const newTrip = res.data;
      setTrip(newTrip);
    } catch (err) {
      console.log('couldnt remove the image!');
    }
  };

  const handleAboutButtonClick = (shown) => {
    setShowActivityFormButton(!shown);
    setShowImagesButton(!shown);
    if (!shown) {
      setShowAboutButton(!shown);
    }
  };

  const handleActivityFormButtonClick = (shown) => {
    setShowAboutButton(!shown);
    setShowImagesButton(!shown);
    if (!shown) {
      setShowActivityFormButton(!shown);
    }
  };

  const handleImageListButtonClick = (shown) => {
    setShowAboutButton(!shown);
    setShowActivityFormButton(!shown);
    if (!shown) {
      setShowImagesButton(!shown);
    }
  };

  const handleMarkerClick = (marker) => {
    const currentSelectedActivites = activities.filter(
      (activity) =>
        activity.coordinates.lat === marker.lat &&
        activity.coordinates.lng === marker.lng
    );
    const isAllSelected = currentSelectedActivites.every((activity) =>
      selectedActivities.includes(activity)
    );
    // if every activity that should be selected is selected
    if (isAllSelected) {
      // remove all from the selected array
      const newSelectedActivities = selectedActivities.filter(
        (activity) => !currentSelectedActivites.includes(activity)
      );
      setSelectedActivities(newSelectedActivities);
    } else {
      // otherwise, add the missing activities from the activites that should be selected to selected activities state
      const newSelectedActivities = [];
      currentSelectedActivites.forEach((activity) => {
        if (!selectedActivities.includes(activity)) {
          newSelectedActivities.push(activity);
        }
      });
      setSelectedActivities((selectedActivities) => [
        ...selectedActivities,
        ...newSelectedActivities,
      ]);
    }
  };

  const handleDeleteTrip = async () => {
    const tripId = trip.id;
    try {
      const res = await axios.delete(`/trip/${tripId}`);
      console.log('successfully deleted trip');
      history.push({ pathname: '/' });
    } catch (err) {
      const errorMsg = err.response.data;
      setDeleteError(errorMsg);
    }
  };

  const handleCreateTemplate = async (data) => {
    setShowTemplatePopup(false);
    const tripId = data.id;
    const activities = { activities: trip.activities };
    try {
      const res = await axios.patch(`/trip/${tripId}/activity`, activities);
      const trip = res.data;
      history.push({ pathname: `/trip/view/${trip.id}`, state: trip.id });
    } catch (err) {
      const errorMsg = err.response.data;
      setTemplateError(errorMsg);
    }
  };

  const mobileAspect = useMediaQuery('(max-width:600px)');

  return (
    <Box>
      <SplitPane
        split={mobileAspect ? 'horizontal' : 'vertical'}
        minSize={!mobileAspect && 400}
        maxSize={!mobileAspect && -400}
        defaultSize={mobileAspect ? '65%' : (parseInt(localStorage.getItem('splitPos'), 10) != null ? parseInt(localStorage.getItem('splitPos'), 10) : 750)}
        onChange={((size) => localStorage.setItem('splitPos', size))}
      >
        <Box className={classes.leftPanel}>
          <Box className={classes.buttonContainer}>
            {showAboutButton && (
              <EditableContentButton
                buttonName={'About this trip'}
                content={trip.description}
                readOnly={!isOwner}
                onClick={handleAboutButtonClick}
                tripId={trip.id}
                onEdit={handleEdit}
              />
            )}

            {showActivityFormButton && isOwner && (
              <CreateFormButton
                formType="tripitem"
                onSuccess={handleSubmit}
                tripId={trip.id}
                onClick={handleActivityFormButtonClick}
              />
            )}

            {showImagesButton && (
              <TripImageListButton
                shownButtonName={'View Images'}
                hiddenButtonName={'Hide Images'}
                images={trip.images}
                onRemove={handleFileRemoved}
                onClick={handleImageListButtonClick}
                isOwner={isOwner}
              />
            )}
          </Box>

          <DraggableSchedule
            cards={activities}
            selectedCards={selectedActivities}
            onDragDrop={setActivities}
            title={trip.title}
            disabled={!isOwner}
          />

          {activitiesError ? (
            <Box className={classes.alertBox}>
              <Alert variant="outlined" severity="error">{activitiesError}</Alert>
            </Box>
          ) : activities.length < 1 && !isLoading ? (
            <Box className={classes.alertBox}>
              <Alert variant="outlined" severity="warning">{'There are no activities!'}</Alert>
            </Box>
          ) : null}

          {templateError && (
            <Box className={classes.alertBox}>
              <Alert variant="outlined" severity="error">{templateError}</Alert>
            </Box>
          )}
          {deleteError && (
            <Box className={classes.alertBox}>
              <Alert variant="outlined" severity="error">{deleteError}</Alert>
            </Box>
          )}
          <Box className={classes.buttonContainer2}>
            <Button
              variant="contained"
              onClick={() => setShowTemplatePopup(true)}
              style={{
                margin: '20px auto',
                backgroundColor: '#4290f5',
              }}>
              {'Use as Template'}
            </Button>

            {isOwner && (
              <Button
                variant="contained"
                onClick={handleDeleteTrip}
                style={{
                  margin: '20px auto',
                  backgroundColor: '#fa345f',
                }}>
                {'Delete Trip'}
              </Button>
            )}
          </Box>
        </Box>

        <Box className={classes.rightPanel}>
          <Map
            coordinates={center}
            markers={markers}
            onMarkerClick={handleMarkerClick}
          />
        </Box>
      </SplitPane>
      {showTemplatePopup && (
        <Box className={classes.popupOuter}>
          <Box className={classes.popupInner}>
            <CreateTemplatePopup
              onSuccess={handleCreateTemplate}
              onError={() => setShowTemplatePopup(false)}
              onClose={() => setShowTemplatePopup(false)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ViewTripPage;
