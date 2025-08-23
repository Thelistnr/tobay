import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
if (!saleorApiUrl) throw new Error("NEXT_PUBLIC_SALEOR_URL is not set");

const externalAuth = new SaleorExternalAuth(saleorApiUrl, ExternalProvider.OpenIDConnect);
// const accessTokenRepo = accessTokenStorage ?? getInMemoryAccessTokenStorage();
// this.acessTokenStorage = new SaleorAccessTokenStorageHandler(accessTokenRepo, saleorApiUrl);

// And this is used to generate the token's key:
export const getAccessTokenKey = (prefix?: string) =>
	[prefix, "saleor_auth_access_token"].filter(Boolean).join("+");

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const state = searchParams.get("state");
	const code = searchParams.get("code");

	if (!state || !code) {
		throw new Error("Missing state or code");
	}

	const { token } = await externalAuth.obtainAccessToken({ state, code });

	const response = NextResponse.redirect(new URL("/", request.nextUrl));

	response.headers.set("Set-Cookie", serialize(getAccessTokenKey(saleorApiUrl), token, { path: "/" }));

	return response;
}

// response.headers.set("Set-Cookie", serialize(getAccessTokenKey(saleorApiUrl), token, { path: "/" }));
