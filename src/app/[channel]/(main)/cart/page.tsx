import Image from "next/image";
import { CheckoutLink } from "./CheckoutLink";
import { DeleteLineButton } from "./DeleteLineButton";
import * as Checkout from "@/lib/checkout";
import { formatMoney, getHrefForVariant } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import emptyCart from "@/assets/images/emptyBag.svg";

interface Money {
	amount: number;
	currency: string;
}

interface Price {
	gross: Money;
}

interface ProductVariant {
	id: string;
	name: string;
	product: {
		name: string;
		slug: string;
		thumbnail?: {
			url: string;
			alt: string | null;
		};
		category?: {
			name: string;
		};
	};
}

interface CheckoutLine {
	id: string;
	quantity: number;
	variant: ProductVariant;
	totalPrice: Price;
}

interface CheckoutData {
	id: string;
	lines: CheckoutLine[];
	totalPrice: Price;
}

export const metadata = {
	title: "Shopping Cart · Saleor Storefront example",
};

export default async function Page({ params }: { params: { channel: string } }) {
	const checkoutId = Checkout.getIdFromCookies(params.channel);
	const checkout = (await Checkout.find(checkoutId)) as CheckoutData | null;

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className="mx-auto max-w-7xl bg-[#F7F9FC] px-4 py-8 md:px-8">
				<h1 className=" text-2xl font-bold text-neutral-900 md:text-3xl">Your Shopping Cart</h1>
				<div className="my-[52px] flex min-h-[calc(90vh-270px)] flex-col items-center justify-center md:min-h-[calc(90vh-214px)]">
					<Image src={emptyCart} alt="Empty shopping cart" width={101.36} />
					<h2 className="mt-6 text-[18px] font-semibold text-neutral-900">Your shopping cart is empty</h2>
					<p className="mb-[19px] mt-2 text-sm text-neutral-500">Start adding your favorite items in it.</p>
					<LinkWithChannel
						href="/products"
						className="inline-block max-w-max rounded-lg border border-transparent bg-[#F56630] px-3 py-3 text-center font-medium text-white hover:bg-[#F56630]/80 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500"
					>
						Start shopping
					</LinkWithChannel>
				</div>
				{/* <p className="my-12 text-sm text-neutral-500">
					Looks like you haven't added any items to the cart yet.
				</p>
				<LinkWithChannel
					href="/products"
					className="inline-block max-w-full rounded border border-transparent bg-neutral-900 px-6 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500 sm:px-16"
				>
					Explore products
				</LinkWithChannel> */}
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-7xl bg-[#F7F9FC] px-4 py-8 md:px-8">
			<h1 className="mt-8 text-3xl font-bold text-neutral-900">Your Shopping Cart</h1>
			{/* <form className="mt-12">
				<ul
					data-testid="CartProductList"
					role="list"
					className="divide-y divide-neutral-200 border-b border-t border-neutral-200"
				>
					{checkout.lines.map((item) => (
						<li key={item.id} className="flex py-4">
							<div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-50 sm:h-32 sm:w-32">
								{item.variant?.product?.thumbnail?.url && (
									<Image
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ""}
										width={200}
										height={200}
										className="h-full w-full object-contain object-center"
									/>
								)}
							</div>
							<div className="relative flex flex-1 flex-col justify-between p-4 py-2">
								<div className="flex justify-between justify-items-start gap-4">
									<div>
										<LinkWithChannel
											href={getHrefForVariant({
												productSlug: item.variant.product.slug,
												variantId: item.variant.id,
											})}
										>
											<h2 className="font-medium text-neutral-700">{item.variant?.product?.name}</h2>
										</LinkWithChannel>
										<p className="mt-1 text-sm text-neutral-500">{item.variant?.product?.category?.name}</p>
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className="mt-1 text-sm text-neutral-500">Variant: {item.variant.name}</p>
										)}
									</div>
									<p className="text-right font-semibold text-neutral-900">
										{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
									</p>
								</div>
								<div className="flex justify-between">
									<div className="text-sm font-bold">Qty: {item.quantity}</div>
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-12">
					<div className="rounded border bg-neutral-50 px-4 py-2">
						<div className="flex items-center justify-between gap-2 py-2">
							<div>
								<p className="font-semibold text-neutral-900">Your Total</p>
								<p className="mt-1 text-sm text-neutral-500">Shipping will be calculated in the next step</p>
							</div>
							<div className="font-medium text-neutral-900">
								{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
							</div>
						</div>
					</div>
					<div className="mt-10 text-center">
						<CheckoutLink
							checkoutId={checkoutId}
							disabled={!checkout.lines.length}
							className="w-full sm:w-1/3"
						/>
					</div>
				</div>
			</form> */}
			<form className="mt-12 flex flex-col gap-4 md:flex-row md:justify-between">
				<ul
					data-testid="CartProductList"
					role="list"
					className=" max-h-max divide-y-[#F0F2F5] border border-[#F0F2F5] bg-white md:w-2/3"
				>
					{checkout.lines.map((item) => (
						<li key={item.id} className="flex p-5">
							<div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-50 sm:h-32 sm:w-32">
								{item.variant?.product?.thumbnail?.url && (
									<Image
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ""}
										width={200}
										height={200}
										className="h-full w-full object-contain object-center"
									/>
								)}
							</div>
							<div className="relative flex flex-1 flex-col justify-between gap-3 p-4 py-2">
								<div className="flex flex-col justify-between justify-items-start gap-2 sm:flex-row">
									<div>
										<LinkWithChannel
											href={getHrefForVariant({
												productSlug: item.variant.product.slug,
												variantId: item.variant.id,
											})}
										>
											<h2 className="text-sm text-[#1D2739]">{item.variant?.product?.name}</h2>
										</LinkWithChannel>
										{/* <p className="mt-1 text-sm text-neutral-500">{item.variant?.product?.category?.name}</p> */}
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className="mt-1 text-sm text-neutral-500">Variant: {item.variant.name}</p>
										)}
									</div>
									<div className="flex flex-col items-start gap-2 sm:items-end ">
										{item.quantity > 1 ? (
											<p className="text[#101928] text-right font-semibold">
												{formatMoney(
													item.totalPrice.gross.amount * item.quantity,
													item.totalPrice.gross.currency,
												)}
											</p>
										) : (
											<p className="text[#101928] text-right font-semibold">
												{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
											</p>
										)}
										{item.quantity > 1 && (
											<p className="text-right text-sm text-[#667185]">
												{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)} each
											</p>
										)}
									</div>
								</div>
								<div className="flex justify-between">
									<div className="text-sm font-bold">Qty: {item.quantity}</div>
									{/* <div className="flex items-center gap-2 rounded-lg border border-[#F0F2F5] px-3">
										<button
											type="button"
											className={`${item.quantity <= 1 ? "text-[#667185]" : "text-[#101928]"}`}
										>
											-
										</button>
										<span className="w-4 text-center font-bold text-[#101928]">{item.quantity}</span>
										<button
											type="button"
											className={`${item.quantity >= 10 ? "text-[#98A2B3]" : "text-[#101928]"}`}
										>
											+
										</button>
									</div> */}
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="flex max-h-max flex-col rounded-lg border border-[#F0F2F5] bg-white p-5 md:w-1/3">
					<div className="py-2">
						<div className="flex flex-col items-center justify-between gap-4 py-2">
							<div className=" w-full border-b border-b-[#F0F2F5] pb-3">
								<p className="font-semibold text-neutral-900">Order Summary</p>
							</div>
							<div className="flex w-full flex-col gap-6 border-b border-b-[#F0F2F5] pb-4">
								<span className="flex w-full items-center justify-between gap-2">
									<p className="text-sm text-[#1D2739]">Item(s) Total:</p>
									<p className="text-sm text-[#101928]">
										{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
									</p>
								</span>
								<span className="flex w-full items-center justify-between gap-2">
									<p className="text-sm text-[#1D2739]">Item(s) Discount:</p>
									<p className="text-sm text-[#101928]">
										{formatMoney(0, checkout.totalPrice.gross.currency)}
									</p>
								</span>
							</div>
							<div className="flex w-full items-center justify-between gap-2">
								<p className="text-sm font-medium text-[#1D2739]">Total</p>
								<p className="font-semibold text-[#101928]">
									{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
								</p>
							</div>
						</div>
					</div>
					<div className="mt-6 w-full text-center">
						<CheckoutLink checkoutId={checkoutId} disabled={!checkout.lines.length} className="w-full" />
					</div>
				</div>
			</form>
		</section>
	);
}
