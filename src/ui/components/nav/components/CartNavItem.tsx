// import { ShoppingBagIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import * as Checkout from "@/lib/checkout";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import cartIcon from "@/assets/icons/cartIcon.svg";

export const CartNavItem = async ({ channel }: { channel: string }) => {
	const checkoutId = Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId) : null;

	const lineCount = checkout ? checkout.lines.reduce((result, line) => result + line.quantity, 0) : 0;

	return (
		<LinkWithChannel href="/cart" className="relative flex items-center" data-testid="CartNavItem">
			{/* <ShoppingBagIcon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
			<Image src={cartIcon} alt="cart" className="w-7 shrink-0" aria-hidden="true" />
			{lineCount > 0 ? (
				<div
					className={clsx(
						"absolute -top-1 right-0 -mr-1 mt-0 flex h-4 min-w-4 flex-col items-center justify-center rounded-full bg-[#F56630] text-[8px] font-semibold text-white",
						lineCount > 9 ? "w-[3ch]" : "w-[2ch]",
					)}
				>
					{lineCount} <span className="sr-only">item{lineCount > 1 ? "s" : ""} in cart, view bag</span>
				</div>
			) : (
				<span className="sr-only">0 items in cart</span>
			)}
		</LinkWithChannel>
	);
};
