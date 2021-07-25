import styled from "styled-components";
import { theme } from "config/theme";

export const DepthsWrapper = styled.div``;

export const Options = styled.div`
  & {
    margin: 0 0 20px 0;
  }

  button {
    ${theme.media.tabletLandscapeUp} {
      width: 150px;
    }
    ${theme.media.tabletPortraitDown} {
      width: 100%;
    }
  }
`;
