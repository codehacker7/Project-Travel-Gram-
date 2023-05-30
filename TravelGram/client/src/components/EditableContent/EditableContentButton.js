import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Button, Paper, TextField } from '@material-ui/core';
import Expand from 'react-expand-animated';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '20px 20px',
    width: '500px',
  },
  form: {
    padding: '16px',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: '2px',
    right: '10px',
    padding: '0px',
  },
  button: {
    width: '100%',
    minWidth: '250px',
    height: '100%',
    color: theme.palette.black,
    background: 'linear-gradient(160deg, ' + theme.palette.primary.main + ', ' + theme.palette.secondary.main + ')',
    '&:hover': {
      color: theme.palette.white,
      background: 'linear-gradient(160deg, ' + theme.palette.primary.dark + ', ' + theme.palette.secondary.dark + ')'
    }
  },
}));

const EditableContentButton = ({
  buttonName,
  content,
  readOnly,
  onClick,
  tripId,
  onEdit,
}) => {
  const [showContent, setShowContent] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(content);
  }, [content]);

  const toggleShowContent = () => {
    onClick(!showContent);
    setShowContent((showContent) => !showContent);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleEdit = async () => {
    try {
      const res = await axios.patch(`/trip/${tripId}`, {
        description: value,
      });
      onEdit(res.data);
    } catch (err) {
      const errorMsg = err.response.data;
    }
    toggleShowContent();
  };

  return (
    <Box
      style={{
        margin: '1.5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!showContent && (
        <Button className={classes.button}
          variant="contained"
          onClick={toggleShowContent}>
          {buttonName}
        </Button>
      )}
      {showContent && (
        <Expand open={showContent} duration={400}>
          <Box className={classes.container}>
            <Paper className={classes.form}>
              <IconButton
                className={classes.closeIcon}
                aria-label="close content"
                component="span"
                onClick={readOnly ? toggleShowContent : handleEdit}>
                <CloseIcon />
              </IconButton>
              <TextField
                type="text"
                label={buttonName}
                inputProps={{ readOnly }}
                fullWidth
                value={value}
                onChange={handleChange}
              />
            </Paper>
          </Box>
        </Expand>
      )}
    </Box>
  );
};

export default EditableContentButton;
