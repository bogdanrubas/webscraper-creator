import styled from 'styled-components';
import { theme } from 'config/theme';

export const Wrapper = styled.div`
  grid-area: ${(props) => props.gridArea};
  cursor: text;
  transition: box-shadow 0.25s ease-in-out;
  box-shadow: 0px 5px 35px 0px rgba(0, 0, 0, 0.065);
  background: ${theme.colors.layoutColor1};
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 15px 0;
  border-radius: 5px;
  position: relative;
  ${({ focus }) => (focus
      ? `
    z-index: 5;
  `
      : `

  `)}
`;

export const TextareaWrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
`;

export const TextareaField = styled.textarea`
  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    font-size: 15px;
    color: #bebebe;
    opacity: ${(props) => (props.focus ? 1 : 0)};
    transition: 0.25s ease-in-out;
  }

  & {
    resize: none;
    transition: 0.35s ${theme.cubicBezier};
    width: 100%;
    padding: 11px;
    font-size: 16px;
    border: none;
    background: transparent;
    box-sizing: border-box;
    height: 100px;
    ${({ focus }) => (focus
        ? `
        `
        : `
        transform: translateY(22px);

    `)}
  }
`;

export const Label = styled.span`
  &::before {
    content: "";
    transition: 0.25s ease-in-out;
    display: block;
    position: absolute;
    height: 34px;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    opacity: ${(props) => (props.focus ? 1 : 0)};
    background: linear-gradient(
      to top left,
      ${theme.colors.accentColor2},
      ${theme.colors.accentColor1}
    );
    box-shadow: ${(props) => (props.focus ? `0px 5px 25px -5px ${theme.colors.accentColor2}` : "none")};
    z-index: -1;
  }

  &::after {
    content: "";
    transition: 0.25s ease-in-out;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: ${(props) => (props.focus
        ? `5px solid ${theme.colors.accentColor2}`
        : "5px solid transparent")};
    bottom: -5px;
    left: 0;
    right: 0;
    margin: auto;
    ${({ focus }) => (focus
        ? `
      border-top: 5px solid ${theme.colors.accentColor2}
    `
        : `
      border-top: 5px solid transparent
    `)};
  }

  & {
    transition: 0.25s ease-in-out;
    left: 0;
    top: 20px;
    font-size: 11px;
    letter-spacing: 2px;
    font-weight: bold;
    position: absolute;
    text-transform: uppercase;
    padding: 10px;
    ${({ focus }) => (focus
        ? `
      color: white;
      transform: translateY(calc(-50% - 47px));
      z-index: 2;
    `
        : `
      color: ${theme.colors.lightNormalTextColor};
      box-shadow: none;
      transform: translateY(calc(-50% + 0.5px))
    `)};
  }
`;
