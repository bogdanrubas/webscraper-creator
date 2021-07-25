import styled from 'styled-components';
import { theme } from 'config/theme';

interface FakeGridAreaProps {
  gridArea: string
  tip?: boolean
}

export const FakeGridArea = styled.div<FakeGridAreaProps>`
  & {
    ${({ tip }) => tip ? `
      padding: 0 10px 0 0;
      border-right: 1px solid #f4f4f4;
    ` : `

    `}
    ${({ gridArea }) =>
    gridArea !== undefined
      ? `
      grid-area: ${gridArea};

    `
      : `
      margin: 0 0 0px 0;
    `}
  }

  small {
    font-size: ${theme.font.small};
    display: block;
    margin: 0 0 5px 0;
  }
`;

interface LineProps {
  gridArea: string
}

export const Line = styled.div<LineProps>`
  ${({ gridArea }) =>
    gridArea !== undefined
      ? `
      grid-area: ${gridArea};

    `
      : ``}
  height: 1px;
  width: 100%;
  background: #f4f4f4;
`;