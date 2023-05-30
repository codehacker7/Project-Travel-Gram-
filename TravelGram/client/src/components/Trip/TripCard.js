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

import './TripCard.css';

export default function TripCard(props) {
  const useStyles = makeStyles((theme) => ({
    oppositeContent: {
      flex: 0.05,
    },
    paper: {
      padding: '6px 16px',
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      border: 0,
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(13, 59, 95, .3)',
      color: 'white',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    timeline_part: {
      background: '#2196F3',
    },
  }));

  const style = useStyles();

  return (
    <Draggable
      key={props.card.name}
      draggableId={props.card.name}
      index={props.index}>
      {(provided) => (
        <TimelineItem
          className="timeline-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <TimelineOppositeContent className={style.oppositeContent}>
            <Typography variant="body2" color="textSecondary">
              {props.card.time.toString()}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className={style.timeline_part} />
            <TimelineConnector className={style.timeline_part} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper
              elevation={10}
              className={style.paper}
              onClick={(e) => {
                props.openPopup(props.card);
              }}>
              <Typography variant="h6" component="h1">
                {props.card.name}
              </Typography>
              {props.description == '' ? null : (
                <Typography className="cardDescription">
                  {props.card.description}
                </Typography>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      )}
    </Draggable>
  );
}
