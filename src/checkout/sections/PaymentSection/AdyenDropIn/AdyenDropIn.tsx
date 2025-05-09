import AdyenCheckout from "@adyen/adyen-web";
import { type FC, useCallback, useEffect, useRef } from "react";

import { createAdyenCheckoutConfig } from "@/checkout/sections/PaymentSection/AdyenDropIn/utils";
import {
	type AdyenDropinProps,
	useAdyenDropin,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/useAdyenDropin";
import "@adyen/adyen-web/dist/adyen.css";
import { type AdyenGatewayInitializePayload } from "@/checkout/sections/PaymentSection/AdyenDropIn/types";

type AdyenCheckoutInstance = Awaited<ReturnType<typeof AdyenCheckout>>;

interface DropinElement {
	unmount: () => void;
}

export const AdyenDropIn: FC<AdyenDropinProps> = ({ config }) => {
	const { onSubmit, onAdditionalDetails } = useAdyenDropin({ config });
	const dropinContainerElRef = useRef<HTMLDivElement>(null);
	const dropinComponentRef = useRef<DropinElement | null>(null);

	const createAdyenCheckoutInstance = useCallback(
		async (container: HTMLDivElement, data: AdyenGatewayInitializePayload) => {
			const adyenCheckout = await AdyenCheckout(
				createAdyenCheckoutConfig({ ...data, onSubmit, onAdditionalDetails }),
			);

			dropinComponentRef.current?.unmount();

			const dropin = adyenCheckout.create("dropin").mount(container) as DropinElement;

			dropinComponentRef.current = dropin;
		},
		[onAdditionalDetails, onSubmit],
	);

	useEffect(() => {
		if (dropinContainerElRef.current && !dropinComponentRef.current) {
			void createAdyenCheckoutInstance(dropinContainerElRef.current, config.data);
		}
	}, [createAdyenCheckoutInstance, config.data]);

	return <div ref={dropinContainerElRef} />;
};
