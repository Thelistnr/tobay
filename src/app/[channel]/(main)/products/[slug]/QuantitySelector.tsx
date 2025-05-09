"use client";
import { useState } from "react";

interface QuantitySelectorProps {
	max?: number;
	min?: number;
	onChange?: (quantity: number) => void;
	initialValue?: number;
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 99;

export function QuantitySelector({
	max = DEFAULT_MAX,
	min = DEFAULT_MIN,
	onChange,
	initialValue = min,
}: QuantitySelectorProps) {
	const [qty, setQty] = useState(initialValue);

	const setQuantity = (newQty: number) => {
		const clampedQty = Math.min(Math.max(newQty, min), max);
		setQty(clampedQty);
		onChange?.(clampedQty);
	};

	const decrement = () => setQuantity(qty - 1);
	const increment = () => setQuantity(qty + 1);

	return (
		<div className="flex items-center gap-4">
			<span className="font-semibold text-[#475367]">Qty</span>
			<div className="flex items-center rounded-lg border border-[#E5E7EB] bg-white p-1">
				<button
					type="button"
					className="px-2 text-2xl text-[#344054] disabled:opacity-50"
					onClick={decrement}
					disabled={qty <= min}
					aria-label="Decrease quantity"
				>
					–
				</button>
				<span className="mx-2 w-6 text-center font-semibold text-[#1A202C]">{qty}</span>
				<button
					type="button"
					className="px-2 text-2xl text-[#344054] disabled:opacity-50"
					onClick={increment}
					disabled={qty >= max}
					aria-label="Increase quantity"
				>
					+
				</button>
			</div>
			{/* <input type="hidden" name="quantity" value={qty} /> */}
		</div>
	);
}
