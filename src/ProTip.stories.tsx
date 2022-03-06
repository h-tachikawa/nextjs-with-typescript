import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProTip from './ProTip';

export default {
  title: "MyApp/ProTip",
  component: ProTip,
} as ComponentMeta<typeof ProTip>;

const Template: ComponentStory<typeof ProTip> = () => <ProTip />;

export const Ordinary = Template.bind({});
