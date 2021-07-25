import styled from "styled-components";
import { theme } from 'config/theme';

interface ListWrapperProps {
  gridArea?: string;
}

export const ListWrapper = styled.div<ListWrapperProps>`
  & {
    ${({ gridArea }) =>
    gridArea !== undefined
      ? `
    grid-area: ${gridArea};

  `
      : `
  `}
  }
  > input {
    display: none;
  }
`;

interface ContainerProps {
  isEmpty: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ isEmpty }) =>
    isEmpty
      ? `
      margin: 0 0 0 0;
  `
      : `
      margin: 15px 0 0 0;
  `}
`;

export const Element = styled.div`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.colors.text.normal};
  }

  svg {
    path {
      stroke: ${theme.colors.text.normal};
    }
  }

  > div {
    padding: 5px;
    cursor: pointer;
  }

  > span {
    margin: 0 0 0 5px;
  }
`;
