import styled from "styled-components";
import { theme } from "config/theme";
import posed from "react-pose";
import { IconAnimation } from "../styles";
import { errorAnimation, onMountAlertAnimation } from "../../Input/styles";

export const FakeHeight = styled.div`
  height: 36px;
`;

interface WrapperProps {
  shouldShow: boolean;
  gridArea?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ shouldShow }) =>
    shouldShow
      ? `
    z-index: 9;
  `
      : `
    transition: 0.35s 0.35s;
    z-index: 1;
  `}
  ${({ gridArea }) =>
    gridArea
      ? `
    grid-area: ${gridArea};
  `
      : `

  `}
  margin: 0 0 15px 0;
  position: relative;
`;

export const Label = styled.span`
  display: block;
  margin: 0 0 5px 0;
  font-size: ${theme.font.smaller};
  color: ${theme.colors.text.accent}
`;

interface SelectDropdownWrapperProps {
  pose: string;
  shadow: "background" | "container";
}

export const SelectDropdownWrapperAnimation = posed.div({
  open: {
    height: "auto",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 250,
    },
  },
  close: {
    height: 36,
    transition: {
      ease: theme.cubicBezierPose,
      duration: 250,
    },
  },
});

export const SelectDropdownWrapper = styled(SelectDropdownWrapperAnimation) <
  SelectDropdownWrapperProps
  >`
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  width: 100%;
  z-index: 4;
  background: ${theme.colors.input.bg};
  ${({ shadow }) =>
    shadow === "container"
      ? `
    box-shadow: ${theme.colors.input.shadow.container};
  `
      : ``}
  ${({ shadow }) =>
    shadow === "background"
      ? `
    box-shadow: ${theme.colors.input.shadow.background};
  `
      : ``}
`;

interface ToggleProps {
  chosenOption: string;
  error: boolean;
  alertAnimation?: boolean;
}

export const Toggle = styled(IconAnimation) <ToggleProps>`
  & {
    cursor: text;
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-gap: 5px;
    height: 36px;
    box-sizing: border-box;
    padding: 7px 10px;
    ${({ alertAnimation }) => (alertAnimation ? onMountAlertAnimation : ``)};
    ${({ error }) => (error ? errorAnimation : ``)};
  }

  div:first-of-type {
      ${({ chosenOption }) =>
    chosenOption !== ""
      ? `
          opacity: 0;
      `
      : `
          opacity: 1;
      `}
      transition: .35s ${theme.cubicBezier};
  }

  input {
    &::placeholder {
      font-size: ${theme.font.small};
      color: ${theme.colors.input.placeholder};
    }

    &.fakeInput {
      display: none !important;
    }

    & {
      transition: .35s ${theme.cubicBezier};
      cursor: text;
      background: transparent;
      border: none;
      outline: none;
      font-size: ${theme.font.normal};
      ${({ chosenOption }) =>
    chosenOption !== ""
      ? `
        transform: translateX(-25px);
      `
      : `
        transform: translateX(0px);
      `}
    }
  }
`;

export const ContentWrapper = styled.div`
  & {
    max-height: 150px;
    padding: 10px;
    overflow-y: auto;
  }

  span {
    & {
      color: ${theme.colors.text.normal};
    }

    b {
      color: ${theme.colors.text.normal};
    }
  }
`;

interface OptionProps {
  show: boolean;
  index: number;
}

export const Option = styled.div<OptionProps>`
  &:last-of-type {
    margin: 0;
  }

  & {
    ${({ show, index }) =>
    show
      ? `
      transform: translateY(0px);
      transition: 0.35s ${theme.cubicBezier} ${index * 0.055}s;
    `
      : `
      transform: translateY(15px);
      transition: 0.35s ${theme.cubicBezier};
    `}
    margin: 0 0 10px 0;
    background: ${theme.colors.container.bg};
    box-shadow: ${theme.colors.input.shadow.background};
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
  }
`;
