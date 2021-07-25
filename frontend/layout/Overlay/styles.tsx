import styled from "styled-components";
import { theme } from "config/theme";

interface OverlayWrapperProps {
  shouldShow: boolean;
}

export const OverlayWrapper = styled.div<OverlayWrapperProps>`
  ${({ shouldShow }) =>
    shouldShow
      ? `
    opacity: 0.5;
    pointer-events: all;
  `
      : `
    opacity: 0;
    pointer-events: none;
  `}
  transition: 0.35s ${theme.cubicBezier};
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
`;
