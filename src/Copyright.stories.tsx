import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Copyright from './Copyright';

export default {
  title: "MyApp/Copyright",
  component: Copyright,
} as ComponentMeta<typeof Copyright>;

const Template: ComponentStory<typeof Copyright> = () => <Copyright />;

export const Ordinary = Template.bind({});
