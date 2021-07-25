import styled from "styled-components";

interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  cursorPointer: boolean;
}

export const IconWrapper = styled.div<IconProps>`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ cursorPointer }) =>
    cursorPointer
      ? `
    cursor: pointer;
  `
      : ``}
  svg {
    & {
      ${({ size }) =>
        size !== undefined
          ? `
        width: ${size}px;
        height: ${size}px;
      `
          : null}
    }

    path {
      ${({ strokeWidth, color }) => `
        stroke-width: ${strokeWidth};
        stroke: ${color};
      `}
      fill: none;
    }
  }
`;
