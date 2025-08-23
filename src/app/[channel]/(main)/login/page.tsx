"use client";

import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import React from "react";
import { ExternalProvider } from "@saleor/auth-sdk";
import Link from "next/link";
// import { gql, useQuery } from "@apollo/client";
import { gql, useQuery } from "urql";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL!;
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

// export default function LoginPage() {
// 	const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
// 	const {
// 		loading: isLoadingCurrentUser,
// 		error,
// 		data,
// 	} = useQuery(gql`
// 		query CurrentUser {
// 			me {
// 				id
// 				email
// 				firstName
// 				lastName
// 			}
// 		}
// 	`);

// 	const { authURL, loading: isLoadingExternalAuth } = useSaleorExternalAuth({
// 		saleorURL: saleorApiUrl,
// 		provider: ExternalProvider.OpenIDConnect,
// 		redirectURL: "http://localhost:3000/api/auth/callback",
// 	});

// 	const { signOut } = useSaleorAuthContext();

// 	if (isLoadingExternalAuth || isLoadingCurrentUser) {
// 		return <div>Loading...</div>;
// 	}

// 	if (data?.me) {
// 		return (
// 			<div>
// 				{JSON.stringify(data)}
// 				<button onClick={() => signOut()}>Logout</button>
// 			</div>
// 		);
// 	}
// 	if (authURL) {
// 		return (
// 			<div>
// 				<Link href={authURL}>Login</Link>
// 			</div>
// 		);
// 	}
// 	return <div>Something went wrong</div>;
// }

export default function LoginPage() {
	const [{ data, fetching, error }] = useQuery({ query: CurrentUserDocument });

	const {
		authURL,
		loading: isLoadingExternalAuth,
		error: externalAuthError,
	} = useSaleorExternalAuth({
		saleorURL: saleorApiUrl,
		provider: ExternalProvider.OpenIDConnect,
		redirectURL: "http://localhost:3000/api/auth/callback",
	});

	const { signOut } = useSaleorAuthContext();

	if (fetching || isLoadingExternalAuth) {
		return <div>Loading...</div>;
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

	if (data.me) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4">
				<h1 className="mb-4 text-2xl font-bold">Successfully logged in</h1>
				<p>Your user information fetched from Saleor GraphQL API</p>
				<pre className="bg-muted overflow-auto rounded-md p-4 font-mono text-sm">
					{JSON.stringify(data, null, 2)}
				</pre>
				<button onClick={() => signOut()}>Logout</button>
			</div>
		);
	}

	if (authURL) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4 ">
				<h1 className="mb-4 text-2xl font-bold">Welcome to Saleor Auth Example</h1>
				<div>
					<p>
						Click button below to login with OIDC provider. Don&apos;t forget to check our{" "}
						<a
							href="https://docs.saleor.io/api-usage/authentication#oidc-single-sign-on-sso-flow"
							className="text-blue-500 underline"
							target="_blank"
						>
							docs
						</a>{" "}
						on how to configure Saleor auth with OIDC.
					</p>
				</div>

				<Link href={authURL}>Login</Link>
			</div>
		);
	}

	return <div>Something went wrong</div>;
}
