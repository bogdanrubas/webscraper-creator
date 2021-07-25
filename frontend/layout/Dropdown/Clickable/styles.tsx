import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";
import { IconAnimation } from "../styles";

export const ClickableDropdownWrapper = styled.div``;

export const Toggle = styled(IconAnimation)`
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #eee;
  margin: 0 0 10px 0;
  justify-content: space-between;
  align-items: center;
`;

interface ElementProps {
  chosen: boolean;
  show: boolean;
  index: number;
  delay: number;
}

export const Element = styled.div<ElementProps>`
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin: 10px 10px 0 0;
  padding: 10px;
  border-radius: 5px;
  ${({ chosen }) =>
    chosen
      ? `
    top: -1px;
    box-shadow: 0px 5px 35px 0px rgba(0, 0, 0, 0.065);
    background: ${theme.colors.background.bg};
    color: ${theme.colors.text.accent};
    `
      : `
    top: 0px;
    background: #eee;
    color: ${theme.colors.text.normal};
    `}
  ${({ show, index, delay }) =>
    show
      ? `
    opacity: 1;
    transform: translateY(0px);
    transition:
      transform 0.35s ${theme.cubicBezier} ${index * delay}ms,
      opacity 0.35s ${theme.cubicBezier} ${index * delay}ms,
      background 0.35s ${theme.cubicBezier},
      color 0.35s ${theme.cubicBezier},
      box-shadow 0.35s ${theme.cubicBezier},
      top 0.35s ${theme.cubicBezier};
  `
      : `
    opacity: 0;
    transform: translateY(15px);
    transition: 0.35s ${theme.cubicBezier};
  `}
`;

export const ContentWrapperAnimation = posed.div({
  show: {
    height: "auto",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 250
    }
  },
  hide: {
    height: "0px",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 450
    }
  }
});

interface ContentWrapperProps {
  show: boolean;
  pose: string;
}

export const ContentWrapper = styled(ContentWrapperAnimation) <
  ContentWrapperProps
  >`
  ${({ show }) =>
    show
      ? `
    pointer-events: all;
  `
      : `
    pointer-events: none;
  `}
`;
