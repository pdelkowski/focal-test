import React from "react";
import styled from "styled-components";

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "default";
  small?: boolean;
  fullWidth?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  bold?: boolean;
}

const Root = styled.button.attrs((props) => ({
  type: props.type,
}))<Props>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "170px")};
  height: ${({ small }) => (small ? "32px" : "44px")};
  font-family: "Stem";
  font-size: 13px;
  ${({ bold }) => bold && "font-weight: 700;"}
  color: ${({ theme, variant }) =>
    variant === "default" ? theme.text.secondary : theme.text.primary};
  text-align: center;
  text-transform: uppercase;
  background-image: ${({ variant }) =>
    variant === "default"
      ? "linear-gradient(to bottom, #1b2023, #171719)"
      : "linear-gradient(178deg, #046cb7 5%, #06a2fa 99%)"};
  box-shadow: ${({ variant }) =>
    variant === "default" ? "-3px -3px 10px 0 #394249" : "none"};
  border-radius: 20px;
  border: 0;
  outline: none;
  cursor: pointer;
`;

const Button: React.FC<Props> = ({
  variant = "default",
  children,
  className,
  type,
  small = false,
  fullWidth = false,
  bold = true,
  onClick,
}) => (
  <Root
    onClick={onClick}
    className={className}
    variant={variant}
    type={type}
    small={small}
    fullWidth={fullWidth}
    bold={bold}
  >
    {children}
  </Root>
);

export default Button;
