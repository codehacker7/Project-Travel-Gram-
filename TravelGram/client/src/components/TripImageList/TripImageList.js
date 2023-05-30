import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  makeStyles,
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  imageListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    margin: '20px auto',
    width: '80%',
    padding: '16px',
    position: 'relative',
  },
  cardContainer: {
    maxWidth: '200px',
    margin: '10px',
    position: 'relative',
  },
  media: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    position: 'absolute',
    top: '1px',
    right: '1px',
    padding: '0px',
  },
});

const TripImageList = ({ images, onRemove, isOwner }) => {
  const classes = useStyles();

  return (
    <Box className={classes.imageListContainer}>
      {images.map((img, i) => {
        return (
          <Card className={classes.cardContainer} key={i}>
            {isOwner && <IconButton
              className={classes.icon}
              aria-label="remove picture"
              component="span"
              onClick={isOwner ? () => onRemove(img) : null}>
              <CloseIcon />
            </IconButton>}
            <CardMedia className={classes.media} component="img" image={img} />
          </Card>
        );
      })}
    </Box>
  );
};

export default TripImageList;
