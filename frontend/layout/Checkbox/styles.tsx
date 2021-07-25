import styled from "styled-components";
import { theme } from "config/theme";

interface CheckboxWrapperProps {
  checked: boolean;
  onClick?: any;
}

export const CheckboxWrapper = styled.label<CheckboxWrapperProps>`
  & {
    cursor: pointer;
    margin: 15px 0 0 0;
    display: flex;
    flex-direction: row;
    width: max-content;
  }

  input {
    display: none;
  }

  span {
    &:first-of-type {
      & {
        position: relative;
        transition: 0.45s ${theme.cubicBezier};
        width: 20px;
        height: 20px;
        background: ${theme.colors.radio.unSelected.bg};
        border-radius: 3px;
        box-sizing: border-box;
        ${({ checked }) =>
    checked
      ? `
          background: ${theme.colors.radio.selected.bg};
          box-shadow: ${theme.colors.container.shadow.container};
          transform: scale(1.1);
        `
      : `

        `}
      }

      svg {
        & {
          transform: translate(2px, -1px);
          position: relative;
        }

        path {
          width: 22px;
          height: 22px;
          transition: 0.75s ${theme.cubicBezier};
          stroke-dasharray: 1000;
          stroke-width: 75;
          stroke: ${theme.colors.primaryMain};
          ${({ checked }) =>
    checked
      ? `
            stroke-dashoffset: 0;
          `
      : `
            stroke-dashoffset: 1000;

          `}
        }
      }
    }

    &:last-of-type {
      margin-left: 10px;
      color: ${theme.colors.text.accent};
    }

    & {
      display: inline-block;
      font-size: 15px;
    }
  }
`;
