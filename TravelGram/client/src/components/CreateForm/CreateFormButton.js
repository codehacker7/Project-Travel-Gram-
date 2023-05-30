import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Expand from 'react-expand-animated';
import CreateForm from './CreateForm';

const useStyles = makeStyles((theme) => ({
  createForm: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formButton: {
    width: '100%',
    minWidth: '250px',
    height: '100%',
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
  formMessage: {
    width: '100%',
  },
}));

const CreateFormButton = ({
  formType,
  onSuccess,
  tripId,
  onClick,
  disabled,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [showButton, setShowButton] = useState(true);

  const classes = useStyles();

  const handleSuccess = (data) => {
    setFormMessage(`Success: ${data.title} is created!`);
    setShowSuccess(true);
    setShowForm(false);
    setShowButton(false);
    onClick(false);
    const timer = setTimeout(() => {
      setShowSuccess(false);
      setShowButton(true);
      clearTimeout(timer);
    }, 2000);
    onSuccess(data);
  };

  const handleError = (errorMsg) => {
    setFormMessage(errorMsg);
    setShowError(true);
    setShowForm(false);
    setShowButton(false);
    onClick(false);
    const timer = setTimeout(() => {
      setShowError(false);
      setShowButton(true);
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <Box className={classes.createForm}>
      {showButton && (
        <Button
          className={classes.formButton}
          variant="contained"
          onClick={() => {
            onClick(true);
            setShowButton(false);
            setShowForm(true);
          }}
          disabled={disabled}>
          {formType === 'trip'
            ? 'Create New Trip'
            : formType === 'tripitem'
              ? 'Add Trip Item'
              : ''}
        </Button>
      )}
      {showSuccess && <Alert variant="outlined" severity="success">{formMessage}</Alert>}
      {showError && <Alert variant="outlined" severity="error">{formMessage}</Alert>}
      {showForm && (
        <Expand open={showForm} duration={400}>
          <CreateForm
            formType={formType}
            onSuccess={handleSuccess}
            onError={handleError}
            onClose={() => {
              onClick(false);
              setShowForm(false);
              setShowButton(true);
            }}
            tripId={tripId}
          />
        </Expand>
      )}
    </Box>
  );
};

export default CreateFormButton;
