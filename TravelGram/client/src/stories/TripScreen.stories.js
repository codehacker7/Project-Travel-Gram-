import React from 'react';
import TripScreen from '../screens/TripScreen';

export default {
  title: 'TripScreen',
  component: TripScreen
};

const Template = args => <TripScreen {...args} />;

export const Default = Template.bind({});