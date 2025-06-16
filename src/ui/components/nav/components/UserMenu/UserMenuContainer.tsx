"use client";

// import { UserIcon } from "lucide-react";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
import { useAuth } from "@/ui/components/AuthProvider";
import userIcon from "@/assets/icons/userIcon.svg";
import Image from "next/image";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { UserMenu } from "./UserMenu";
import { useEffect } from "react";

export function UserMenuContainer() {
	const { user, isAuthenticated, signIn, loading } = useAuth();

	useEffect(() => {
		console.log('Auth State:', { isAuthenticated, user, loading });
	}, [isAuthenticated, user, loading]);

	if (loading) {
		return (
			<div className="h-7 w-7 flex-shrink-0 md:w-max">
				<div className="flex items-center gap-1">
					<Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" />
					<span className="hidden font-medium text-[#344054] md:block">Loading...</span>
				</div>
			</div>
		);
	}

	if (isAuthenticated && user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<button
				onClick={signIn}
				className="h-7 w-7 flex-shrink-0 md:w-max"
				style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
			>
				<div className="flex items-center gap-1">
					<Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" />
					<span className="hidden font-medium text-[#344054] md:block">Login/Signup</span>
				</div>
				<span className="sr-only">Log in</span>
			</button>
		);
	}
}
