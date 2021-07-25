import styled from "styled-components";
import { theme } from "config/theme";

interface ButtonWrapperProps {
	gridArea?: string
	onClick?: any
	cancel?: boolean
	actionType?: 'add' | 'edit' | 'delete' | 'cancel'
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  &:focus {
    outline: none;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    border-radius: 5px;
    opacity: 0.8;
    transition: 0.55s ${theme.cubicBezier};
		box-shadow: ${({ actionType }) =>
		actionType ? theme.colors.button[actionType].shadow : theme.colors.button.default.shadow};
  }

  &:hover {
    &::before {
      /* opacity: 1; */
    }

    & {
      /* transform: scaleX(1.01) scaleY(1.035); */
      background-position: 50%;
    }
  }

  & {
		${({ actionType }) =>
		actionType
			? `
          background: linear-gradient(
            to right bottom,
            ${theme.colors.button[actionType].bg.primary},
            ${theme.colors.button[actionType].bg.secondary}
          );
          color: ${theme.colors.button[actionType].color};
          `
			: `
					background: linear-gradient(
            to right bottom,
            ${theme.colors.button.default.bg.primary},
            ${theme.colors.button.default.bg.secondary}
          );
          color: ${theme.colors.button.default.color};`}
    ${({ gridArea }) => (gridArea ? `grid-area: ${gridArea};` : null)}
    font-size: ${theme.font.small};
    font-weight: normal !important;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    transition: 0.35s ${theme.cubicBezier};
    outline: none;
    border: none;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    padding: 10px 15px;
    position: relative;
    border-radius: 4px;
    user-select: none;
    background-size: 200% 100%;
  }
`;
