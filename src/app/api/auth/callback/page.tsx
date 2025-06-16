"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  useEffect(() => {
    if (!state || !code) {
      router.push("/login?error=missing_parameters");
      return;
    }

    // The actual authentication will be handled by the API route
    // This component just shows a loading state
  }, [state, code, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold">Completing Authentication</h1>
        <p className="text-gray-600">Please wait while we complete your authentication...</p>
      </div>
    </div>
  );
} 