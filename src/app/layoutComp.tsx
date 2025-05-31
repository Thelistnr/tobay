/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode , useState } from "react";
// import { type Metadata } from "next";
// import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { SaleorAuthProvider, useAuthChange, useSaleorAuthContext } from "@saleor/auth-sdk/react";
// import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { type Client, Provider, cacheExchange, createClient, dedupExchange, fetchExchange } from "urql";

const inter = Inter({ subsets: ["latin"] });

// const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

// export const metadata: Metadata = {
// 	title: "Tobay Stores",
// 	description: "One stop store for all your needs.",
// 	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
// 		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
// 		: undefined,
// };

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;
	const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";
	const saleorAuthClient = useSaleorAuthContext();

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: "cache-first",
			fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());
	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	return (
		<html lang="en" className="min-h-dvh">
			<SaleorAuthProvider client={saleorAuthClient}>
				<Provider value={urqlClient}>
					<body className={`${inter.className} min-h-dvh`}>
						{children}
						{/* <DraftModeNotification /> */}
					</body>
				</Provider>
			</SaleorAuthProvider>
		</html>
	);
}
