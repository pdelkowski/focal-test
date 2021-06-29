import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Root = styled.div<Props>`
  ${({ theme }) => `
    padding: 10px 12px 16px 12px;
    background-image: ${theme.palette.bgGradient};
    border: solid 1px ${theme.palette.border};
    border-radius: 30px;
    box-shadow: ${theme.panelBoxShadow};
  `}
`;

const Panel: React.FC<Props> = ({ children, ...rest }) => (
  <Root {...rest}>{children}</Root>
);

export default Panel;
