import React from "react";
import styled from "styled-components";
import Field from "components/Field";

interface Props {
  small?: boolean;
  primary?: boolean;
}

const Root = styled.label<Props>`
  font-size: ${({ small }) => (small ? "13px" : "16px")};
  color: ${({ theme, primary }) =>
    primary ? theme.text.primary : theme.text.secondary};
  ${({ small }) => !small && "text-transform: uppercase;"}

  ${Field} & {
    flex: 0 0 auto;
    margin-right: 16px;
  }
`;

const Label: React.FC<Props> = ({ children, small, primary, ...props }) => {
  return (
    <Root small={small} primary={primary} {...props}>
      {children}
    </Root>
  );
};

export default Label;
