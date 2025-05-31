// import { UserIcon } from "lucide-react";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
import { UserMenu } from "./UserMenu";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import userIcon from "@/assets/icons/userIcon.svg";
import Image from "next/image";
export async function UserMenuContainer() {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	if (user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<LinkWithChannel href="/login" className="h-7 w-7 flex-shrink-0 md:w-max">
				{/* <LinkWithChannel href="/login" className="h-7 w-7 flex-shrink-0"> */}
				{/* <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
				<div className="flex items-center gap-1">
					<Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" />
					<span className="hidden font-medium text-[#344054] md:block">Login/Signup</span>
				</div>
				<span className="sr-only">Log in</span>
			</LinkWithChannel>
		);
	}
}
