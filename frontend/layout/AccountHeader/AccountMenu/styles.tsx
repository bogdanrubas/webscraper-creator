import styled from "styled-components";
import { theme } from "config/theme";
import { LogOut } from "../styles";

export const AccountMenuWrapper = styled.div`
  & {
    box-sizing: border-box;
    padding: 20px;
    width: 280px;
    height: 100vh;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-right: 1px solid rgba( 255, 255, 255, 0.18 );
    display: grid;
    grid-template-rows: 1fr auto;
    position: fixed;
    z-index: 9;
    color: ${theme.colors.text.accent};
    ${theme.media.tabletLandscapeDown} {
      display: none;
    }
  }

  a {
    display: block;
    width: 100%;
    text-align: center;
  }

  > div:last-of-type {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
