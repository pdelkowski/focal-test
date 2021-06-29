import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Input from "components/Input";
import Button from "components/Button";
import Field from "components/Field";
import HomeLayout from "components/HomeLayout";
import Label from "components/Label";
import PageTitle from "components/PageTitle";
import Panel from "components/Panel";
import SectionTitle from "components/SectionTitle";
import styled from "styled-components";
import { useAuth } from "contexts/Auth";
import { otpCodeValiation } from "common/validationPatterns";
import { useAlert } from 'react-alert'

type Inputs = {
  otp_session_id: string; // I know it should be a camelCase, but dont make me to map it right now :)
  otp_code: string;
};

const AccountProfilePanel = styled(Panel)`
  padding: 14px 16px 30px;
  width: 410px;
  height: 410px;
`;

const InputWrapper = styled.div`
  width: 230px;
  margin-left: 45px;
`;

const Error = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text.primary};
`;

const StyledSectionTitle = styled(SectionTitle)`
  margin-top: 33px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 42px;
`;

const LoginConfirmView: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [error, setError] = useState<null | string>(null);
  const [otpSession, setOtpSession] = useState<string>('');
  const auth = useAuth();
  const alert = useAlert()

  useEffect(() => {
    console.log('location', location)
    // @ts-ignore
    if (location.state && 'otpSessionId' in location.state) {
      // @ts-ignore
      const otpSessionId = location.state.otpSessionId
      setOtpSession(otpSessionId)
    } else {
      history.push("/login");
    }
  }, [location, history]);

  const onSubmit = async (data: Inputs) => {
    try {
      data.otp_session_id = otpSession
      await auth?.loginConfirm(data)
      history.push("/");
    } catch (error) {
      // Get first error and display it on screen
      // This is so ugly it's hard to look at :)
      const err: any = await error.json()
      if ('detail' in err && err['detail'].length) {
        const errorObj = err['detail'][0]
        const errorMessage = errorObj[Object.keys(errorObj)[0]]
        setError(errorMessage);
      }
      alert.error('Could not login with one time password')
    }
  };

  return (
    <HomeLayout
      left={
        <PageTitle>
          A two factor authentication is enabled for you. We've sent you an email with an one time password. Check your email.
        </PageTitle>
      }
      right={
        <form onSubmit={handleSubmit(onSubmit)}>
          <AccountProfilePanel>
            <StyledSectionTitle uppercase bold>
              Enter code from email
            </StyledSectionTitle>
            {error && <Error>{error}</Error>}
            <Field>
              <Label>Code</Label>
              <InputWrapper>
                <Input
                  inputProps={{ name: "otp_code" }}
                  ref={register({
                    required: true,
                    pattern: otpCodeValiation,
                  })}
                  error={"otp_code" in errors}
                />
              </InputWrapper>
            </Field>
          </AccountProfilePanel>
          <ButtonsWrapper>
            <Button variant="primary">Verify</Button>
          </ButtonsWrapper>
        </form>
      }
    />
  );
};

export default LoginConfirmView;
