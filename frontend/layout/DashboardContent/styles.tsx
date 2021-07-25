import styled from "styled-components";
import { theme } from "config/theme";

export const DashboardBodyWrapper = styled.div`
  ${theme.media.smallDesktopUp} {
    padding: 40px 40px 40px 320px;
  }
  ${theme.media.tabletLandscape} {
    padding: 30px 30px 30px 30px;
  }
  ${theme.media.tabletPortrait} {
    padding: 20px;
  }
  ${theme.media.phone} {
    padding: 10px;
  }
`;
