"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps, forwardRef } from "react";

export const LinkWithChannel = forwardRef<
	HTMLAnchorElement,
	Omit<ComponentProps<typeof Link>, "href"> & { href: string }
>(({ href, ...props }, ref) => {
	const { channel } = useParams<{ channel?: string }>();

	if (!href.startsWith("/")) {
		return <Link {...props} href={href} ref={ref} />;
	}

	const encodedChannel = encodeURIComponent(channel ?? "");
	const hrefWithChannel = `/${encodedChannel}${href}`;
	return <Link {...props} href={hrefWithChannel} ref={ref} />;
});

LinkWithChannel.displayName = "LinkWithChannel";
