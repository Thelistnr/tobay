"use client";

import { useTransition } from "react";
import Image from "next/image";
import { deleteLineFromCheckout } from "./actions";
import binIcon from "@/assets/icons/binIcon.svg";
import binIconDisabled from "@/assets/icons/binUncol.svg";

type Props = {
	lineId: string;
	checkoutId: string;
};

export const DeleteLineButton = ({ lineId, checkoutId }: Props) => {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			type="button"
			className="text-sm text-neutral-500 hover:text-neutral-900"
			onClick={() => {
				if (isPending) return;
				startTransition(() => deleteLineFromCheckout({ lineId, checkoutId }));
			}}
			aria-disabled={isPending}
		>
			{/* {isPending ? "Removing" : "Remove"} */}
			{isPending ? (
				<Image src={binIcon} alt="spinner" width={20} height={20} />
			) : (
				<Image src={binIconDisabled} alt="trash" width={20} height={20} />
			)}
			<span className="sr-only">line from cart</span>
		</button>
	);
};
