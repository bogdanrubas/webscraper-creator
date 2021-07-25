import styled from "styled-components";
import { theme } from "config/theme";
import { InputField, errorAnimation } from "../styles";

interface TopLabelIconWrapper {
  gridArea?: string;
}
export const TopLabelIconWrapper = styled.div<TopLabelIconWrapper>`
  ${({ gridArea }) =>
    gridArea !== undefined
      ? `
    grid-area: ${gridArea};

  `
      : `

  `}
`;

export const Label = styled.span`
  display: block;
  margin: 0 0 5px 0;
  font-size: ${theme.font.smaller};
  color: ${theme.colors.input.label};
`;

interface GridProps {
  shadow: "container" | "background";
  error?: boolean;
}

export const Grid = styled.div<GridProps>`
  ${({ shadow }) =>
    shadow === "container"
      ? `
    box-shadow: ${theme.colors.input.shadow.container};
  `
      : ``}
  ${({ shadow }) =>
    shadow === "background"
      ? `
    box-shadow: ${theme.colors.input.shadow.background};
  `
      : ``}
  border-radius: 5px;
  background: ${theme.colors.input.bg};
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr auto;
  align-items: center;
  ${({ error }) => (error ? errorAnimation : ``)}
  svg {
    &:hover {
      path {
        stroke: ${theme.colors.primaryMain};
      }
    }
    & {
      cursor: pointer;
      width: 18px;
      padding: 9px;
      box-shadow: 5px 0px 35px 0px rgba(0, 0, 0, 0.3);
    }

    path {
      transition: 0.25s ${theme.cubicBezier};
      stroke: black;
      stroke-width: 40;
    }
  }
`;

interface TopLabelIconInputFieldProps {}
export const TopLabelIconInputField = styled(InputField)<
  TopLabelIconInputFieldProps
>`
  background: transparent;
`;

export const Icon = styled.svg`
  &:hover {
    path {
      stroke: ${theme.colors.primaryMain};
    }
  }
  & {
    cursor: pointer;
    width: 18px;
    padding: 9px;
    box-shadow: 5px 0px 35px 0px rgba(0, 0, 0, 0.3);
  }

  path {
    transition: 0.25s ${theme.cubicBezier};
    stroke: black;
    stroke-width: 40;
  }
`;
