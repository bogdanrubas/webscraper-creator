import { theme } from "config/theme";
import { errorAnimation } from "layout/Input/styles";

import styled, { keyframes, css } from "styled-components";

const onMountAlert = keyframes`
  0% {
    box-shadow: inset 0px 3px 15px -2px rgba(26, 147, 110, 0);
  }

  50% {
    box-shadow: inset 0px 3px 17px -2px rgba(26, 147, 110, 0.6);
  }

  100% {
    box-shadow: inset 0px 3px 15px -2px rgba(26, 147, 110, 0);
  }
`;

export const onMountAlertAnimation = () => css`
  animation: ${onMountAlert} 1000ms;
`;

export const RadioWrapper = styled.div`
  display: inline-block;
  margin: 0 0 10px 0;
`;

interface RadioOptionProps {
  chosen: boolean;
  shadow: "container" | "background";
  error: boolean;
  alertAnimation?: boolean;
}

export const RadioOption = styled.label<RadioOptionProps>`
  & {
    ${({ chosen, shadow }) =>
    chosen && shadow === "container"
      ? `
      box-shadow: ${theme.colors.radio.selected.shadow.container};
      color: ${theme.colors.radio.selected.color};
      background: ${theme.colors.radio.selected.bg};
      transform: scale(1);
    `
      : chosen && shadow === "background"
        ? `
        box-shadow: ${theme.colors.radio.selected.shadow.background};
        color: ${theme.colors.radio.selected.color};
        background: ${theme.colors.radio.selected.bg};
        transform: scale(1.05);
      `
        : `
      color: ${theme.colors.radio.unSelected.color};
      background: ${theme.colors.radio.unSelected.bg};
      transform: scale(1);
      box-shadow: ${theme.colors.radio.selected.shadow.container};
    `}
    cursor: pointer;
    margin: 0 10px 0 0;
    border-radius: 5px;
    width: max-content;
    padding: 10.5px 10px;
    box-sizing: border-box;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.35s ${theme.cubicBezier};
    display: flex;
    flex-direction: row;
    align-items: center;
    ${({ alertAnimation }) => (alertAnimation ? onMountAlertAnimation : ``)};
    ${({ error }) => (error ? errorAnimation : ``)};
  }

  input {
    display: none;
  }

  div {
    margin-left: 5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    transition: 0.35s ${theme.cubicBezier};
    ${({ chosen }) =>
    chosen
      ? `
      // border: 1px solid ${theme.colors.primaryMain};
      background: ${theme.colors.radio.selected.circleBg};
    `
      : `
      // border: 1px solid #999;
      background: ${theme.colors.radio.unSelected.circleBg};
    `}
  }
`;
