// import { UserIcon } from "lucide-react";
import Image from "next/image";
import { UserMenu } from "./UserMenu";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import userIcon from "@/assets/icons/userIcon.svg";

export async function UserMenuContainer() {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	if (user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<LinkWithChannel href="/login" className="h-7 w-7 flex-shrink-0">
				{/* <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
				<Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" />
				<span className="sr-only">Log in</span>
			</LinkWithChannel>
		);
	}
}
