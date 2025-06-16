"use client";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ReactNode, createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL || "https://tobay.saleor.cloud/graphql/";

// Function to get token from cookies
const getTokenFromCookies = () => {
	if (typeof document === 'undefined') return null;
	const cookies = document.cookie.split(';');
	const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('clientToken='));
	return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
};

// Function to set token in cookies
const setTokenInCookies = (token: string) => {
	document.cookie = `clientToken=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;
};

export interface User {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	avatar?: {
		url: string;
		alt?: string;
	};
	userPermissions: Array<{
		code: string;
		name: string;
	}>;
	isStaff: boolean;
	isActive: boolean;
}

interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
	refreshToken: () => Promise<void>;
	clearError: () => void;
}

// Create Apollo client
const apolloClient = new ApolloClient({
	link: createHttpLink({
		uri: saleorApiUrl,
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getTokenFromCookies()}`,
		},
	}),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "network-only",
		},
		query: {
			fetchPolicy: "network-only",
		},
	},
});

// Create context with default values
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const clearError = useCallback(() => setError(null), []);

	const refreshToken = useCallback(async () => {
		try {
			const response = await fetch("/api/auth/refresh", {
				method: "POST",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Token refresh failed");
			}

			// Update Apollo client headers with new token
			const token = getTokenFromCookies();
			apolloClient.setLink(createHttpLink({
				uri: saleorApiUrl,
				credentials: "include",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			}));

			await checkAuth();
		} catch (error) {
			console.error("Token refresh failed:", error);
			await signOut();
			throw error;
		}
	}, []);

	const checkAuth = useCallback(async () => {
		try {
			setLoading(true);
			console.log('Checking auth...');
			const token = getTokenFromCookies();
			console.log('Current token:', token);

			if (!token) {
				console.log('No token found');
				setUser(null);
				setIsAuthenticated(false);
				return;
			}

			// Update Apollo client headers with current token
			apolloClient.setLink(createHttpLink({
				uri: saleorApiUrl,
				credentials: "include",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			}));

			const response = await apolloClient.query({
				query: gql`
					query Me {
						me {
							id
							email
							firstName
							lastName
							avatar {
								url
								alt
							}
							userPermissions {
								code
								name
							}
							isStaff
							isActive
						}
					}
				`,
				fetchPolicy: "network-only",
			});

			console.log('Auth response:', response);

			if (response.data?.me) {
				console.log('User authenticated:', response.data.me);
				setUser(response.data.me);
				setIsAuthenticated(true);
				setError(null);
			} else {
				console.log('No user data in response');
				setUser(null);
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error("Auth check failed:", error);
			setUser(null);
			setIsAuthenticated(false);
			setError("Authentication failed. Please try logging in again.");
		} finally {
			setLoading(false);
		}
	}, []);

	const signIn = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			// Redirect to the OIDC login endpoint
			window.location.href = "/api/auth/login";
		} catch (error) {
			console.error("Sign in failed:", error);
			setError(error instanceof Error ? error.message : "Sign in failed");
			throw error;
		} finally {
			setLoading(false);
		}
	}, []);

	const signOut = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			// Call the logout API endpoint
			const response = await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Logout failed");
			}

			// Clear cookies on the client side as well
			document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			document.cookie = "clientToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			document.cookie = "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			document.cookie = "csrfToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

			// Update Apollo client headers to remove token
			apolloClient.setLink(createHttpLink({
				uri: saleorApiUrl,
				credentials: "include",
				headers: {
					'Content-Type': 'application/json',
				},
			}));

			// Reset Apollo cache
			await apolloClient.resetStore();

			// Update state
			setUser(null);
			setIsAuthenticated(false);
			router.push("/login");
		} catch (error) {
			console.error("Sign out failed:", error);
			setError("Sign out failed. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [router]);

	// Memoize the context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			isAuthenticated,
			user,
			loading,
			error,
			signIn,
			signOut,
			refreshToken,
			clearError,
		}),
		[isAuthenticated, user, loading, error, signIn, signOut, refreshToken, clearError]
	);

	// Add effect to check auth when component mounts
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// Add effect to handle auth callback
	useEffect(() => {
		const handleAuthCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const token = urlParams.get('token');
			
			if (token) {
				console.log('Setting token from URL:', token);
				setTokenInCookies(token);
				await checkAuth();
				// Remove token from URL
				window.history.replaceState({}, document.title, window.location.pathname);
			}
		};

		handleAuthCallback();
	}, [checkAuth]);

	// Set up token refresh interval
	useEffect(() => {
		const refreshInterval = setInterval(() => {
			if (isAuthenticated) {
				refreshToken().catch(console.error);
			}
		}, 14 * 60 * 1000); // Refresh every 14 minutes

		return () => clearInterval(refreshInterval);
	}, [isAuthenticated, refreshToken]);

	return (
		<AuthContext.Provider value={contextValue}>
			<ApolloProvider client={apolloClient}>
				{children}
			</ApolloProvider>
		</AuthContext.Provider>
	);
}

// Custom hook to use auth context
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
