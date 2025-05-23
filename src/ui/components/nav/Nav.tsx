import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
// import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex w-full justify-between gap-4 lg:gap-6" aria-label="Main navigation">
			<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul>
			<div className="hidden md:flex">
				<SearchBar channel={channel} />
			</div>
			<div className="flex items-center gap-4 lg:gap-6">
				<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
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
		</nav>
	);
};
