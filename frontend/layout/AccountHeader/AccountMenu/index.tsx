import React from "react";
import Link from "next/link";
import { AccountMenuWrapper } from "./styles";
import { LogOut } from "../styles";
import Icon from "layout/Icon";
import { useRouter } from "next/router";
import { theme } from "config/theme";
interface AccountMenuProps { }

const AccountMenu: React.FunctionComponent<AccountMenuProps> = () => {
  const router = useRouter();
  function handleLogOut() {
    router.push("/sign-in");
  }

  return (
    <AccountMenuWrapper>
      <div>
        <Link href="/account-crawlers">
          <a>Crawlers</a>
        </Link>
      </div>

      <div>
        <LogOut onClick={() => handleLogOut()}>
          <Icon name="logout" size={22} strokeWidth={40} color={theme.colors.text.accent} />
          <span>Log out</span>
        </LogOut>
      </div>

    </AccountMenuWrapper>
  );
};

export default AccountMenu;
