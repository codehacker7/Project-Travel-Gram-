import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, TextField, FormControlLabel, Checkbox, makeStyles, Typography } from '@material-ui/core';
import theme from '../../theme';

export default function AuthForm({ buttonText, fields, onChange, onSubmit }) {

  const [ showPassword, toggleShowPassword ] = useState(false);

  const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      background: 'linear-gradient(160deg, ' + theme.palette.primary.main + ' 30%, ' + theme.palette.secondary.main + ')',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      alignSelf: 'center',
      fontWeight: 900,
      fontSize: 32,
      marginBottom: '5%'
    },
    input: {
      width: '100%',
      marginBottom: '5%',
    },
    showpw: {
      color: showPassword ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.7)',
      alignSelf: 'center',
      marginBottom: '5%',
    },
    showbox: {
    },
    submitButton: {
      padding: '1% 0%',
      fontSize: '1.5em',
      color: theme.palette.black,
      background: 'linear-gradient(160deg, ' + theme.palette.primary.main + ', ' + theme.palette.secondary.main + ')',
      '&:hover': {
        color: theme.palette.white,
        background: 'linear-gradient(160deg, ' + theme.palette.primary.dark + ', ' + theme.palette.secondary.dark + ')'
      }
    }
  });

  const classes = useStyles();

  return (
    <form className={classes.root}
      onSubmit={e => {
        e.preventDefault();
        if (e.key === 'Enter') {
          onSubmit();
        }
      }}
      noValidate
      autoComplete="off">
      <Typography className={classes.title}>
        <Box letterSpacing={theme.defaults.letterSpacing}>
          TRAVELGRAM
        </Box>
      </Typography>
      {Object.keys(fields).map(key => {
        const isPassword = key.toLowerCase().includes('password');
        return (
          <TextField
            className={classes.input}
            id={key} name={key} required
            type={isPassword && !showPassword ? 'password' : 'text'}
            onChange={e => onChange({ [ key ]: e.target.value })}
            variant="outlined"
            color="primary"
            label={key}
          />
        )
      })}
      <div className={classes.showpw}>
        <FormControlLabel
          control={
            <Checkbox
              className={classes.showbox}
              checked={showPassword} color="primary"
              onChange={() => toggleShowPassword(!showPassword)}
            />
          }
          label="Show password"
        />
      </div>
      <Button className={classes.submitButton}
        onClick={() => onSubmit()} fullWidth>
        {buttonText}
      </Button>
    </form>
  );
}

AuthForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
