import styled from "styled-components";
import { theme } from "config/theme";

export const LogoMenuWrapper = styled.div`
  & {
    margin-bottom: 15px;
  }

  > a {
    background: ${theme.colors.background.bg};
    height: 40px;
    border-radius: 8px;
    display: block;
  }
`;
