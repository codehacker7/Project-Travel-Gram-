import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';

const TripItemTag = ({ id, icon, color, isSelected, onClick }) => {
  return (
    <Chip
      icon={icon}
      label={id}
      clickable
      onClick={() => onClick(id)}
      style={{
        margin: '4px',
        padding: '2px',
        backgroundColor: isSelected && color,
        color: isSelected ? 'black' : 'white',
      }}
      variant={!isSelected ? 'default' : 'outlined'}
    />
  );
};

const TripItemTagList = ({ items, selectedItem, onSelect, onRemove }) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {Object.values(items).map(({ id, icon, color }) => (
        <TripItemTag
          key={id}
          id={id}
          icon={icon}
          color={color}
          isSelected={id === selectedItem}
          onClick={id === selectedItem ? onRemove : onSelect}
        />
      ))}
    </Box>
  );
};

export default TripItemTagList;
