import styled from "styled-components";
import { theme } from "config/theme";

export const SignInWrapper = styled.div`
  & {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${theme.media.tabletPortraitDown} {
      padding: 20px;
    }
  }
  h1 {
    margin: 0 0 5px 0;
  }

  b {
    cursor: pointer;
    color: ${theme.colors.primaryMain};
  }
`;

export const Logo = styled.div``;

export const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 20px 0;
  background: ${theme.colors.container.bg};
  box-shadow: ${theme.colors.container.shadow.background};
  ${theme.media.tabletPortraitUp} {
    width: 350px;
  }
  ${theme.media.phone} {
    width: 100%;
  }
`;
