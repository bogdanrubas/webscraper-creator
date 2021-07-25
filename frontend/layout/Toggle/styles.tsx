import styled from "styled-components";
import { theme } from "config/theme";

export const ToggleWrapper = styled.div``;

interface ToggleOptionProps {
  chosen: boolean;
}

export const ToggleOption = styled.div<ToggleOptionProps>`
  ${({ chosen }) =>
    chosen
      ? `
    box-shadow: ${theme.boxShadow};
    color: ${theme.colors.text.normal};
    background: white;
    transform: scale(1);
  `
      : `
    color: ${theme.colors.text.normal};
    background: #eee;
    transform: scale(0.95);
  `}
  cursor: pointer;
  margin: 0 10px 0 0;
  border-radius: 5px;
  width: max-content;
  display: inline-block;
  padding: 8px 10px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.35s ${theme.cubicBezier};
`;
