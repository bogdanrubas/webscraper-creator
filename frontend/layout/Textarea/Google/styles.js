import styled from 'styled-components';
import { theme } from 'config/theme';

export const GoogleWrapper = styled.div`
  ${({ textareaFocus }) =>
    textareaFocus
      ? `
    border: 1px solid ${theme.colors.accentColor1};
  `
      : `
    border: 1px solid #dadada;
  `}
  display: flex;
  align-items: center;
  transition: 0.2s ${theme.cubicBezier};
  position: relative;
  border-radius: 5px;
`;

export const TextareaField = styled.textarea`
  &::placeholder {
    ${({ textareaFocus }) =>
      textareaFocus
        ? `
      transition: 0.35s ${theme.cubicBezier} 0.25s;
      opacity: 1;
    `
        : `
      transition: 0.35s ${theme.cubicBezier};
      opacity: 0;
    `}
  }

  & {
    resize: none;
    width: 100%;
    height: 140px;
    box-sizing: border-box;
    background: transparent;
    outline: none;
    border: none;
    padding: 10px;
  }
`;

export const Label = styled.div`
  ${({ textareaFocus }) =>
    textareaFocus
      ? `
    color: ${theme.colors.accentColor1}
  `
      : `
  color: ${theme.colors.lightNormalTextColor};
  `}
  ${({ labelFocus }) =>
    labelFocus
      ? `
    transform: scale(0.8) translateY(-20.5px);
    background: ${theme.colors.layoutColor2};
  `
      : `
    transform: scale(1) translateY(0px);
    background: transparent;
  `}
  transform-origin: 0 0;
  left: 5px;
  top: 7px;
  padding: 0 5px;
  position: absolute;
  transition: 0.2s ${theme.cubicBezier};
`;
