"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import chevDown from "@/assets/icons/CaretDown.svg";
import checkBg from "@/assets/icons/checkCircle.svg";
import Image from "next/image";

export default function Sort() {
	const [drop, setDrop] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>("Relevance");

	return (
		<div>
			<div className="hidden items-center gap-2 md:flex">
				<p className="text-sm text-gray-600">Sort by</p>
				<div className="relative">
					<button
						className="flex items-center gap-10 rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
						name="sort"
						id="sort"
						onFocus={() => {
							// Handle focus
							setDrop(true);
						}}
					>
						{sortBy}
						<Image src={chevDown} alt="chevron-down" width={16} height={16} />
					</button>
					{drop && (
						<div className="absolute right-0 top-full mt-1 w-[275px] rounded-lg border border-gray-200 bg-white shadow-lg">
							<button
								onClick={() => {
									setDrop(false);
									setSortBy("Relevance");
								}}
								className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
							>
								Relevance{" "}
								{sortBy === "Relevance" && <Image src={checkBg} alt="check" width={16} height={16} />}
							</button>
							<button
								onClick={() => {
									setDrop(false);
									setSortBy("Popular");
								}}
								className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
							>
								Popular {sortBy === "Popular" && <Image src={checkBg} alt="check" width={16} height={16} />}
							</button>
							<button
								onClick={() => {
									setDrop(false);
									setSortBy("Newest");
								}}
								className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
							>
								Newest {sortBy === "Newest" && <Image src={checkBg} alt="check" width={16} height={16} />}
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="ml-auto flex gap-2 md:hidden">
				<div className="relative">
					<button
						className="flex w-max items-center gap-3 rounded-lg border border-[#F0F2F5] bg-white px-2.5 py-1.5 text-sm"
						name="sort"
						id="sort"
						onClick={() => {
							// Handle focus
							setDrop(!drop);
						}}
					>
						{sortBy}
						<Image
							src={chevDown}
							alt="chevron-down"
							width={16}
							height={16}
							className={`${drop && "rotate-180"} cursor-pointer transition-all duration-200`}
						/>
					</button>
					{drop && (
						<div className="fixed inset-0 top-[215px] bg-black/50">
							<div className="w-full bg-white shadow-lg">
								<button
									onClick={() => {
										setDrop(false);
										setSortBy("Relevance");
									}}
									className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
								>
									Relevance{" "}
									{sortBy === "Relevance" && <Image src={checkBg} alt="check" width={16} height={16} />}
								</button>
								<button
									onClick={() => {
										setDrop(false);
										setSortBy("Popular");
									}}
									className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
								>
									Popular {sortBy === "Popular" && <Image src={checkBg} alt="check" width={16} height={16} />}
								</button>
								<button
									onClick={() => {
										setDrop(false);
										setSortBy("Newest");
									}}
									className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
								>
									Newest {sortBy === "Newest" && <Image src={checkBg} alt="check" width={16} height={16} />}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
