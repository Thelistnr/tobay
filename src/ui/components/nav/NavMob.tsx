/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";
import { Logo } from "../Logo";

export const NavMob = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex w-full flex-col items-center gap-3.5" aria-label="Main navigation">
			<div className="flex w-full justify-between gap-4 lg:gap-6">
				<Suspense>
					<MobileMenu>
						<SearchBar channel={channel} />
						<NavLinks channel={channel} />
					</MobileMenu>
				</Suspense>
				{/* <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
					<NavLinks channel={channel} />
				</ul> */}
				<Logo />
				<div className="flex items-center justify-between gap-3">
					<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
						<div className="hidden lg:flex">
							<SearchBar channel={channel} />
						</div>
						<Suspense fallback={<div className="w-8" />}>
							<UserMenuContainer />
						</Suspense>
					</div>
					<div className="flex items-center">
						<Suspense fallback={<div className="w-6" />}>
							<CartNavItem channel={channel} />
						</Suspense>
					</div>
				</div>
			</div>
			<div className="flex w-full">
				<SearchBar channel={channel} />
			</div>
		</nav>
	);
};
