import React from "react";
import { Story } from "@storybook/react";
import styled from "styled-components";
import Input, { Props } from "./Input";
import { ReactComponent as SearchIcon } from "icons/search.svg";
import { ReactComponent as SettingsIcon } from "icons/settings.svg";

export default {
  component: Input,
  title: "Components/Input",
};

const StyledSettingsIcon = styled(SettingsIcon)`
  fill: ${({ theme }) => theme.text.secondary};
`;

const Template: Story<Props> = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const Search = Template.bind({});
Search.args = {
  inputProps: { type: "password", placeholder: "Password" },
  inner: true,
  leftIcon: <SearchIcon />,
  rightIcon: <StyledSettingsIcon />,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  error: true,
};
