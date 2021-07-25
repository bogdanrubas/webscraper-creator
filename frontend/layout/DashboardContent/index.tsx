import React from "react";
import { DashboardBodyWrapper } from "./styles";

interface DashboardBodyProps {
  children: any;
}

const DashboardBody: React.FunctionComponent<DashboardBodyProps> = ({
  children
}) => <DashboardBodyWrapper>{children}</DashboardBodyWrapper>;

export default DashboardBody;
