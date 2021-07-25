import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";
import { IconAnimation } from "../styles";

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

export const DefaultDropdownWrapper = styled.div``;

interface ContentWrapperProps {
  pose: string;
}

export const ContentWrapperAnimation = posed.div({
  show: {
    height: "auto",
    opacity: 1,
    transform: "translateY(0px)",
    pointerEvents: "all",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 250
    }
  },
  hide: {
    height: "0px",
    opacity: 0,
    transform: "translateY(20px)",
    pointerEvents: "none",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 450
    }
  }
});

export const ContentWrapper = styled(ContentWrapperAnimation)<
  ContentWrapperProps
>`
  overflow: hidden;
`;
