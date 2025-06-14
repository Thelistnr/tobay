// import { Suspense } from "react";
// import { Loader } from "@/ui/atoms/Loader";
// import { LoginForm } from "@/ui/components/LoginForm";

// export default function LoginPage() {
// 	return (
// 		<Suspense fallback={<Loader />}>
// 			<section className="mx-auto max-w-7xl p-8">
// 				<LoginForm />
// 			</section>
// 		</Suspense>
// 	);
// }
"use client";
import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import React from "react";
import { ExternalProvider } from "@saleor/auth-sdk";
// import { useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

export default function LoginPage() {
	const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
	const {
		loading: isLoadingCurrentUser,
		error,
		data,
	} = useQuery(gql`
		query CurrentUser {
			me {
				id
				email
				firstName
				lastName
			}
		}
	`);

	const { authURL, loading: isLoadingExternalAuth } = useSaleorExternalAuth({
		saleorURL: saleorApiUrl || "https://tobay.saleor.cloud/graphql/",
		provider: ExternalProvider.OpenIDConnect,
		redirectURL: "http://localhost:3300/api/auth/callback",
		// redirectURL: "http://localhost:3300/main-channel/api/auth/callback",
	});

	const { signOut } = useSaleorAuthContext();

	if (isLoadingExternalAuth || isLoadingCurrentUser) {
		return <div>Loading...</div>;
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
				<Link href={authURL}>Login</Link>
			</div>
		);
	}
	return <div>Something went wrong</div>;
}
