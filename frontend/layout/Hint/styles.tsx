import styled from "styled-components";
import { theme } from "config/theme";

interface HintProps {
  position?: "left" | "right" | "test";
  shouldShow: boolean;
  textWrap: boolean | undefined;
}

export const HintWrapper = styled.div<HintProps>`
  &::before, &::after {
    display: none;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  &::before {
    display: ${({ position }) => (position === "right" ? `block` : null)};
    left: -5px;
    border-right: 5px solid ${theme.colors.hint.bg};
    /* border-right: 5px solid red; */
  }

  &::after {
    display: ${({ position }) => (position === "left" ? `block` : null)};
    right: -5px;
    border-left: 5px solid ${theme.colors.hint.bg};
    /* border-left: 5px solid red; */
  }

  & {
    pointer-events: none;
    ${({ shouldShow }) =>
    shouldShow
      ? `
      opacity: 1;
    `
      : `
      opacity: 0;
    `}
    left: ${({ position }) =>
    position === "right" ? `calc(100% + 10px)` : null};
    right: ${({ position }) =>
    position === "left" ? `calc(100% + 10px)` : null};
    position: absolute;
    padding: 3px 6px;
    background: ${theme.colors.hint.bg};
    box-shadow: ${theme.colors.hint.shadow.background};
    border-radius: 5px;
    font-size: ${theme.font.smaller};
    ${({ textWrap }) =>
    textWrap
      ? `
      width: 200px;
      white-space: normal;
      text-align: justify;
      `
      : `
      display: inline-block;
      white-space: nowrap;
    `}
  }
  p {
    color: ${theme.colors.hint.color};
  }
`;
