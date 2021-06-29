import React from "react";
import Input from "components/Input";
import Label from "components/Label";
import Field from "./Field";

export default {
  component: Field,
  title: "Components/Field",
};

export const Default = () => (
  <Field>
    <Label>E-mail</Label>
    <Input inputProps={{ placeholder: "E-mail" }} />
  </Field>
);

export const Multiple = () => (
  <>
    <Field>
      <Label>E-mail</Label>
      <Input inputProps={{ placeholder: "E-mail" }} />
    </Field>
    <Field>
      <Label>Password</Label>
      <Input inputProps={{ type: "password", placeholder: "Password" }} />
    </Field>
  </>
);

export const SmallSpacing = () => (
  <>
    <Field spacing="small">
      <Label>E-mail</Label>
      <Input inputProps={{ placeholder: "E-mail" }} />
    </Field>
    <Field spacing="small">
      <Label>Password</Label>
      <Input
        type="password"
        inputProps={{ type: "password", placeholder: "Password" }}
      />
    </Field>
  </>
);
