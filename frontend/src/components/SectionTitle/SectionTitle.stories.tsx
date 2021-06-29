import React from "react";
import { Story } from "@storybook/react";

import SectionTitle, { Props as StoryProps } from "./SectionTitle";

export default {
  component: SectionTitle,
  title: "Components/SectionTitle",
};
const Template: Story<StoryProps> = (args) => (
  <SectionTitle {...args}>Example section title</SectionTitle>
);

export const Small = Template.bind({});
Small.args = { size: "small" };

export const UppercasedBold = Template.bind({});
UppercasedBold.args = { uppercase: true, bold: true };
