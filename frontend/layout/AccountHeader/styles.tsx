import styled from "styled-components";
import { theme } from "config/theme";
export const LogOut = styled.div`
  & {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: ${theme.font.small};
    margin: 0 0 0 10px;
  }
`;


export const AccountHeaderWrapper = styled.div`
  & {
    background: ${theme.colors.container.bg};
    display: grid;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    ${theme.media.tabletLandscape} {
      justify-content: space-between;
      padding: 15px 30px;
      grid-template-columns:  1fr auto;
    }
    ${theme.media.tabletPortrait} {
      padding: 15px 20px;
      grid-template-columns:  1fr auto;
    }
    ${theme.media.phone} {
      padding: 10px;
      grid-template-columns:  1fr auto;
    }
    ${theme.media.smallDesktopUp} {
      display: none;
    }
  }
`;

export const Hamburger = styled.div`
  & {
    width: 23px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${theme.media.smallDesktopUp} {
      display: none;
    }
  }

  span {
    width: 100%;
    height: 1px;
    background: ${theme.colors.text.accent};
  }
`;

export const UserInfo = styled.div`
  font-size: ${theme.font.smaller};
  display: flex;
  justify-content: flex-end;
  margin: 0 25px 0 0;
  ${theme.media.tabletLandscapeDown} {
    display: none;
  }
`;
