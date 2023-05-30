import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import { Button, Card, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20% auto',
  },
});

export default function AuthScreen() {
  const [ state, setState ] = useState('home');
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {
        state === 'home' ? <Home onClick={(e) => setState(e)} /> :
          (state === 'login' ? <Login /> : <Register />)
      }
    </Card>
  );
}

function Home({ onClick }) {
  return (
    <CardActions>
      <Button onClick={() => onClick('login')}>Login</Button>
      <Button onClick={() => onClick('register')}>Register</Button>
    </CardActions>
  );
}
