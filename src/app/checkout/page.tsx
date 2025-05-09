import { invariant } from "ts-invariant";
import Image from "next/image";
import { RootWrapper } from "./pageWrapper";
// import logo from "../../app/Tobay Icon.svg";
import arrow from "@/assets/icons/CaretRight.svg";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "Checkout · Tobay Stores",
};

export default function CheckoutPage({
	searchParams,
}: {
	searchParams: { checkout?: string; order?: string };
}) {
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<>
			<Header channel={"default-channel"} />
			{/* <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
				<div className="mx-auto max-w-7xl px-3 sm:px-8">
					<div className="hidden h-16 justify-between gap-4 md:flex md:gap-8">
						<Logo />
						<Nav channel={channel} />
					</div>
					<div className="flex h-[120px] items-center justify-center gap-4 md:hidden">
						<NavMob channel={channel} />
					</div>
				</div>
			</header> */}
			<div className="min-h-dvh bg-white">
				<section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8 pt-4">
					<div className="mt-6 flex items-center gap-2">
						<a href="/" className="font-semibold text-[#1D2739]">
							Home
						</a>
						<Image src={arrow} alt="arrow" width={14} />
						<h1 className=" text-[#667185]">Checkout</h1>
					</div>

					<section className="mb-12 mt-6 flex-1">
						<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
					</section>
				</section>

				{/* <section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8">
					<div className="flex items-center font-bold">
						<a aria-label="homepage" href="/">
							ACME
						</a>
					</div>
					<h1 className="mt-8 text-3xl font-bold text-neutral-900">Checkout</h1>

					<section className="mb-12 mt-6 flex-1">
						<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
					</section>
				</section> */}
			</div>
		</>
	);
}
