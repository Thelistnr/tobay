"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import Image from "next/image";
import logo from "../../app/Tobay Icon.svg";
// const companyName = "TOBAY";

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex items-center font-bold" aria-label="homepage">
				{/* {companyName} */}
				<Image src={logo} alt="TOBAY" width={97} />
			</h1>
		);
	}
	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="homepage" href="/">
				{/* {companyName} */}
				<Image src={logo} alt="TOBAY" width={97} />
			</LinkWithChannel>
		</div>
	);
};
