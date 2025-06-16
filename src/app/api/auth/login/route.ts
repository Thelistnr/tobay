import { NextResponse } from "next/server";

const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";
const SALEOR_APP_URL = process.env.NEXT_PUBLIC_SALEOR_APP_URL || "http://localhost:3300";

interface AuthResponse {
  data?: {
    externalAuthenticationUrl?: {
      authenticationData?: string;
      errors?: Array<{
        field: string;
        message: string;
        code: string;
      }>;
    };
  };
}

interface AuthData {
  authorizationUrl: string;
}

export async function GET() {
  try {
    console.log("Starting OIDC login flow...");

    // Get the authorization URL
    const authResponse = await fetch(SALEOR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            externalAuthenticationUrl(
              pluginId: "mirumee.authentication.openidconnect",
              input: "{\\"redirectUri\\":\\"${SALEOR_APP_URL}/api/auth/callback\\"}"
            ) {
              authenticationData
              errors {
                field
                message
                code
              }
            }
          }
        `,
      }),
    });

    const authData = (await authResponse.json()) as AuthResponse;
    console.log("Auth response:", JSON.stringify(authData, null, 2));

    const authErrors = authData.data?.externalAuthenticationUrl?.errors;
    if (authErrors && authErrors.length > 0) {
      console.error("Auth URL errors:", authErrors);
      return NextResponse.redirect(
        `${SALEOR_APP_URL}/auth/error?error=${authErrors[0].code}`
      );
    }

    const authDataString = authData.data?.externalAuthenticationUrl?.authenticationData;
    if (!authDataString) {
      console.error("No authentication data returned");
      return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=no_auth_data`);
    }

    try {
      const parsedAuthData = JSON.parse(authDataString) as AuthData;
      const authUrl = parsedAuthData.authorizationUrl;
      
      if (!authUrl) {
        console.error("No authorization URL in authentication data");
        return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=no_auth_url`);
      }

      console.log("Redirecting to auth URL:", authUrl);
      return NextResponse.redirect(authUrl);
    } catch (parseError) {
      console.error("Failed to parse authentication data:", parseError);
      return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=invalid_auth_data`);
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=login_failed`);
  }
} 