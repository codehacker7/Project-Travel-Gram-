import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CreateForm from '../../components/CreateForm/CreateForm';

const useStyles = makeStyles((theme) => ({
  popupContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
}));

const CreateTemplatePopup = ({ onSuccess, onError, onClose }) => {
  const [ showForm, setShowForm ] = useState(true);
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ showError, setShowError ] = useState(false);
  const [ showInfo, setShowInfo ] = useState(true);
  const [ formMessage, setFormMessage ] = useState('');

  const classes = useStyles();

  const handleSuccess = (data) => {
    setShowInfo(false);
    setFormMessage(`Success: ${data.title} is created!`);
    setShowSuccess(true);
    const timer = setTimeout(() => {
      setShowForm(false);
      setShowSuccess(false);
      clearTimeout(timer);
      onSuccess(data);
    }, 3000);
  };

  const handleError = (data) => {
    setShowInfo(false);
    setFormMessage(`Error: ${data.title} could not be created!`);
    setShowError(true);
    const timer = setTimeout(() => {
      setShowForm(false);
      setShowError(false);
      clearTimeout(timer);
    }, 3000);
    onError(data);
  };

  return (
    <Box className={classes.popupContainer}>
      {showInfo && (
        <Alert severity="info">
          We are pre-populating your trip with activities
        </Alert>
      )}
      {showSuccess && <Alert variant="outlined" severity="success">{formMessage}</Alert>}
      {showError && <Alert variant="outlined" severity="error">{formMessage}</Alert>}
      {showForm && (
        <CreateForm
          formType="trip"
          onSuccess={handleSuccess}
          onError={handleError}
          onClose={onClose}
          tripId={null}
        />
      )}
    </Box>
  );
};

export default CreateTemplatePopup;
