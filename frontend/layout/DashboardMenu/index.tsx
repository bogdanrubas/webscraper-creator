import React from "react";
import Link from "next/link";
import Icon from 'layout/Icon';
import { useRouter } from "next/router";
import { DashboardMenuWrapper, LogOut } from "./styles";
import Logo from './Logo';

interface DashboardMenuProps { }

const DashboardMenu: React.FunctionComponent<DashboardMenuProps> = () => {
	const router = useRouter();

	function handleLogOut() {
		localStorage.clear();

		router.push("./");
	}

	return (
		<DashboardMenuWrapper>
			<Logo />

			<Link href="/dashboard-devices">
				<a>
					<Icon name="companies" size={22} strokeWidth={40} color="black" />
					<span>Urządzenia</span>
				</a>
			</Link>

			<Link href="/dashboard-configs">
				<a>
					<Icon name="settings" size={22} strokeWidth={40} color="black" />
					<span>Konfiguracje</span>
				</a>
			</Link>

			<Link href="/dashboard-game-servers">
				<a>
					<Icon name="companies" size={22} strokeWidth={40} color="black" />
					<span>Serwery</span>
				</a>
			</Link>

			<Link href="/dashboard-accounts">
				<a>
					<Icon name="user" size={22} strokeWidth={40} color="black" />
					<span>Konta</span>
				</a>
			</Link>

			<LogOut onClick={() => handleLogOut()}>
				<Icon name="logout" size={22} strokeWidth={40} color="black" />
				<span>Wyloguj</span>
			</LogOut>
		</DashboardMenuWrapper>
	);
};

export default DashboardMenu;
