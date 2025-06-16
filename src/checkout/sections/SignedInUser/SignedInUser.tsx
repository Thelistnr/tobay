import React from "react";
import { useAuth } from "@/ui/components/AuthProvider";

export const SignedInUser = () => {
	const { user, signOut } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center space-x-4">
			<div>
				<p className="text-sm font-medium text-gray-900">
					{user.firstName} {user.lastName}
				</p>
				<p className="text-sm text-gray-500">{user.email}</p>
			</div>
			<button
				onClick={() => signOut()}
				className="text-sm text-gray-500 hover:text-gray-700"
			>
				Sign out
			</button>
		</div>
	);
};
