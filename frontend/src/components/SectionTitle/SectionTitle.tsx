import React from "react";
import styled from "styled-components";

export interface Props {
  children: React.ReactNode;
  uppercase?: boolean;
  bold?: boolean;
  size?: "default" | "small";
  leftIcon?: React.ReactNode;
}

interface IRoot {
  uppercase?: Props["uppercase"];
  bold?: Props["bold"];
  size?: Props["size"];
}

const Root = styled.h1<IRoot>`
  display: flex;
  justify-content: space-between;
  margin: 0 0 24px;
  font-size: ${({ size }) => (size === "small" ? "18px" : "20px")};
  line-height: 1;
  color: ${({ theme }) => theme.text.primary};
  font-weight: ${({ bold }) => (bold ? 700 : 300)};
  ${({ uppercase }) => uppercase && `text-transform: uppercase;`}
`;

const LeftIcon = styled.div`
  margin-right: 6px;
  fill: ${({ theme }) => theme.text.primary};
`;

const SectionTitle: React.FC<Props> = ({
  children,
  size = "default",
  bold = false,
  leftIcon = null,
  ...props
}) => (
  <Root size={size} bold={bold} {...props}>
    {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
    {children}
  </Root>
);

export default SectionTitle;
