import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineDot from '@material-ui/lab/TimelineDot';

import './DraggableCard.css';

const DraggableCard = ({
  index,
  title,
  description,
  startTime,
  selected,
  disabled,
}) => {
  const useStyles = makeStyles((theme) => ({
    oppositeContent: {
      flex: 0.05,
    },
    paper: {
      padding: '6px 16px',
      background: theme.palette.background,
      border: 0,
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(13, 59, 95, .3)',
      color: 'white',
    },
    selectedPaper: {
      padding: '6px 16px',
      background: 'linear-gradient(45deg, #01c1f3 30%, #0395d6 90%)',
      border: 0,
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(13, 59, 95, .3)',
      color: 'black',
    },
    secondaryTail: {
      backgroundColor: theme.palette.background,
    },
    timeline_part: {
      background: theme.palette.background,
    },
  }));

  const style = useStyles();
  return (
    <Draggable
      key={title}
      draggableId={title}
      index={index}
      isDragDisabled={disabled}>
      {(provided) => (
        <TimelineItem
          className="timeline-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <TimelineOppositeContent className={style.oppositeContent}>
            <Typography variant="body2" color="textSecondary">
              {startTime}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className={style.timeline_part} />
            <TimelineConnector className={style.timeline_part} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper
              elevation={10}
              className={selected ? style.selectedPaper : style.paper}>
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
              {description == '' ? null : (
                <Typography className="cardDescription">
                  {description}
                </Typography>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      )}
    </Draggable>
  );
};

export default DraggableCard;
