import styled from "styled-components";
import { SelectDropdownWrapper } from "layout/Dropdown/SelectSearch/styles";
import posed from "react-pose";
import { theme } from "config/theme";
import { TopLabelWrapper } from "layout/Input/TopLabel/styles";

export const DepthWrapperAnimation = posed.div({
  expand: {
    height: "auto",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 350,
    },
  },
  close: {
    height: 155,
    transition: {
      ease: theme.cubicBezierPose,
      duration: 350,
    },
  },
});

export const DepthWrapper = styled(DepthWrapperAnimation)`
  &:last-of-type {
    margin: 0;
  }

  & {
    ${({ isTemplateChosen }) =>
    isTemplateChosen
      ? `
        overflow: hidden;
        `
      : ``}
    margin: 0 0 20px 0;
    background: white;
    box-shadow: 0px 5px 35px 0px rgba(0,0,0,0.125);
  }
`;

interface OptionsProps {
  // depthRequestType: string;
}
export const Options = styled.div<OptionsProps>`
  & {
    display: grid;
    grid-gap: 20px;
    align-items: flex-start;
    margin: 0 0 20px 0;
    ${theme.media.smallDesktopUp} {
      grid-template-columns: 250px 250px 250px;
    }
    ${theme.media.tabletLandscape} {
      grid-template-columns: 1fr 1fr 150px;
    }
    ${theme.media.tabletPortraitDown} {
      grid-template-columns: 1fr;
    }
  }
  ${TopLabelWrapper} {
    margin: 0;
  }
`;

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Head = styled.div`
  & {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    color: ${theme.colors.text.accent};
  }
  > b {
    font-size: 20px;
    color: ${theme.colors.text.accent};
  }
`;

export const Icons = styled.div`
  & {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  > div {
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
  }

  > div:last-of-type {
    transform: scale(0.8);
  }
`;

export const Rotate = posed.div({
  expand: {
    transform: "rotate(180deg)",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 450,
    },
  },
  close: {
    transform: "rotate(0deg)",
    transition: {
      ease: theme.cubicBezierPose,
      duration: 450,
    },
  },
});

interface BodyProps {
  isTemplateChosen: boolean;
}

export const Body = styled.div<BodyProps>`
  & {
    margin: 20px 0 0 0;
  }

  > b:first-of-type {
    ${({ isTemplateChosen }) =>
    isTemplateChosen
      ? `
        margin: 30px 0 0 0;
        `
      : `
        margin: 0;
    `}
    font-size: 20px;
    display: block;
    color: ${theme.colors.text.accent};
  }
`;
