import React from 'react';
import TripCard from './TripCard';

export default {
  title: 'Components/TripCard',
  component: TripCard,
};

const Template = (args) => <TripCard {...args} />;

export const Default = Template.bind({});
