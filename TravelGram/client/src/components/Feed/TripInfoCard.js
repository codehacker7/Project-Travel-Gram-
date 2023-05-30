import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Card,
  Button,
  Box,
  CardMedia,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserList from '../CreateForm/helpers/UserList';
import theme from '../../theme';

const useStyles = makeStyles({
  card: {
    padding: theme.defaults.padding,
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
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  cardMedia: {
    height: '100px',
    borderRadius: '15px',
    width: 'auto',
    padding: '10px',
  },
});

const TripInfoCard = ({ trip }) => {
  const classes = useStyles();
  const startDate = new Date(trip.startTime).toLocaleDateString();
  const endDate = new Date(trip.endTime).toLocaleDateString();
  let history = useHistory();
  let cardImageIndex;
  if (trip.images && trip.images.length) {
    cardImageIndex = Math.floor(Math.random() * (trip.images.length - 1));
  }
  return (
    <Card className={classes.card}>
      <Typography gutterBottom variant="h5" component="h2">
        <Box fontSize="1.5em" margin="2%">
          {trip.title.toUpperCase()}
        </Box>
      </Typography>
      <Typography color="textSecondary">
        <Box fontSize="1em" margin="2%">
          {startDate} - {endDate}
        </Box>
      </Typography>
      {trip.images.length > 0 && (
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={trip.images[cardImageIndex]}
        />
      )}
      {trip.collaborators.length > 0 && (
        <UserList usernames={trip.collaborators} onUserRemoved={null} />
      )}
      <CardActions>
        <Button
          onClick={() =>
            history.push({ pathname: `/trip/view/${trip.id}`, state: trip.id })
          }>
          <Box fontSize="1.5em">
            View Trip
          </Box>
        </Button>
      </CardActions>
    </Card>
  );
};

export default TripInfoCard;
