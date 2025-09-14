import { type FC } from "react";
import clsx from "clsx";
import { SummaryItem, type SummaryLine } from "./SummaryItem";
import { PromoCodeAdd } from "./PromoCodeAdd";
import { SummaryMoneyRow } from "./SummaryMoneyRow";
import { SummaryPromoCodeRow } from "./SummaryPromoCodeRow";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";
import { ChevronDownIcon } from "@/checkout/ui-kit/icons";

import { getFormattedMoney } from "@/checkout/lib/utils/money";
import { Divider, Money, Title } from "@/checkout/components";
import {
	type CheckoutLineFragment,
	type GiftCardFragment,
	type Money as MoneyType,
	type OrderLineFragment,
} from "@/checkout/graphql";
import { SummaryItemMoneySection } from "@/checkout/sections/Summary/SummaryItemMoneySection";
import { type GrossMoney, type GrossMoneyWithTax } from "@/checkout/lib/globalTypes";

interface SummaryProps {
	editable?: boolean;
	lines: SummaryLine[];
	totalPrice?: GrossMoneyWithTax;
	subtotalPrice?: GrossMoney;
	giftCards?: GiftCardFragment[];
	voucherCode?: string | null;
	discount?: MoneyType | null;
	shippingPrice: GrossMoney;
}

export const Summary: FC<SummaryProps> = ({
	editable = true,
	lines,
	totalPrice,
	subtotalPrice,
	giftCards = [],
	voucherCode,
	shippingPrice,
	discount,
}) => {
	return (
		<div
			className={clsx(
				"z-0 flex h-fit w-full flex-col",
				"before:fixed before:bottom-0 before:left-1/2 before:top-0 before:-z-10 before:w-1/2 before:border-l before:border-neutral-200 before:bg-neutral-50 before:content-none before:lg:content-['']",
			)}
		>
			<div className="flex flex-col rounded-lg border border-[#F0F2F5] bg-white p-5">
				<details open className="group border-b border-[#F0F2F5] pb-3">
					<summary className="-mb-2 flex cursor-pointer flex-row items-center justify-between pt-4">
						<Title className="text-xl font-semibold text-[#1D2739]">Order Summary</Title>
						<div className="mb-2 flex items-center rounded-md border border-[#E4E7EC] p-1 text-sm text-[#344054]">
							{lines?.length} product{lines?.length > 1 && "s"}{" "}
							<ChevronDownIcon className="group-open:rotate-180" />
						</div>
					</summary>
					<ul className="py-2" data-testid="SummaryProductList">
						{lines?.map((line) => (
							<SummaryItem line={line} key={line?.id}>
								{editable ? (
									<SummaryItemMoneyEditableSection line={line as CheckoutLineFragment} />
								) : (
									<SummaryItemMoneySection line={line as OrderLineFragment} />
								)}
							</SummaryItem>
						))}
					</ul>
				</details>
				{editable && (
					<>
						<PromoCodeAdd />
						<Divider />
					</>
				)}
				<div className="mt-4 flex max-w-full flex-col">
					<SummaryMoneyRow label="Subtotal" money={subtotalPrice?.gross} ariaLabel="subtotal price" />
					{voucherCode && (
						<SummaryPromoCodeRow
							editable={editable}
							promoCode={voucherCode}
							ariaLabel="voucher"
							label={`Voucher code: ${voucherCode}`}
							money={discount}
							negative
						/>
					)}
					{giftCards?.map(({ currentBalance, displayCode, id }) => (
						<SummaryPromoCodeRow
							key={id}
							editable={editable}
							promoCodeId={id}
							ariaLabel="gift card"
							label={`Gift Card: •••• •••• ${displayCode}`}
							money={currentBalance}
							negative
						/>
					))}
					<SummaryMoneyRow label="Shipping cost" ariaLabel="shipping cost" money={shippingPrice?.gross} />
					<Divider className="my-4" />
					<div className="flex flex-row items-baseline justify-between pb-4">
						<div className="flex flex-row items-baseline">
							<p className="font-bold">Total</p>
							<p color="secondary" className="ml-2">
								includes {getFormattedMoney(totalPrice?.tax)} tax
							</p>
						</div>
						<Money ariaLabel="total price" money={totalPrice?.gross} data-testid="totalOrderPrice" />
					</div>
				</div>
			</div>
		</div>
	);
};
