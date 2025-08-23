"use client";

import { useSaleorAuthContext, useSaleorExternalAuth } from "@saleor/auth-sdk/react";
import React from "react";
import { ExternalProvider } from "@saleor/auth-sdk";
// import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "urql";
import { Button } from "@/checkout/components/Button";
import { PasswordInput } from "@/checkout/components/PasswordInput";
import { TextInput } from "@/checkout/components/TextInput";
import { useSignInForm } from "@/checkout/sections/SignIn/useSignInForm";
import { usePasswordResetRequest } from "@/checkout/sections/SignIn/usePasswordResetRequest";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";
import {
    SignInFormContainer,
    type SignInFormContainerProps,
} from "@/checkout/sections/Contact/SignInFormContainer";
import { isValidEmail } from "@/checkout/lib/utils/common";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import { useCheckout } from "@/checkout/hooks/useCheckout";
interface SignInProps extends Pick<SignInFormContainerProps, "onSectionChange"> {
    onSignInSuccess: () => void;
    onEmailChange: (email: string) => void;
    email: string;
}
// import { gql, useQuery } from "@apollo/client";
// import userIcon from "@/assets/icons/userIcon.svg";

export default function SigninSection() {
	const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
	const CurrentUserDocument = gql`
		query CurrentUser {
			me {
				id
				email
				firstName
				lastName
				avatar {
					url
					alt
				}
			}
		}
	`;

	const {
		authURL,
		loading: isLoadingExternalAuth,
		error: externalAuthError,
	} = useSaleorExternalAuth({
		saleorURL: saleorApiUrl || "https://store-lrwhkknb.saleor.cloud/graphql/",
		provider: ExternalProvider.OpenIDConnect,
		redirectURL: "http://localhost:3300/api/auth/callback",
	});
	const [{ data, fetching, error }] = useQuery({ query: CurrentUserDocument });

	const { signOut } = useSaleorAuthContext();

	if (fetching || isLoadingExternalAuth) {
		// return <div>Loading...</div>;
		return (
			<div>
				<div className="flex items-center gap-1">
					{/* <Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" /> */}
					<span className="hidden font-medium text-[#344054] md:block">Login/Signup</span>
				</div>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}

	if (error || externalAuthError) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4">
				<h1 className="mb-4 text-2xl font-bold">Error logging in</h1>
				<pre className="bg-muted overflow-auto rounded-md p-4 font-mono text-sm">
					{JSON.stringify(error || externalAuthError, null, 2)}
				</pre>
			</div>
		);
	}

	if (data?.me) {
		return (
			<div>
				{JSON.stringify(data)}
				<button onClick={() => signOut()}>Logout</button>
			</div>
		);
	}
	if (authURL) {
		return (
			<div>
				<Link href={authURL}>
					<div className="flex items-center gap-1">
						{/* <Image src={userIcon} alt="user" className="w-7 shrink-0" aria-hidden="true" /> */}
						<span className="hidden font-medium text-[#344054] md:block">Login/Signup</span>
					</div>
					<span className="sr-only">Log in</span>
				</Link>
			</div>
		);
	}
	return <div>Something went wrong</div>;
}





export const SignIn: React.FC<SignInProps> = ({
    onSectionChange,
    onSignInSuccess,
    onEmailChange,
    email: initialEmail,
}) => {
    const {
        checkout: { email: checkoutEmail },
    } = useCheckout();
    const { errorMessages } = useErrorMessages();

    const form = useSignInForm({
        onSuccess: onSignInSuccess,
        initialEmail: initialEmail || checkoutEmail || "",
    });

    const {
        values: { email },
        handleChange,
        setErrors,
        setTouched,
        isSubmitting,
    } = form;

    return (
        <SignInFormContainer
            title="Sign in"
            redirectSubtitle="New customer?"
            redirectButtonLabel="Guest checkout"
            onSectionChange={onSectionChange}
        >
            <FormProvider form={form}>
                <div className="grid grid-cols-1 gap-3">
                    <TextInput
                        required
                        name="email"
                        label="Email"
                        onChange={(event) => {
                            handleChange(event);
                            onEmailChange(event.currentTarget.value);
                        }}
                    />
                    <PasswordInput name="password" label="Password" required />
                    <div className="flex w-full flex-row items-center justify-end">
                        <Button
                            ariaDisabled={isSubmitting}
                            ariaLabel="send password reset link"
                            variant="tertiary"
                            label={passwordResetSent ? "Resend?" : "Forgot password?"}
                            className="ml-1 mr-4"
                            onClick={(e) => (isSubmitting ? e.preventDefault() : onPasswordResetRequest)}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            ariaLabel={"Sign in"}
                            label={isSubmitting ? "Processing…" : "Sign in"}
                        />
                    </div>
                </div>
            </FormProvider>
        </SignInFormContainer>
    );
};
