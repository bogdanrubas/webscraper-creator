import React from "react";
import { TableWrapper } from "./styles";

interface TableProps {
  children: any;
}

const Table: React.FunctionComponent<TableProps> = ({ children }) => (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  );

export default Table;
