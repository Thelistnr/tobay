"use client";
import { ErrorBoundary } from "react-error-boundary";
import {
	type Client,
	Provider as UrqlProvider,
	cacheExchange,
	createClient,
	dedupExchange,
	fetchExchange,
} from "urql";

import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { alertsContainerProps } from "./hooks/useAlerts/consts";
import { RootViews } from "./views/RootViews";
import { PageNotFound } from "@/checkout/views/PageNotFound";
import { useAuth } from "@/ui/components/AuthProvider";
import "./index.css";

export const Root = ({ saleorApiUrl }: { saleorApiUrl: string }) => {
	const { isAuthenticated } = useAuth();

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: "cache-first",
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());

	// Update client when auth state changes
	useEffect(() => {
		setUrqlClient(makeUrqlClient());
	}, [isAuthenticated]);

	return (
		<UrqlProvider value={urqlClient}>
			<ToastContainer {...alertsContainerProps} />
			<ErrorBoundary FallbackComponent={PageNotFound}>
				<RootViews />
			</ErrorBoundary>
		</UrqlProvider>
	);
};
