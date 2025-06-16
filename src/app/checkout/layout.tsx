import { type ReactNode } from "react";

export const metadata = {
	title: "Tobay Stores",
	description: "One stop store for all your needs.",
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<main>
			{props.children}
		</main>
	);
}
