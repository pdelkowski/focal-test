import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "components/Button";
import Input from "components/Input";
import Field from "components/Field";
import HomeLayout from "components/HomeLayout";
import Label from "components/Label";
import PageTitle from "components/PageTitle";
import Panel from "components/Panel";
import SectionTitle from "components/SectionTitle";
import { useAuth } from "contexts/Auth";
import { emailValidationPattern } from "common/validationPatterns";
import { useAlert } from 'react-alert'


type Inputs = {
  email: string;
  password: string;
};

const AccountProfilePanel = styled(Panel)`
  padding: 14px 16px 30px;
`;

const InputWrapper = styled.div`
  width: 230px;
  margin-left: 45px;
`;

const Error = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text.primary};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 42px;
`;

const LoginView: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm<Inputs>();
  const alert = useAlert()
  const [error, setError] = useState<null | string>(null);
  const auth = useAuth();

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await auth?.login(data)
      if (response && response.otp_required) {
        history.push({
          pathname: "/login-confirm",
          state: {
            otpSessionId: response.otp_session_id
          }
        });
      } else {
        history.push("/");
      }
    } catch (error) {
      // Get first error and display it on screen
      // This is so ugly it's hard to look at :)
      const err: any = await error.json()
      if ('detail' in err && err['detail'].length) {
        const errorObj = err['detail'][0]
        const errorMessage = errorObj[Object.keys(errorObj)[0]]
        setError(errorMessage);
      }
      alert.error('Could not log in!')
    }
  };

  return (
    <HomeLayout
      left={
        <PageTitle>Enter user e-mail address and password to login</PageTitle>
      }
      right={
        <form onSubmit={handleSubmit(onSubmit)}>
          <AccountProfilePanel>
            <SectionTitle uppercase bold>
              Log in
            </SectionTitle>
            {error && <Error>{error}</Error>}
            <Field>
              <Label>E-mail</Label>
              <InputWrapper>
                <Input
                  inputProps={{ name: "email" }}
                  ref={register({
                    required: true,
                    pattern: emailValidationPattern,
                  })}
                />
              </InputWrapper>
            </Field>
            <Field>
              <Label>Password</Label>
              <InputWrapper>
                <Input
                  inputProps={{
                    name: "password",
                    type: "password",
                  }}
                  ref={register({ required: true })}
                />
              </InputWrapper>
            </Field>
          </AccountProfilePanel>
          <ButtonsWrapper>
            <Button variant="primary">Login</Button>
          </ButtonsWrapper>
        </form>
      }
    />
  );
};

export default LoginView;
