import React from "react";
import { AccountHeaderWrapper, UserInfo, Hamburger, LogOut } from "./styles";
import AccountMenu from "./AccountMenu";
import Icon from "layout/Icon";
import Router from "next/router";
import { theme } from "config/theme";

const AccountHeader: React.FunctionComponent = () => {
  function handleLogOut() {
    Router.push("/sign-in");
  }

  return (
    <>
      <AccountMenu />
      <AccountHeaderWrapper>
        <Hamburger>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>

        <UserInfo>
        </UserInfo>

        <LogOut onClick={() => handleLogOut()}>
          <Icon name="logout" size={22} strokeWidth={40} color={theme.colors.text.accent} />
          <span>Log out</span>
        </LogOut>
      </AccountHeaderWrapper>
    </>
  );
};

export default AccountHeader;
