import styled from "styled-components";
import { theme } from "config/theme";

export const DashboardMenuWrapper = styled.div`
  & {
    box-sizing: border-box;
    padding: 20px;
    width: 280px;
    height: 100vh;
    background: ${theme.colors.menu.bg};
    position: fixed;
    z-index: 9;
    box-shadow: 0px 5px 35px 0px rgba(0, 0, 0, 0.065);
    ${theme.media.tabletLandscapeDown} {
      display: none;
    }
  }

  > a {
    display: flex;
    align-items: center;
    color: ${theme.colors.text.normal};
    padding: 15px 0;
    span {
      margin: 0 0 0 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: ${theme.font.small};
    }
    svg path {
      stroke: ${theme.colors.text.normal} !important;
    }
  }
`;

export const LogOut = styled.div`
  & {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }

  span {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: ${theme.font.small};
    margin: 0 0 0 20px;
    color: ${theme.colors.text.normal} ;

  }
  svg path {
      stroke: ${theme.colors.text.normal} !important;
    }
`;

