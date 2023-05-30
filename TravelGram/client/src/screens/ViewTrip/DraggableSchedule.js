import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DraggableCard from './DraggableCard';
import './DraggableSchedule.css';

const useStyles = makeStyles({
  title: {
    padding: '15px',
  },
  wrapper: {
    padding: '20px 0',
  },
});

const DraggableSchedule = ({
  cards,
  selectedCards,
  onDragDrop,
  title,
  disabled,
}) => {
  const classes = useStyles();
  function handleDragDrop(result) {
    console.log('handle drag drop');
    const cardList = Array.from(cards);
    const newTime = cardList[ result.destination.index ].time;
    cardList[ result.destination.index ].time =
      cardList[ result.source.index ].time;
    const [ reorderedItem ] = cardList.splice(result.source.index, 1);
    console.log(reorderedItem);
    reorderedItem.time = newTime;
    cardList.splice(result.destination.index, 0, reorderedItem);
    onDragDrop(cardList);
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.title}>
        <Typography variant="h6" className="timeline-header">
          {title}
        </Typography>
      </Box>

      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="timeline">
          {(provided) => (
            <Timeline
              className="timeline"
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {cards.map((card, index) => {
                const isSelected = selectedCards.some(
                  (selectedCard) => selectedCard.id === card.id
                );
                return (
                  <DraggableCard
                    index={index}
                    title={card.title}
                    description={card.description}
                    startTime={card.startTime}
                    selected={isSelected}
                    disabled={disabled}
                  />
                );
              })}
              {provided.placeholder}
            </Timeline>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default DraggableSchedule;
