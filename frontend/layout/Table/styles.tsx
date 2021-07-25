import styled from "styled-components";
import { theme } from "config/theme";

interface TableWrapperProps {}

export const TableWrapper = styled.div<TableWrapperProps>`
  & {
    box-shadow: ${theme.colors.table.shadow};
    margin: 20px 0 0 0;
    width: 100%;
    overflow-x: auto;
    border-radius: 5px;
  }

  > table {
    & {
      width: 100%;
      border-collapse: collapse;
    }

    td {
      &:last-of-type {
        border: none;
      }

      & {
        padding: 10px;
        text-align: center;
        white-space: nowrap;
        border-right: 1px solid ${theme.colors.table.borders};
      }
    }

    > thead {
      & {
        background: ${theme.colors.table.thead.bg};
        box-shadow: ${theme.colors.table.thead.shadow};
        font-size: ${theme.font.smaller};
        text-transform: uppercase;
        font-weight: bold;
        color: ${theme.colors.table.thead.color};
        border-bottom: 1px solid ${theme.colors.table.borders};
      }
    }

    > tbody {
      & {
        color: ${theme.colors.table.tbody.color};
      }

      > tr {
        &:hover {
          background: ${theme.colors.table.tbody.hover};
        }

        & {
          background: ${theme.colors.table.tbody.bg};
          border-bottom: 1px solid ${theme.colors.table.borders};
          transition: 0.25s linear;
        }
      }
    }
  }
`;
