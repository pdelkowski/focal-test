import ConditionalWrapper from "components/ConditionalWrapper/ConditionalWrapper";
import React from "react";
import styled from "styled-components";

export interface Props {
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password";
  inner?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string | boolean;
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>;
  big?: boolean;
  color?: string;
  bold?: boolean;
  alignLeft?: boolean;
}

interface IWrapper {
  fullWidth?: Props["fullWidth"];
  error?: Props["error"];
}

const Wrapper = styled.div<IWrapper>`
  ${({ theme, error, fullWidth }) => `
    ${fullWidth ? "width: 60%;" : "width: 230px;"}
    position: "relative";
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 20px;
    border: solid ${error ? "0px" : "1px"} ${theme.palette.blue2};
    ${error && `background-color: ${theme.palette.white2};`}
  `};
`;

interface IInput {
  inner: Props["inner"];
  big: Props["big"];
  color: Props["color"];
  bold: Props["bold"];
  alignLeft: Props["alignLeft"];
  error: Props["error"];
}

const handleColorType = (theme: any, color?: string) => {
  switch (color) {
    case "orange":
      return theme.palette.orange;
    case "grey":
      return theme.text.editable;
    default:
      return theme.text.primary;
  }
};

const StyledInput = styled.input<IInput>`
  ${({ theme, inner, big, color, bold, alignLeft, error }) => `
    width: 100%;
    height: ${inner ? "36px" : "38px"};
    font-size: ${big ? "18px" : "13px"};
    font-weight: ${bold ? "700" : "400"};
    color: ${error ? theme.palette.error : handleColorType(theme, color)};
    outline: none;
    background: transparent;
    border: 0;
    text-align: ${alignLeft ? "left" : "right"};
    font-family: "Stem", sans-serif;
    
    // CSS below is a solution to fix browser autofill feature that apply weird background 
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
      background-color: transparent !important;
      -webkit-box-shadow: 0 0 0 30px #1A1C21 inset !important;
      -webkit-transition-delay: 99999s;
    }
    ::placeholder {
      color: ${theme.text.editable};
      opacity: ${error ? "0" : "1"};
    }
  `};
`;

const InputWrapper = styled.div`
  box-shadow: -1px -1px 2px 0 rgba(0, 0, 0, 0.96);
  border: solid 1px #25272d;
  border-radius: 20px;
`;

const LeftIcon = styled.div`
  display: flex;
  padding-right: 13px;
  fill: ${({ theme }) => theme.text.primary};
`;

const RightIcon = styled.div`
  display: flex;
  margin-left: auto;
  padding-left: 13px;
  fill: ${({ theme }) => theme.text.primary};
`;

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      fullWidth,
      disabled,
      type = "text",
      inner = false,
      leftIcon,
      rightIcon,
      inputProps,
      error,
      big,
      color = "white",
      bold = true,
      alignLeft,
    },
    ref
  ) => {
    return (
      <ConditionalWrapper
        condition={inner}
        wrapper={(children) => <InputWrapper>{children}</InputWrapper>}
      >
        <Wrapper fullWidth={fullWidth} error={error}>
          {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
          <StyledInput
            disabled={disabled}
            inner={inner}
            type={type}
            ref={ref}
            big={big}
            color={color}
            bold={bold}
            alignLeft={alignLeft}
            error={error}
            {...inputProps}
          />
          {rightIcon && <RightIcon>{rightIcon}</RightIcon>}
        </Wrapper>
      </ConditionalWrapper>
    );
  }
);

export default Input;

