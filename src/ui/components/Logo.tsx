"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import logo from "../../app/Tobay Icon.svg";
// const companyName = "TOBAY";

interface LogoImageProps {
	width: number;
	height?: number;
	className?: string;
}

const LogoImage = ({ width, height, className }: LogoImageProps) => (
	<Image src={logo} alt="TOBAY" width={width} height={height} className={className} />
);

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex items-center font-bold" aria-label="homepage">
				{/* {companyName} */}
				<LogoImage width={97} />
			</h1>
		);
	}
	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="homepage" href="/">
				{/* {companyName} */}
				<LogoImage width={97} />
			</LinkWithChannel>
		</div>
	);
};
