import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
// import { SignupForm } from "@/ui/components/SignupForm";

export default function SignupPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">{/* <SignupForm /> */}</section>
		</Suspense>
	);
}
