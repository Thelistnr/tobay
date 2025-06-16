/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @next/next/no-img-element */

import { NextRequest, NextResponse } from "next/server";

const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";
const SALEOR_APP_URL = process.env.NEXT_PUBLIC_SALEOR_APP_URL || "http://localhost:3300";

interface TokenResponse {
  data?: {
    externalObtainAccessTokens?: {
      token?: string;
      refreshToken?: string | null;
      user?: {
        id: string;
        email: string;
      };
      errors?: Array<{
        field: string;
        message: string;
        code: string;
      }>;
    };
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      console.error("Missing code or state in callback");
      return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=missing_params`);
    }

    console.log("Received OIDC callback with code and state");

    // Exchange the code for tokens
    const tokenResponse = await fetch(SALEOR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            externalObtainAccessTokens(
              pluginId: "mirumee.authentication.openidconnect",
              input: "{\\"code\\":\\"${code}\\",\\"state\\":\\"${state}\\"}"
            ) {
              token
              refreshToken
              user {
                id
                email
              }
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

    const tokenData = (await tokenResponse.json()) as TokenResponse;
    console.log("Token response:", JSON.stringify(tokenData, null, 2));

    const tokenErrors = tokenData.data?.externalObtainAccessTokens?.errors;
    if (tokenErrors && tokenErrors.length > 0) {
      console.error("Token errors:", tokenErrors);
      return NextResponse.redirect(
        `${SALEOR_APP_URL}/auth/error?error=${tokenErrors[0].code}`
      );
    }

    const token = tokenData.data?.externalObtainAccessTokens?.token;
    if (!token) {
      console.error("No access token returned");
      return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=no_access_token`);
    }

    // Store token in cookie
    const response = NextResponse.redirect(`${SALEOR_APP_URL}/dashboard`);
    
    // Set HTTP-only cookie for security
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // Set non-HTTP-only cookie for client-side access
    response.cookies.set("clientToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // Only set refresh token if it exists
    const refreshToken = tokenData.data?.externalObtainAccessTokens?.refreshToken;
    if (refreshToken) {
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(`${SALEOR_APP_URL}/auth/error?error=callback_failed`);
  }
} 