import { useEffect, useMemo, useRef, useState } from "react";
import { type CountryCode, usePaymentGatewaysInitializeMutation } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useSubmit } from "@/checkout/hooks/useSubmit";
import { type MightNotExist } from "@/checkout/lib/globalTypes";
import {
	type ParsedPaymentGateways,
	type ParsedAdyenGateway,
	type ParsedStripeGateway,
	type ParsedDummyGateway,
	type PaymentGatewayId,
} from "@/checkout/sections/PaymentSection/types";
import { getFilteredPaymentGateways } from "@/checkout/sections/PaymentSection/utils";

function parseGatewayConfig(config: {
	id: string;
	data?: Record<string, unknown> | null;
}): ParsedAdyenGateway | ParsedStripeGateway | ParsedDummyGateway {
	const gatewayId = config.id as PaymentGatewayId;
	return {
		...config,
		id: gatewayId,
		data: config.data || {},
	};
}

type PaymentGatewaysInitializeMutation = {
	paymentGatewayInitialize: {
		errors: Array<{
			field?: string | null;
			message?: string | null;
			code: string;
		}>;
		gatewayConfigs?: Array<{
			id: string;
			data?: Record<string, unknown> | null;
		}> | null;
	};
};

interface PaymentGatewayConfigError {
	field?: string | null;
	message?: string | null;
	code: string;
}

interface PaymentGatewayConfig {
	__typename?: "PaymentGatewayConfig";
	id: string;
	data?: Record<string, unknown> | null;
	errors?: PaymentGatewayConfigError[] | null;
}

interface PaymentGatewayInitializeResponse {
	__typename?: "PaymentGatewayInitialize";
	errors: {
		__typename?: "PaymentGatewayInitializeError";
		field?: string | null;
		message?: string | null;
		code: string;
	}[];
	gatewayConfigs?: PaymentGatewayConfig[] | null;
}

export const usePaymentGatewaysInitialize = () => {
	const {
		checkout: { billingAddress },
	} = useCheckout();
	const {
		checkout: { id: checkoutId, availablePaymentGateways },
	} = useCheckout();

	const billingCountry = billingAddress?.country.code as MightNotExist<CountryCode>;

	const [gatewayConfigs, setGatewayConfigs] = useState<ParsedPaymentGateways>([]);
	const previousBillingCountry = useRef(billingCountry);

	const [{ fetching }, paymentGatewaysInitialize] = usePaymentGatewaysInitializeMutation();

	const onSubmit = useSubmit<{}, typeof paymentGatewaysInitialize>(
		useMemo(
			() => ({
				hideAlerts: true,
				scope: "paymentGatewaysInitialize",
				shouldAbort: () => !availablePaymentGateways.length,
				onSubmit: paymentGatewaysInitialize,
				parse: () => ({
					checkoutId,
					paymentGateways: getFilteredPaymentGateways(availablePaymentGateways).map(({ config, id }) => ({
						id,
						data: config,
					})),
				}),
				onSuccess: ({ data }) => {
					if (!data.gatewayConfigs?.length) {
						throw new Error("No available payment gateways");
					}

					const parsedConfigs = data.gatewayConfigs.map(parseGatewayConfig) as ParsedPaymentGateways;
					setGatewayConfigs(parsedConfigs);
				},
				onError: ({ errors }) => {
					console.log({ errors });
				},
			}),
			[availablePaymentGateways, checkoutId, paymentGatewaysInitialize],
		),
	);

	useEffect(() => {
		void onSubmit();
	}, [onSubmit]);

	useEffect(() => {
		if (billingCountry !== previousBillingCountry.current) {
			previousBillingCountry.current = billingCountry;
			void onSubmit();
		}
	}, [billingCountry, onSubmit]);

	return {
		fetching,
		availablePaymentGateways: gatewayConfigs || [],
	};
};
