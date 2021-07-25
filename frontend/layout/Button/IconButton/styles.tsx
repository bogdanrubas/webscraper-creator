import styled from "styled-components";
import { theme } from "config/theme";

interface IconButtonWrapperProps {
  gridArea?: string
  onClick?: any
  actionType?: 'add' | 'edit' | 'delete' | 'cancel'
}

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconButtonWrapper = styled.button<IconButtonWrapperProps>`
  &::before {
    transition: 0.35s ${theme.cubicBezier};
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 0.3;
    border-radius: 5px;
    right: 0;
    box-shadow: ${({ actionType }) =>
    actionType ? theme.colors.button[actionType].shadow : theme.colors.button.default.shadow};
  }

  &:hover {
    &::before {
      opacity: 0.8;
    }

    & {
      z-index: 99;
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
            ${theme.colors.button.icon.bg.primary},
            ${theme.colors.button.icon.bg.secondary}
          );
          color: ${theme.colors.button.icon.color};`}
    background-size: 200% 100%;
    ${({ gridArea }) => (gridArea ? `grid-area: ${gridArea};` : null)}
    color: ${theme.colors.button.icon.color};
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    border: none;
    position: relative;
		transition: 0.35s ${theme.cubicBezier};
  }

  span {
    margin-left: 5px;
    color: ${theme.colors.button.icon.color};
    font-size: ${theme.font.smallest};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  svg {
    & {
    }

    path {
      stroke-width: 50;
			stroke: ${({ actionType }) =>
    actionType ? theme.colors.button[actionType].color : theme.colors.button.icon.color};
      fill: none;
    }
  }
`;
