import styled from "styled-components";
import { theme } from 'config/theme';

export const GetUrlsWrapper = styled.div`
  display: grid;
  margin: 20px 0 0 0;
  ${theme.media.smallDesktopUp} {
    grid-template-columns: 150px 1fr 1fr;
    grid-gap: 15px;
    grid-template-areas:
      "line1 line1 line1"
      "selectorsTip urlsSelector urlSelector"
      "line2 line2 line2"
      "processorsTip . inputProcessor"
  }
`;
