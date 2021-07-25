import styled from "styled-components";
import { theme } from "config/theme";

// default, clickable, select:

interface IconAnimationProps {
  showDropdown: boolean;
}

export const IconAnimation = styled.div<IconAnimationProps>`
  div:last-of-type {
    svg {
      ${({ showDropdown }) =>
        showDropdown
          ? `
      transform: rotateX(180deg) rotateY(-180deg);
    `
          : `
      transform: rotateX(0deg) rotateY(0deg);
    `}
      width: 15px !important;
      display: block;
      transition: 0.35s ${theme.cubicBezier};
    }
  }
`;

interface OverlayProps {
  show: boolean;
}

// select:
export const Overlay = styled.div<OverlayProps>`
  ${({ show }) =>
    show
      ? `
    pointer-events: all;
  `
      : `
    pointer-events: none;
  `}
  transition: 0.65s ${theme.cubicBezier};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;
