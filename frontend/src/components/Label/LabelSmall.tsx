import React from "react";
import styled from "styled-components";

const Root = styled.label`
  font-size: 13px;
  color: ${(props) => props.theme.text.primary};
  font-family: Stem;
`;

const LabelSmall: React.FC = ({ children }) => {
  return <Root>{children}</Root>;
};

export default LabelSmall;
