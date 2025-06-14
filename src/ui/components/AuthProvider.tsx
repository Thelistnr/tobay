"use client";

// import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
// import { invariant } from "ts-invariant";
// import { createSaleorAuthClient } from "@saleor/auth-sdk";
// import { useState, type ReactNode } from "react";
// import {
// 	type Client,
// 	Provider as UrqlProvider,
// 	cacheExchange,
// 	createClient,
// 	dedupExchange,
// 	fetchExchange,
// } from "urql";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";
// invariant(saleorApiUrl, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

// export const saleorAuthClient = createSaleorAuthClient({
// 	saleorApiUrl,
// });

// const makeUrqlClient = () => {
// 	return createClient({
// 		url: saleorApiUrl,
// 		suspense: true,
// 		// requestPolicy: "cache-first",
// 		fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
// 		exchanges: [dedupExchange, cacheExchange, fetchExchange],
// 	});
// };

// export function AuthProvider({ children }: { children: ReactNode }) {
// 	invariant(saleorApiUrl, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

// 	const [urqlClient, setUrqlClient] = useState<Client>(() => makeUrqlClient());
// 	useAuthChange({
// 		saleorApiUrl,
// 		onSignedOut: () => {
// 			setUrqlClient(makeUrqlClient());
// 		},
// 		onSignedIn: () => {
// 			setUrqlClient(makeUrqlClient());
// 		},
// 	});

// 	return (
// 		<SaleorAuthProvider client={saleorAuthClient}>
// 			<UrqlProvider value={urqlClient}>{children}</UrqlProvider>
// 		</SaleorAuthProvider>
// 	);
// }

// import { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import { ReactNode, useEffect } from "react";

// const saleorApiUrl = "<your Saleor API URL>";

// Saleor Client
// const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });
const saleorAuthClient = createSaleorAuthClient({
	saleorApiUrl,
});

console.log("Auth Client:", saleorAuthClient);

// Apollo Client
const httpLink = createHttpLink({
	uri: saleorApiUrl,
	// fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
	fetch: (input, init) => {
		console.log("Fetch request:", { input, init });
		return saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init);
	},
});

export const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
console.log("Apollo Client initialized with Saleor API URL:", saleorApiUrl);
console.log("Apollo Client:", apolloClient);
// export function AuthProvider({ Component, pageProps }: AppProps) {
export function AuthProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		console.log("AuthProvider mounted");
	}, []);

	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => apolloClient.resetStore(),
		onSignedIn: () => {
			console.log("User signed in");
			apolloClient.refetchQueries({ include: "all" });
		},
	});

	return (
		<SaleorAuthProvider client={saleorAuthClient}>
			<ApolloProvider client={apolloClient}>
				{/* <Component {...pageProps} /> */}
				{children}
			</ApolloProvider>
		</SaleorAuthProvider>
	);
}
