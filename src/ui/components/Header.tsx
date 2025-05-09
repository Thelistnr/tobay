import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";
import { NavMob } from "./nav/NavMob";
export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className="hidden h-16 justify-between gap-4 md:flex md:gap-8">
					<Logo />
					<Nav channel={channel} />
				</div>
				<div className="flex h-[120px] items-center justify-center gap-4 md:hidden">
					<NavMob channel={channel} />
				</div>
			</div>
		</header>
	);
}
