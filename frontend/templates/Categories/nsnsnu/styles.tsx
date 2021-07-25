import styled from "styled-components";
import { theme } from "config/theme";

export const CategoriesNSNSNUWrapper = styled.div`
  display: grid;
  margin: 20px 0 0 0;
  ${theme.media.smallDesktopUp} {
    grid-template-columns: 150px 1fr 1fr 1fr;
    grid-template-areas:
      "line1 line1 line1 line1"
      "selectorsTip categoriesSelector s1CategoriesSelector s2CategoriesSelector"
      "selectorsTip categoryNameSelector s1CategoryNameSelector s2CategoryNameSelector"
      "selectorsTip . . s2CategoryUrlSelector"
      "line2 line2 line2 line2"
      "filtrTip categoryNameAcceptableList s1CategoryNameAcceptableList s2CategoryNameAcceptableList"
      "filtrTip categoryNameExceptionList s1CategoryNameExceptionList s2CategoryNameExceptionList";
    grid-gap: 15px;
  }
  ${theme.media.tabletLandscapeDown} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "line1"
      "selectorsTip"
      "categoriesSelector"
      "categoryNameSelector"
      "s1CategoriesSelector"
      "s1CategoryNameSelector"
      "s2CategoriesSelector"
      "s2CategoryNameSelector"
      "s2CategoryUrlSelector"
      "line2"
      "filtrTip"
      "categoryNameAcceptableList"
      "categoryNameExceptionList"
      "s1CategoryNameAcceptableList"
      "s1CategoryNameExceptionList"
      "s2CategoryNameAcceptableList"
      "s2CategoryNameExceptionList";
    grid-gap: 15px;
  }
`;

// interface ListProps {
//   gridArea: string;
// }

// export const List = styled.div<ListProps>`
//   & {
//     grid-area: ${({ gridArea }) => gridArea};
//   }
// `;

// export const Element = styled.div`
//   & {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }

//   > div {
//     padding: 5px;
//     cursor: pointer;
//   }

//   > span {
//     margin: 0 0 0 5px;
//   }
// `;
