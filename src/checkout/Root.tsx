"use client";
import { ErrorBoundary } from "react-error-boundary";

import { makeUrqlClient, saleorAuthClient } from "@/lib/urql-client";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import { useState } from "react";
import { Client, Provider } from "urql";
import { ToastContainer } from "react-toastify";
import { alertsContainerProps } from "./hooks/useAlerts/consts";
import { RootViews } from "./views/RootViews";
import { PageNotFound } from "@/checkout/views/PageNotFound";
import "./index.css";

export const Root = ({ saleorApiUrl }: { saleorApiUrl: string }) => {
	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());

	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	return (
		<SaleorAuthProvider client={saleorAuthClient}>
			<Provider value={urqlClient}>
				<ToastContainer {...alertsContainerProps} />
				<ErrorBoundary FallbackComponent={PageNotFound}>
					<RootViews />
				</ErrorBoundary>
			</Provider>
		</SaleorAuthProvider>
	);
};
