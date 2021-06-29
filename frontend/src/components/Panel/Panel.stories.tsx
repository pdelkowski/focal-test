import React from "react";
import Button from "../Button";
import SectionTitle from "../SectionTitle";
import Panel from "./Panel";

export default {
  component: Panel,
  title: "Components/Panel",
};

export const Default = () => (
  <Panel>
    <SectionTitle>Panel title</SectionTitle>
    <div>
      <Button>Button</Button>
    </div>
  </Panel>
);
