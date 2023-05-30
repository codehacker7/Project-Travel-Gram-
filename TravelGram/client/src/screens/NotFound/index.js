import React from 'react';
import { Box, Card, makeStyles, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import theme from '../../theme';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(at top left, ' + theme.palette.primary.dark + ', transparent 60%), ' +
      'radial-gradient(at top right, ' + theme.palette.primary.main + ', transparent 70%), ' +
      'radial-gradient(at bottom left, ' + theme.palette.secondary.main + ', transparent 70%), ' +
      'radial-gradient(at bottom right, ' + theme.palette.secondary.dark + ', transparent 90%)'
  },
  card: {
    margin: '3%',
    minWidth: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
    boxShadow: theme.defaults.boxShadow,
    borderRadius: theme.defaults.borderRadius,
    backgroundColor: theme.palette.background
  },
  title: {
    background: 'linear-gradient(160deg, ' + theme.palette.primary.main + ', ' + theme.palette.secondary.main + ')',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    alignSelf: 'center',
    fontWeight: 900,
    fontSize: '2em',
  },
  button: {
    background:
      'linear-gradient(160deg, ' +
      theme.palette.primary.main +
      ', ' +
      theme.palette.secondary.main +
      ')',
    marginTop: '10%',
    '&:hover': {
      background:
        'linear-gradient(160deg, ' +
        theme.palette.primary.dark +
        ', ' +
        theme.palette.secondary.dark +
        ')',
    },
    padding: 0
  },
  link: {
    color: theme.palette.black,
    textDecoration: 'none',
    padding: '10px',
    '&:hover': {
      color: theme.palette.white
    }
  }
});


const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Typography className={classes.title}>This page does not exist.</Typography>
        <Button className={classes.button}>
          <Link className={classes.link} to="/">Back to Dashboard</Link>
        </Button>
      </Card>
    </Box>
  );
}

export default NotFound;
