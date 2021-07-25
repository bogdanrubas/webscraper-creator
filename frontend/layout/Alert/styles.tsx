import styled, { css, keyframes } from "styled-components";
import { theme } from "config/theme";
import { IconWrapper } from "layout/Icon/styles";


export const AlertWrapper = styled.div`
  & {
    ${theme.media.smallDesktopUp} {
      top: 60px;
    }
    ${theme.media.tabletLandscapeDown} {
      top: 40px;
    }
    ${theme.media.phone} {
      top: 20px;
    }
    left: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;
    width: 250px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    padding: 8px 12px 12px 12px;
    box-shadow: 0px 5px 35px 0px rgba(0, 0, 0, 0.065);
    opacity: 0;
    transform: scale(0.9);
    transition: 0.3s ${theme.cubicBezier};
  }
  &.enter,
  &.entered {
    opacity: 1;
    transform: scale(1);
  }
  &.exit,
  &.exited {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export const Head = styled.div`
  & {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  > ${IconWrapper} {
    & {
      margin: 0 0 0 10px;
      cursor: pointer;
      padding: 5px 0 5px 5px;
      top: 5px;
      right: 5px;
    }

    path {
      stroke: ${theme.colors.text.accent};
      stroke-width: 140;
    }
  }
`;

export const Body = styled.div`
  color: ${theme.colors.text.normal};
`;

export const Text = styled.div``;

interface TimeProps {
	time: number;
}

export const Time = styled.div<TimeProps>`
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    height: 100%;
    background: ${theme.colors.text.accent};
  }

  & {
    position: relative;
    width: 100%;
    height: 2px;
    background: #f0f0f0;
  }
`;
