import React from 'react';
import CreateForm from './CreateForm';

export default {
  title: 'Components/CreateForm',
  component: CreateForm,
};

const Template = (args) => <CreateForm {...args} />;

export const CreateTrip = Template.bind({});
CreateTrip.args = { formType: 'trip' };

export const CreateTripItem = Template.bind({});
CreateTripItem.args = { formType: 'tripitem' };
