import styled from "styled-components";
import { theme } from "config/theme";

export const PageTitleWrapper = styled.div`
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: rgba( 255, 255, 255, 0.35);
    margin: 20px 0;
  }



  h1 {
    & {
      ${theme.media.smallDesktopUp} {
        font-size: ${theme.font.biggest};
      }
      ${theme.media.tabletLandscapeDown} {
        font-size: ${theme.font.bigger};
      }
      ${theme.media.phone} {
        font-size: 6vw;
      }
      display: flex;
      flex-direction: row;
      align-items: center;
      color: ${theme.colors.text.accent};
    }

    b {
      display: inline-block;
    }

    span {
      display: inline-block;
      margin: 0 8px;
      font-size: 14px;
      transform: translateY(1px);
      color: #a8a5a5;
    }
  }

  p {
    margin: 5px 0 0 0;
    font-size: 14px;
    color: ${theme.colors.text.normal};
  }
`;
