import styled from "styled-components";
import { theme } from "config/theme";
import posed from "react-pose";
import { IconAnimation } from "../styles";

export const Wrapper = styled.div`
  height: 40px;
`;

interface SelectDropdownWrapperProps {
  pose: string;
}

export const SelectDropdownWrapperAnimation = posed.div({
  open: {
    height: "auto",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 250
    }
  },
  close: {
    height: 40,
    transition: {
      ease: theme.cubicBezierPose,
      duration: 250
    }
  }
});

export const SelectDropdownWrapper = styled(SelectDropdownWrapperAnimation) <
  SelectDropdownWrapperProps
  >`
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  width: 100%;
  z-index: 4;
  background: ${theme.colors.container.bg};
  box-shadow: 0px 5px 35px 0px rgba(0, 0, 0, 0.065);
`;

export const Toggle = styled(IconAnimation)`
  & {
    cursor: pointer;
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-gap: 5px;
    padding: 10px;
  }

  span {
    &:first-of-type {
    }

    &:last-of-type {
      font-size: 12px;
    }

    & {
    }
  }
`;

export const ContentWrapper = styled.div``;

interface OptionProps {
  chosen: boolean;
  show: boolean;
  index: number;
}

export const Option = styled.div<OptionProps>`
  &:last-of-type {
  }

  & {
    ${({ chosen }) =>
    chosen
      ? `
      color: ${theme.colors.text.accent};
      box-shadow: 0px 5px 35px 0px rgba(0, 0, 0, 0.065);
    `
      : `
      color: ${theme.colors.text.normal};

    `}
    ${({ show, index }) =>
    show
      ? `
      transform: translateY(0px);
      transition: 0.35s ${theme.cubicBezier} ${index * 0.075}s;
    `
      : `
      transform: translateY(15px);
      transition: 0.35s ${theme.cubicBezier};
    `}
    cursor: pointer;
    padding: 5px 10px;
  }
`;
