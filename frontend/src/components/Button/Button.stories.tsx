import React from "react";
import Button from "./Button";

export default {
  component: Button,
  title: "Components/Button",
};

export const Default = () => <Button>Button</Button>;

export const Primary = () => <Button variant="primary">Button</Button>;
