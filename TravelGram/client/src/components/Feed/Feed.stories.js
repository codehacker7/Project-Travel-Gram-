import React from 'react';
import Feed from './Feed';

export default {
  title: 'Components/Feed',
  component: Feed,
};

const Template = (args) => <Feed {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.args = {
  trips: [
    {
      title: 'test title',
      description: 'test description',
      startTime: '2021-05-27T13:02',
      endTime: '2021-05-27T13:02',
      selectedUsers: ['anguilla', 'antarctica'],
    },
  ],
  count: 1,
  page: 1,
  onPageChange: () => console.log('page change!'),
};
