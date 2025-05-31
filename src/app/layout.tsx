import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
// import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
// import { createSaleorAuthClient } from "@saleor/auth-sdk";
// import { type Client, Provider, cacheExchange, createClient, dedupExchange, fetchExchange } from "urql";
// import { useState } from "react";
// import { invariant } from "ts-invariant";
import { AuthProvider } from "@/ui/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

// const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
// invariant(saleorApiUrl, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

// const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

// const makeUrqlClient = () => {
// 	return createClient({
// 		url: saleorApiUrl,
// 		suspense: true,
// 		// requestPolicy: "cache-first",
// 		fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
// 		exchanges: [dedupExchange, cacheExchange, fetchExchange],
// 	});
// };

export const metadata: Metadata = {
	title: "Tobay Stores",
	description: "One stop store for all your needs.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;
	// const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";
	// invariant(saleorApiUrl, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	// const [urqlClient, setUrqlClient] = useState<Client>(() => makeUrqlClient());
	// useAuthChange({
	// 	saleorApiUrl,
	// 	onSignedOut: () => setUrqlClient(makeUrqlClient()),
	// 	onSignedIn: () => setUrqlClient(makeUrqlClient()),
	// });

	return (
		<html lang="en" className="min-h-dvh">
			{/* <SaleorAuthProvider client={saleorAuthClient}>
				<Provider value={urqlClient}> */}
			<AuthProvider>
				<body className={`${inter.className} min-h-dvh`}>
					{children}
					<DraftModeNotification />
				</body>
			</AuthProvider>
			{/* </Provider>
			</SaleorAuthProvider> */}
		</html>
	);
}
