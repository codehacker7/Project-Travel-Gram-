import React from 'react';
import AuthScreen from '../screens/AuthScreen';

export default {
  title: 'AuthScreen',
  component: AuthScreen,
};

const Template = args => <AuthScreen {...args} />;

export const Default = Template.bind({});