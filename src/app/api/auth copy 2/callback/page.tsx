/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { createSaleorExternalAuthHandler } from "@saleor/auth-sdk/next";
import { usePathname, useSearchParams } from "next/navigation";

const externalAuth = new SaleorExternalAuth(
	"https://store-lrwhkknb.saleor.cloud/graphql/",
	ExternalProvider.OpenIDConnect,
);
// NEXT_PUBLIC_SALEOR_API_URL=https://store-lrwhkknb.saleor.cloud/graphql/

// NEXT_PUBLIC_STOREFRONT_URL=http://localhost:3300

// NEXT_PUBLIC_API_BASE_URL=https://store-lrwhkknb.saleor.cloud/graphql/

console.log("External Auth Initialized", externalAuth);
// console.log("Saleor API URL Inner:", process.env.NEXT_PUBLIC_SALEOR_API_URL);
console.log("External Provider Inner:", ExternalProvider.OpenIDConnect);

import React from "react";

export default function page() {
	// console.log("Saleor API URL:", process.env.NEXT_PUBLIC_SALEOR_API_URL);
	// console.log("External Provider:", ExternalProvider.OpenIDConnect);
	const param = useSearchParams();
	const state = param.get("state");
	console.log("State Param:", state);
	const code = param.get("code");
	console.log("Code Param:", code);
	console.log("Search Params:", param);
	const useLocation = usePathname();
	console.log("useLocation:", useLocation);
	// console.log(window.location.href);

	return <div>page</div>;
}

// export default createSaleorExternalAuthHandler(externalAuth);
// console.log(createSaleorExternalAuthHandler(externalAuth));
