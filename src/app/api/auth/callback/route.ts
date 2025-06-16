/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @next/next/no-img-element */

import { ExternalProvider } from "@saleor/auth-sdk";
import { NextRequest } from "next/server";


interface ExternalObtainAccessTokensResponse {
  data?: {
    externalObtainAccessTokens: {
      token: string;
      refreshToken: string;
      csrfToken: string;
      user: {
        id: string;
        email: string;
      };
      errors: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

interface ExternalAuthentication {
  id: string;
  name: string;
}

interface ShopQueryResponse {
  data?: {
    shop: {
      availableExternalAuthentications: ExternalAuthentication[];
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  if (!state || !code) {
    return new Response("Missing required parameters", { status: 400 });
  }

  try {
    // Call the Saleor API to exchange the code for tokens
    const response = await fetch("https://store-lrwhkknb.saleor.cloud/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation ExternalObtainAccessTokens($input: JSONString!, $pluginId: String!) {
            externalObtainAccessTokens(input: $input, pluginId: $pluginId) {
              token
              refreshToken
              csrfToken
              user {
                id
                email
              }
              errors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: JSON.stringify({
            code,
            state,
            provider: ExternalProvider.OpenIDConnect,
          }),
          pluginId: "openid-connect", 
        },
      }),
    });

    const data = (await response.json()) as ExternalObtainAccessTokensResponse;
    
    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!data.data?.externalObtainAccessTokens) {
      return new Response(JSON.stringify({ error: "No data received" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Set the tokens in cookies
    const tokens = data.data.externalObtainAccessTokens;
    const headers = new Headers();
    headers.append("Set-Cookie", `token=${tokens.token}; Path=/; HttpOnly; SameSite=Lax`);
    headers.append("Set-Cookie", `refreshToken=${tokens.refreshToken}; Path=/; HttpOnly; SameSite=Lax`);
    headers.append("Set-Cookie", `csrfToken=${tokens.csrfToken}; Path=/; HttpOnly; SameSite=Lax`);

    // Redirect to the home page
    return new Response(null, {
      status: 302,
      headers: {
        ...Object.fromEntries(headers.entries()),
        Location: "/"
      }
    });
  } catch (error) {
    console.error("Auth error:", error);
    return new Response(JSON.stringify({ error: "Authentication failed" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 