import React from "react";
import { AccountBodyWrapper } from "./styles";

interface AccountBodyProps {
  children: any;
}

const AccountBody: React.FunctionComponent<AccountBodyProps> = ({
  children
}) => {
  return <AccountBodyWrapper>{children}</AccountBodyWrapper>;
};

export default AccountBody;
