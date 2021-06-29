import React from "react";
import styled from "styled-components";

interface Props {
  children: string;
}

const Root = styled.h1`
  margin: 0;
  font-size: 24px;
  line-height: 1.54;
  color: ${({ theme }) => theme.text.editable};
  font-weight: 400;
`;

const PageTitle: React.FC<Props> = ({ children }) => {
  return <Root>{children}</Root>;
};

export default PageTitle;
