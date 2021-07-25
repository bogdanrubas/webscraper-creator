import styled, { keyframes, css } from "styled-components";
import { theme } from "config/theme";

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

const error = keyframes`
  0% {
    box-shadow: inset 0px 0px 20px 0px rgba(240, 52, 52, 0);
  }

  20% {
    box-shadow: inset 0px 0px 20px 0px rgba(240, 52, 52, 1);
  }

  40% {
    box-shadow: inset 0px 0px 20px 0px rgba(240, 52, 52, 0.2);
  }

  60% {
    box-shadow: inset 0px 0px 20px 0px rgba(240, 52, 52, 1);
  }

  80% {
    box-shadow: inset 0px 0px 20px 0px rgba(240, 52, 52, 0.2);
  }

  100% {
    box-shadow: inset 0px 0px 20px 0px rgba(240, 52, 52, 1);
  }
`;

export const errorAnimation = () => css`
  animation: ${error} 2500ms forwards;
`;

export const Error = styled.p`
  color: red;
  font-size: 12px;
  padding: 3px 0 0 0;
`;

interface InputFieldProps {
  focus: boolean;
}

export const InputField = styled.input<InputFieldProps>`
  &::placeholder {
    ${({ focus }) =>
      focus
        ? `
      transform: translatey(-30px);
    `
        : ``};
    font-size: ${theme.font.small};
    color: ${theme.colors.input.placeholder};
    transition: 0.25s ${theme.cubicBezier};
  }

  & {
    color: ${theme.colors.input.color};
    font-size: ${theme.font.normal};
    border: none;
    display: block;
    padding: 8px 10px;
    box-sizing: border-box;
    outline: none;
    border: none;
    position: relative;
    background: transparent;
  }
`;
