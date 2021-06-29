import styled from "styled-components";

interface Props {
  spacing?: "small" | "big";
}

const handleSpacingType = (spacing?: string) => {
  switch (spacing) {
    case "small":
      return "4px";
    case "big":
      return "24px";
    default:
      return "16px";
  }
};

const Field = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: ${({ spacing }) => handleSpacingType(spacing)};
  }
`;

export default Field;
