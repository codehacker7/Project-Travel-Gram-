import React from 'react';
import TripItemTagList from './TripItemTagList';
import TripItems from './TripItems';

export default {
  title: 'Components/TripItemTagList',
  component: TripItemTagList,
};

const Template = () => (
  <TripItemTagList
    items={TripItems}
    selectedItem={null}
    onSelect={null}
    onRemove={null}
  />
);

export const Default = Template.bind({});
