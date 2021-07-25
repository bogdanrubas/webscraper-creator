import styled from "styled-components";
import { TopLabelWrapper } from "layout/Input/TopLabel/styles";
import { ButtonWrapper } from "layout/Button/Default/styles";
import { theme } from "config/theme";

export const CrawlerWrapper = styled.div`
  form > ${ButtonWrapper} {
    ${theme.media.tabletPortraitUp} {
      width: 150px;
    }
    ${theme.media.phone} {
      width: 100%;
    }
  }

  > button {
    width: 180px;
  }
`;

export const Options = styled.div`
  & {
    ${theme.media.tabletLandscapeUp} {
      margin-top: 30px;
      grid-template-columns: 250px 40px 150px;
      grid-gap: 15px;
    }
    ${theme.media.tabletPortrait} {
      margin-top: 30px;
      grid-template-columns: 1fr 40px 1fr;
      grid-gap: 15px;
    }
    ${theme.media.phone} {
      margin-top: 30px;
      grid-template-columns: 1fr 40px;
      grid-gap: 10px;
    }
    margin-bottom: 20px;
    display: grid;
    align-items: flex-end;
  }
  > ${TopLabelWrapper} {
    margin: 0;
  }
`;
