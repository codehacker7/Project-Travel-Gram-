import React from 'react';
import NavBar from '../components/NavBar/NavBar';

export default {
  title: 'NavBar',
  component: NavBar
};

const Template = args => <NavBar {...args} />;

export const Default = Template.bind({});