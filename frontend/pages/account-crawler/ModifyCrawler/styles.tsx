import styled from "styled-components";
import { TopLabelWrapper } from "layout/Input/TopLabel/styles";
import { theme } from "config/theme";

export const ModifyCrawlerWrapper = styled.div`

`;

export const Options = styled.div`
  & {
    ${theme.media.tabletLandscapeUp} {
      margin-top: 30px;
      grid-template-columns: 250px 250px;
      grid-gap: 15px;
    }
    ${theme.media.tabletPortrait} {
      margin-top: 30px;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
    }
    ${theme.media.phone} {
      margin-top: 30px;
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
    margin-bottom: 20px;
    display: grid;
    align-items: flex-start;
  }
  > ${TopLabelWrapper} {
    margin: 0;
  }
`;
