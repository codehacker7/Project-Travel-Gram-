import React from 'react';
import { Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import TripInfoCard from './TripInfoCard';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import Masonry from 'react-masonry-css';
import './TempFeedStyle.css';

const useStyles = makeStyles({
  feedRoot: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  grid: {
    width: '100%',
  },
  test: {
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
  pagination: {
    marginBottom: '1%',
  },
});

const Feed = ({ trips, count, page, onPageChange }) => {
  const classes = useStyles();

  const breakpoints = {
    default: 3,
    1000: 2,
    500: 1
  }

  return (
    <Box className={classes.feedRoot}>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {trips.map((trip) => (
          <div>
            <TripInfoCard trip={trip} />
          </div>
        ))}
      </Masonry>
      {trips.length && (
        <Box className={classes.pagination}>
          <Pagination count={count} page={page} onChange={onPageChange} />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
