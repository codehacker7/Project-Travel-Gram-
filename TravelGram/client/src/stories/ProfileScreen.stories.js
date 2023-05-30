import React from 'react';
import EditProfile from '../screens/EditProfile';

export default {
    title: 'ProfileScreen',
    component: EditProfile,
};

const Template = args => <EditProfile {...args} />;

export const Default = Template.bind({});