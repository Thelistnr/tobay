"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import chevDown from "@/assets/icons/CaretDown.svg";
// import checkBg from "@/assets/icons/checkCircle.svg";

export default function FiltersMob() {
	// const [drop, setDrop] = useState<boolean>(false);
	const [dropPrice, setDropPrice] = useState<boolean>(false);
	const [dropCategory, setDropCategory] = useState<boolean>(false);
	const [dropBrand, setDropBrand] = useState<boolean>(false);
	const [dropColor, setDropColor] = useState<boolean>(false);
	// const [sortBy, setSortBy] = useState<string>("Relevance");
	const [price, setPrice] = useState<string>("0-2000");
	const [minPrice, setMinPrice] = useState<string>();
	const [maxPrice, setMaxPrice] = useState<string>();
	const [category, setCategory] = useState<string>("");
	const [brand, setBrand] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [searchBrand, setSearchBrand] = useState<string>("");

	useEffect(() => {
		console.log(price, category, brand, color);
	}, [price, category, brand, color]);

	return (
		<div className="relative flex flex-shrink-0 gap-4 overflow-x-auto">
			<div className="max-h-max rounded-lg border border-[#F0F2F5] bg-white px-2.5 py-1.5">
				<div className=" flex items-center justify-between gap-4" onClick={() => setDropPrice(!dropPrice)}>
					<h2 className=" text-sm font-medium text-[#101928]">Price</h2>
					<Image
						src={chevDown}
						alt="chevron down"
						width={14}
						height={14}
						className={`${dropPrice && "rotate-180"} cursor-pointer transition-all duration-200`}
					/>
				</div>
				{dropPrice && (
					<div className="fixed inset-0 top-[215px] bg-black/50">
						<div className="max-h-[300px] w-full overflow-y-auto bg-white p-4">
							<div className="flex flex-col gap-2">
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="price"
										className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
										value="0-2000"
										onChange={(e) => {
											setPrice(e.target.value);
											setMinPrice("0");
											setMaxPrice("2000");
										}}
									/>
									<span className="text-sm">Under ₦2000</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="price"
										className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
										value="2000-5000"
										onChange={(e) => {
											setPrice(e.target.value);
											setMinPrice("2000");
											setMaxPrice("5000");
										}}
									/>
									<span className="text-sm">₦2000 - ₦5000</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="price"
										className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
										value="5000-10000"
										onChange={(e) => {
											setPrice(e.target.value);
											setMinPrice("5000");
											setMaxPrice("10000");
										}}
									/>
									<span className="text-sm">₦5000 - ₦10000</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="price"
										className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
										value="10000-20000"
										onChange={(e) => {
											setPrice(e.target.value);
											setMinPrice("10000");
											setMaxPrice("20000");
										}}
									/>
									<span className="text-sm">₦10000 - ₦20000</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="price"
										className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
										value="20000-40000"
										onChange={(e) => {
											setPrice(e.target.value);
											setMinPrice("20000");
											setMaxPrice("40000");
										}}
									/>
									<span className="text-sm">₦20000 - ₦40000</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="price"
										className="h-4 w-4 cursor-pointer text-[#F56630] accent-[#F56630] outline-none"
										value="40000"
										onChange={(e) => {
											setPrice(e.target.value);
											setMinPrice("40000");
											setMaxPrice("");
										}}
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
										value={minPrice}
										onChange={(e) => setMinPrice(e.target.value)}
									/>
									<input
										type="number"
										placeholder="₦Max"
										className="w-20 rounded border border-neutral-200 px-2 py-1 text-sm outline-none"
										value={maxPrice}
										onChange={(e) => setMaxPrice(e.target.value)}
									/>
									<button className="rounded border border-[#FFECE5] bg-[#FEEDE7] px-3 text-sm text-[#F56630]">
										Go
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="max-h-max rounded-lg border border-[#F0F2F5] bg-white px-2.5 py-1.5">
				<div
					className=" flex items-center justify-between gap-4"
					onClick={() => setDropCategory(!dropCategory)}
				>
					<h2 className=" text-sm font-medium text-[#101928]">Categories</h2>
					<Image
						src={chevDown}
						alt="chevron down"
						width={14}
						height={14}
						className={`${dropCategory && "rotate-180"} cursor-pointer transition-all duration-200`}
					/>
				</div>
				{dropCategory && (
					<div className="fixed inset-0 top-[215px] flex bg-black/50">
						<div className="flex max-h-[300px] w-full flex-col gap-2 overflow-y-auto bg-white p-4">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Fashion"
									onChange={(e) => setCategory(e.target.value)}
								/>
								<span className="text-sm">Fashion</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Home & Office"
									onChange={(e) => setCategory(e.target.value)}
								/>
								<span className="text-sm">Home & Office</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Electronics"
									onChange={(e) => setCategory(e.target.value)}
								/>
								<span className="text-sm">Electronics</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Beauty & Personal Care"
									onChange={(e) => setCategory(e.target.value)}
								/>
								<span className="text-sm">Beauty & Personal Care</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Sports & Outdoors"
									onChange={(e) => setCategory(e.target.value)}
								/>
								<span className="text-sm">Sports & Outdoors</span>
							</label>
						</div>
					</div>
				)}
			</div>

			<div className="max-h-max rounded-lg border border-[#F0F2F5] bg-white px-2.5 py-1.5">
				<div className=" flex items-center justify-between gap-4" onClick={() => setDropBrand(!dropBrand)}>
					<h2 className=" text-sm font-medium text-[#101928]">Brands</h2>
					<Image
						src={chevDown}
						alt="chevron down"
						width={14}
						height={14}
						className={`${dropBrand && "rotate-180"} cursor-pointer transition-all duration-200`}
					/>
				</div>
				{dropBrand && (
					<div className="fixed inset-0 top-[215px] bg-black/50">
						<div className="max-h-[300px] w-full overflow-y-auto bg-white p-4">
							<div className="mb-4">
								<input
									type="search"
									placeholder="Search.."
									className="w-full rounded border border-neutral-200 px-2 py-1 text-sm"
									onChange={(e) => setSearchBrand(e.target.value)}
									value={searchBrand}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										className="h-4 w-4 rounded text-[#F56630]"
										value="Bunny"
										onChange={(e) => setBrand(e.target.value)}
									/>
									<span className="text-sm">Bunny</span>
								</label>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										className="h-4 w-4 rounded text-[#F56630]"
										value="Boltmor"
										onChange={(e) => setBrand(e.target.value)}
									/>
									<span className="text-sm">Boltmor</span>
								</label>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										className="h-4 w-4 rounded text-[#F56630]"
										value="Calvin Klein"
										onChange={(e) => setBrand(e.target.value)}
									/>
									<span className="text-sm">Calvin Klein</span>
								</label>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										className="h-4 w-4 rounded text-[#F56630]"
										value="Carter's"
										onChange={(e) => setBrand(e.target.value)}
									/>
									<span className="text-sm">Carter's</span>
								</label>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										className="h-4 w-4 rounded text-[#F56630]"
										value="Cartier"
										onChange={(e) => setBrand(e.target.value)}
									/>
									<span className="text-sm">Cartier</span>
								</label>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="max-h-max rounded-lg border border-[#F0F2F5] bg-white px-2.5 py-1.5">
				<div className=" flex items-center justify-between gap-4" onClick={() => setDropColor(!dropColor)}>
					<h2 className=" text-sm font-medium text-[#101928]">Colors</h2>
					<Image
						src={chevDown}
						alt="chevron down"
						width={14}
						height={14}
						className={`${dropColor && "rotate-180"} cursor-pointer transition-all duration-200`}
					/>
				</div>
				{dropColor && (
					<div className="fixed inset-0 top-[215px] z-10 flex bg-black/50">
						<div className="flex max-h-[300px] w-full flex-col gap-2 overflow-y-auto bg-white p-4">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Blue"
									onChange={(e) => setColor(e.target.value)}
								/>
								<span className="text-sm">Blue</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Green"
									onChange={(e) => setColor(e.target.value)}
								/>
								<span className="text-sm">Green</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Yellow"
									onChange={(e) => setColor(e.target.value)}
								/>
								<span className="text-sm">Yellow</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Red"
									onChange={(e) => setColor(e.target.value)}
								/>
								<span className="text-sm">Red</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="h-4 w-4 rounded text-[#F56630]"
									value="Brown"
									onChange={(e) => setColor(e.target.value)}
								/>
								<span className="text-sm">Brown</span>
							</label>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
