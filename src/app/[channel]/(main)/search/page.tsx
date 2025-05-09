/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
import { notFound, redirect } from "next/navigation";
import { OrderDirection, ProductOrderField, SearchProductsDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { ProductsPerPage } from "@/app/config";
import Sort from "./sort";
import Filters from "./filters";
import FiltersMob from "./filters-mob";

export const metadata = {
	title: "Search products · Saleor Storefront example",
	description: "Search products in Saleor Storefront example",
};

export default async function Page({
	searchParams,
	params,
}: {
	searchParams: Record<"query" | "cursor", string | string[] | undefined>;
	params: { channel: string };
}) {
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;
	const searchValue = searchParams.query;

	if (!searchValue) {
		notFound();
	}

	if (Array.isArray(searchValue)) {
		const firstValidSearchValue = searchValue.find((v) => v.length > 0);
		if (!firstValidSearchValue) {
			notFound();
		}
		redirect(`/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
	}

	const { products } = await executeGraphQL(SearchProductsDocument, {
		variables: {
			first: ProductsPerPage,
			search: searchValue,
			after: cursor,
			sortBy: ProductOrderField.Rating,
			sortDirection: OrderDirection.Asc,
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		query: searchValue,
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl bg-[#F9FAFB] p-4 pb-16 md:p-8">
			{products.totalCount && products.totalCount > 0 ? (
				<div className="flex flex-col gap-6 md:flex-row">
					<div className="hidden md:flex">
						{/* <div className="w-64 flex-shrink-0">
							<div className="mb-6 rounded-lg border border-[#F0F2F5] bg-white p-4">
								<h2 className="mb-4 text-lg font-medium">Price</h2>
								<div className="flex flex-col gap-2">
									<label className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="price"
											className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
											value="0-2000"
										/>
										<span className="text-sm">Under ₦2000</span>
									</label>
									<label className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="price"
											className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
											value="2000-5000"
										/>
										<span className="text-sm">₦2000 - ₦5000</span>
									</label>
									<label className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="price"
											className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
											value="5000-10000"
										/>
										<span className="text-sm">₦5000 - ₦10000</span>
									</label>
									<label className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="price"
											className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
											value="10000-20000"
										/>
										<span className="text-sm">₦10000 - ₦20000</span>
									</label>
									<label className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="price"
											className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
											value="20000-40000"
										/>
										<span className="text-sm">₦20000 - ₦40000</span>
									</label>
									<label className="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="price"
											className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
											value="40000-"
										/>
										<span className="text-sm">Above ₦40000</span>
									</label>
								</div>
								<div className="mt-4">
									<p className="mb-2 text-sm">Custom Price</p>
									<div className="flex gap-2">
										<input
											type="number"
											placeholder="₦Min"
											className="w-20 rounded border border-neutral-200 px-2 py-1 text-sm outline-none"
										/>
										<input
											type="number"
											placeholder="₦Max"
											className="w-20 rounded border border-neutral-200 px-2 py-1 text-sm outline-none"
										/>
										<button className="rounded border border-[#FFECE5] bg-[#FEEDE7] px-3 text-sm text-[#F56630]">
											Go
										</button>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-[#F0F2F5] bg-white p-4">
								<h2 className="mb-4 text-lg font-medium">Categories</h2>
								<div className="flex flex-col gap-2">
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Fashion</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Home & Office</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Electronics</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Beauty & Personal Care</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Sports & Outdoors</span>
									</label>
								</div>
							</div>

							<div className="mt-4 rounded-lg border border-[#F0F2F5] bg-white p-4">
								<h2 className="mb-4 text-lg font-medium">Brands</h2>
								<div className="mb-4">
									<input
										type="search"
										placeholder="Search.."
										className="w-full rounded border border-neutral-200 px-2 py-1 text-sm"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Bunny</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Boltmor</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Calvin Klein</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Carter's</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Cartier</span>
									</label>
								</div>
							</div>

							<div className="mt-4 rounded-lg border border-[#F0F2F5] bg-white p-4">
								<h2 className="mb-4 text-lg font-medium">Colors</h2>
								<div className="flex flex-col gap-2">
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Blue</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Green</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Yellow</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Red</span>
									</label>
									<label className="flex items-center gap-2">
										<input type="checkbox" className="h-4 w-4 rounded text-[#F56630]" />
										<span className="text-sm">Brown</span>
									</label>
								</div>
							</div>
						</div> */}
						<Filters />
					</div>

					<div>
						<div className="hidden items-center justify-between pb-8 md:flex">
							<h1 className="text-[#344054 font-medium">
								Search results for {searchValue}
								<span className="pl-3 text-sm text-[#667185]">({products.totalCount} products found)</span>
							</h1>
							<Sort />
							{/* <div className="ml-auto flex items-center gap-2">
								<p className="text-sm text-gray-600">Sort by</p>
								<div className="relative">
									<button
										className="flex items-center gap-10 rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
										name="sort"
										id="sort"
										// onFocus={() => {
										// 	// Handle focus
										// }}
									>
										Relevance
										<Image src={chevDown} alt="chevron-down" width={16} height={16} />
									</button>
									<div className="absolute right-0 top-full mt-1 w-[275px] rounded-lg border border-gray-200 bg-white shadow-lg">
										<button className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50">
											Relevance <Image src={checkBg} alt="check" width={16} height={16} />
										</button>
										<button className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50">
											Popular <Image src={checkBg} alt="check" width={16} height={16} />
										</button>
										<button className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50">
											Newest <Image src={checkBg} alt="check" width={16} height={16} />
										</button>
									</div>
								</div>
							</div> */}
						</div>
						<div className="flex flex-col gap-4 pb-8 md:hidden">
							<h1 className="text-[#344054 font-medium">
								Search results for {searchValue}
								<span className="pl-3 text-sm text-[#667185]">({products.totalCount} products found)</span>
							</h1>
							<div className="flex gap-2 overflow-x-auto">
								<Sort />
								<FiltersMob />
							</div>
						</div>
						<ProductList products={products.edges.map((e) => e.node)} />
						<Pagination
							pageInfo={{
								...products.pageInfo,
								basePathname: `/search`,
								urlSearchParams: newSearchParams,
							}}
						/>
					</div>
				</div>
			) : (
				<h1 className="mx-auto pb-8 text-center text-xl font-semibold">Nothing found :(</h1>
			)}
		</section>
	);
}
