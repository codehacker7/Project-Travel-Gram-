import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripSearchBar from '../../components/SearchBar/TripSearchBar';
import Feed from '../../components/Feed/Feed';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import CreateFormButton from '../../components/CreateForm/CreateFormButton';

const useStyles = makeStyles({
  dashRoot: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background,
  },
  actionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  searchBar: {
    flexGrow: 5,
    margin: '24px',
  },
  newTripButton: {
    flexGrow: 1,
    margin: '24px 24px 24px 0px',
  },
});

const Dashboard = () => {
  const [ trips, setTrips ] = useState([]);
  const [ searchTitle, setSearchTitle ] = useState('');
  const [ page, setPage ] = useState(1);
  const [ pageCount, setPageCount ] = useState(0);
  const [ pageSize, setPageSize ] = useState(12);
  const [ tripUpdate, setTripUpdate ] = useState({});
  const [ showSearchBar, setShowSearchBar ] = useState(true);

  const classes = useStyles();

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  const handleSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleTripFormButtonClick = (shown) => {
    setShowSearchBar(!shown);
  };

  useEffect(() => {
    axios
      .get('/trip', {
        params: { page, pageSize, searchTitle },
      })
      .then(
        (res) => {
          console.log('got data from backend: ');
          console.log(res.data);
          const { trips, pageCount } = res.data;
          setTrips(trips);
          setPageCount(pageCount);
        },
        (err) => {
          console.log('error: ');
          console.log(err);
        }
      );
  }, [ page, pageSize, searchTitle, tripUpdate ]);

  const handleSubmit = (data) => {
    setTripUpdate(data);
  };

  return (
    <div className={classes.dashRoot}>
      <Box className={classes.actionContainer}>
        {showSearchBar && (
          <Box className={classes.searchBar}>
            <TripSearchBar
              onInputChange={handleSearchTitle}
              searchInput={searchTitle}
            />
          </Box>
        )}

        <Box className={classes.newTripButton}>
          <CreateFormButton
            formType="trip"
            onSuccess={handleSubmit}
            tripId={null}
            onClick={handleTripFormButtonClick}
          />
        </Box>
      </Box>
      <Feed
        trips={trips}
        count={pageCount}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
