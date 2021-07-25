import styled from "styled-components";
import { theme } from "config/theme";

interface ModalWrapperProps {
  shouldShow: boolean;
  width?: number;
  height?: number;
}

export const ModalWrapper = styled.div<ModalWrapperProps>`
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.25s ${theme.cubicBezier};
  b {
    color: ${theme.colors.text.accent}
  }
  ${({ shouldShow }) =>
    shouldShow
      ? `
    transform: scale(1);
    opacity: 1;
    pointer-events: all;
    `
      : `
    transform: scale(0.8);
    opacity: 0;
    pointer-events: none;
  `}

  /* ////////////////////// height ////////////////////// */

  ${({ height }) =>
    height
      ? `
    `
      : `
    height: max-content;
  `}

  @media (min-height: 1000px) {
    ${({ height }) =>
      height && height > 1000
        ? `
      height: calc(1000px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (min-height: 900px) and (max-height: 999px) {
    ${({ height }) =>
      height && height > 900
        ? `
      height: calc(900px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (min-height: 800px) and (max-height: 899px) {
    ${({ height }) =>
      height && height > 800
        ? `
      height: calc(800px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (min-height: 700px) and (max-height: 799px) {
    ${({ height }) =>
      height && height > 700
        ? `
      height: calc(700px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (min-height: 600px) and (max-height: 699px) {
    ${({ height }) =>
      height && height > 600
        ? `
      height: calc(600px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (min-height: 500px) and (max-height: 599px) {
    ${({ height }) =>
      height && height > 500
        ? `
      height: calc(500px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (min-height: 400px) and (max-height: 499px) {
    ${({ height }) =>
      height && height > 400
        ? `
      height: calc(400px - 40px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (max-height: 399px) {
    height: 90vh;
  }

  /* ////////////////////// width ////////////////////// */

  ${theme.media.smallDesktopUp} {
    ${({ width }) =>
      width && width > theme.breakpoints.tabletLandscape
        ? `
      width: calc(${theme.breakpoints.tabletLandscape}px - 80px);
    `
        : `
      width: ${width}px;
    `}
  }

  ${theme.media.tabletLandscape} {
    ${({ width }) =>
      width && width < theme.breakpoints.tabletPortrait
        ? `
      width: ${width}px;
    `
        : `
      width: calc(${theme.breakpoints.tabletPortrait}px - 80px);
    `}
  }

  ${theme.media.tabletPortrait} {
    ${({ width }) =>
      width && width < theme.breakpoints.phone
        ? `
      width: ${width}px;
    `
        : `
      width: calc(${theme.breakpoints.phone}px - 80px);
    `}
  }

  ${theme.media.phone} {
    width: calc(100vw - 40px);
  }

  /* width === undefined */

  ${theme.media.tabletPortraitUp} {
    ${({ width }) =>
      width
        ? `

    `
        : `
      width: 420px;
    `}
  }

  ${theme.media.phone} {
    ${({ width }) =>
      width
        ? `

    `
        : `
      width: calc(100% - 40px);
    `}
  }

`;

export const Header = styled.div`
  & {
    padding: 15px;
    background: ${theme.colors.container.bg};
    display: flex;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    justify-content: space-between;
    align-items: center;
    color: ${theme.colors.text.accent};
  }

  div {
    padding: 5px;
    cursor: pointer;
  }
`;
interface BodyProps {
  height?: number;
}

export const Body = styled.div<BodyProps>`
  ${({ height }) =>
    height !== undefined
      ? `
    overflow-y: scroll;
  `
      : `

  `}

  @media (min-height: 1000px) {
    ${({ height }) =>
      height && height > 1000
        ? `
      height: calc(1000px - 95px);
    `
        : `
      height: calc(${height}px - 55px);
    `}
  }

  @media (min-height: 900px) and (max-height: 999px) {
    ${({ height }) =>
      height && height > 900
        ? `
      height: calc(900px - 95px);
    `
        : `
      height: calc(${height}px - 55px);
    `}
  }

  @media (min-height: 800px) and (max-height: 899px) {
    ${({ height }) =>
      height && height > 800
        ? `
      height: calc(800px - 95px);
    `
        : `
      height: calc(${height}px - 55px);
    `}
  }

  @media (min-height: 700px) and (max-height: 799px) {
    ${({ height }) =>
      height && height > 700
        ? `
      height: calc(700px - 95px);
    `
        : `
      height: calc(${height}px - 55px);
    `}
  }

  @media (min-height: 600px) and (max-height: 699px) {
    ${({ height }) =>
      height && height > 600
        ? `
      height: calc(600px - 95px);
    `
        : `
      height: calc(${height}px - 55px);
    `}
  }

  @media (min-height: 500px) and (max-height: 599px) {
    ${({ height }) =>
      height && height > 500
        ? `
      height: calc(500px - 95px);
    `
        : `
      height: calc(${height}px - 55px);
    `}
  }

  @media (min-height: 400px) and (max-height: 499px) {
    ${({ height }) =>
      height && height > 400
        ? `
      height: calc(400px - 95px);
    `
        : `
      height: ${height}px;
    `}
  }

  @media (max-height: 399px) {
    height: calc(90vh - 85px);
  }

  color: ${theme.colors.text.accent};
  box-sizing: border-box;
  padding: 15px;
  background: ${theme.colors.background.bg};
`;

// yes/no:

export const Buttons = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;
