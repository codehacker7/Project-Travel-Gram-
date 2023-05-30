import React from 'react';
import TripInfoCard from './TripInfoCard';

export default {
  title: 'Components/TripInfoCard',
  component: TripInfoCard,
};

const Template = (args) => <TripInfoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  trip: {
    title: 'test title',
    description: 'test description',
    startTime: '2021-05-27T13:02',
    endTime: '2021-05-27T13:02',
    selectedUsers: ['anguilla', 'antarctica'],
    images: [
      'https://firebasestorage.googleapis.com/v0/b/travelgram-158fa.appspot.com/o/183dd8d5-0685-4152-b236-e539c954401d.png?alt=media&token=df03341c-2e68-4e0b-90c4-27ad6b2dc64f',
      'https://firebasestorage.googleapis.com/v0/b/travelgram-158fa.appspot.com/o/0e24c0f7-a5dd-48e3-9aba-11594c4c0236.png?alt=media&token=a145ac91-898f-414b-880a-4aab145fa308',
    ],
  },
};
