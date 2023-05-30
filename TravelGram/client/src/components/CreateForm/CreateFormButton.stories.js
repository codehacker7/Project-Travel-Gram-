import React from 'react';
import CreateFormButton from './CreateFormButton';

export default {
  title: 'Components/CreateFormButton',
  component: CreateFormButton,
};

const Template = (args) => <CreateFormButton {...args} />;

const onSuccess = () => {
  console.log('success!');
};

export const CreateTripButton = Template.bind({});
CreateTripButton.args = { formType: 'trip', onSuccess: onSuccess };

export const CreateTripItemButton = Template.bind({});
CreateTripItemButton.args = { formType: 'tripitem', onSuccess: onSuccess };
