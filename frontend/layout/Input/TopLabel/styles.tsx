import styled from "styled-components";
import { theme } from "config/theme";
import { errorAnimation, InputField, onMountAlertAnimation } from "../styles";

interface TopLabelWrapper {
  gridArea?: string;
  alertAnimation: boolean;
}
export const TopLabelWrapper = styled.div<TopLabelWrapper>`
  ${({ gridArea }) =>
    gridArea !== undefined
      ? `
    grid-area: ${gridArea};

    `
      : `
    margin: 0 0 15px 0;
    `}
  position: relative;
  > div {
    background: ${theme.colors.input.bg};
    border-radius: 5px;
    ${({ alertAnimation }) => (alertAnimation ? onMountAlertAnimation : null)};
  }
`;

export const Label = styled.span`
  display: block;
  margin: 0 0 5px 0;
  font-size: ${theme.font.smaller};
  color: ${theme.colors.input.label};
`;

interface TopLabelInputFieldProps {
  focus: boolean;
  error: boolean;
  shadow: "container" | "background";
}

export const TopLabelInputField = styled(InputField)<TopLabelInputFieldProps>`
  & {
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
    width: 100%;
    border-radius: 5px;
    ${({ error }) => (error ? errorAnimation : ``)};
  }
`;
