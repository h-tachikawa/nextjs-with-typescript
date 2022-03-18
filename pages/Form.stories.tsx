import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Form from "./login";

export default {
  title: "MyApp/Form",
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = () => <Form />;

export const Ordinary = Template.bind({});
