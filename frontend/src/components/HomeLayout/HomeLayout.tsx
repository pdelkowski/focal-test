import React from "react";
import styled from "styled-components";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Root = styled.div`
  display: flex;
  margin: 64px 160px 0;
`;

const Left = styled.div`
  width: 330px;
  margin-top: 14px;
  margin-right: 70px;
`;

const Right = styled.div``;

const HomeLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <Root>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Root>
  );
};

export default HomeLayout;
