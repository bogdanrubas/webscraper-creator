import styled from "styled-components";
import { theme } from "config/theme";

export const CrawlerWrapper = styled.tr`
  td.actions {
    & {
      width: 100px;
    }

    button {
      &:last-of-type {
        margin: 0;
      }
      & {
        margin-right: 10px;
      }
    }
  }
  td.tableInTable {
    & {
      padding: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        &:first-of-type {
          font-weight: bold;
          font-size: 14px;
        }
        &:last-of-type {
          font-size: 12px;
          border-bottom: none;
        }
        width: 100%;
      }
    }
  }

  td {
    table tbody {
      /* tr:first-of-type {
        font-weight: bold;
        font-size: 14px;
        border-bottom: 1px solid red;
      }
      tr:last-of-type {
        font-size: 12px;
        border-bottom: none;
      } */

      td {
      }
      .success {
        color: ${theme.colors.text.success};
      }
      .error {
        color: ${theme.colors.text.error};
      }
    }
  }
`;
