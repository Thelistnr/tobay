import { NextRequest, NextResponse } from "next/server";

const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";
const SALEOR_APP_URL = process.env.NEXT_PUBLIC_SALEOR_APP_URL || "http://localhost:3300";

export async function POST(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (token) {
      // Call Saleor's token revocation endpoint
      await fetch(SALEOR_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              tokenDelete {
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
    }

    // Create response
    const response = NextResponse.json({ success: true });

    // Clear all auth-related cookies
    response.cookies.delete("token");
    response.cookies.delete("clientToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("csrfToken");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
} 