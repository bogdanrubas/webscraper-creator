import styled from "styled-components";
import { theme } from "config/theme";

export const TitleWrapper = styled.div`
  & {
    margin: 20px 0;
  }

  b {
    font-size: ${theme.font.big};
    color: ${theme.colors.text.accent};
  }

  p {
    font-size: ${theme.font.smaller};
    color: ${theme.colors.text.normal};
  }
`;
