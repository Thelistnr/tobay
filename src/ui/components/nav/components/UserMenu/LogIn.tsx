"use client";

import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import React from "react";
import { ExternalProvider } from "@saleor/auth-sdk";
import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "urql";
import userIcon from "@/assets/icons/userIcon.svg";

export default function LoginSection() {
	const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
	const CurrentUserDocument = gql`
		query CurrentUser {
			me {
				id
				email
				firstName
				lastName
				avatar {
					url
					alt
				}
			}
		}
	`;

	const {
		authURL,
		loading: isLoadingExternalAuth,
		error: externalAuthError,
	} = useSaleorExternalAuth({
		saleorURL: saleorApiUrl || "https://store-lrwhkknb.saleor.cloud/graphql/",
		provider: ExternalProvider.OpenIDConnect,
		redirectURL: "http://localhost:3300/api/auth/callback",
	});
	const [{ data, fetching, error }] = useQuery({ query: CurrentUserDocument });

	const { signOut } = useSaleorAuthContext();

	if (fetching || isLoadingExternalAuth) {
		// return <div>Loading...</div>;
		return (
			<div className="cursor-progress">
				<div className="flex items-center gap-1">
					<Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" />
					<span className="hidden font-medium text-[#344054] md:block">Login/Signup</span>
				</div>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}

	if (error || externalAuthError) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4">
				<h1 className="mb-4 text-2xl font-bold">Error logging in</h1>
				<pre className="bg-muted overflow-auto rounded-md p-4 font-mono text-sm">
					{JSON.stringify(error || externalAuthError, null, 2)}
				</pre>
			</div>
		);
	}

	if (data?.me) {
		return (
			<div>
				{JSON.stringify(data)}
				<button onClick={() => signOut()}>Logout</button>
			</div>
		);
	}
	if (authURL) {
		return (
			<div>
				<Link href={authURL}>
					<div className="flex items-center gap-1">
						<Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" />
						<span className="hidden font-medium text-[#344054] md:block">Login/Signup</span>
					</div>
					<span className="sr-only">Log in</span>
				</Link>
			</div>
		);
	}
	return <div>Something went wrong</div>;
}
