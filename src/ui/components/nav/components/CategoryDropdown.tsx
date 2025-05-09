"use client";
import { useState, useRef, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import bagImage from "@/assets/images/bagPicture.png";
import dropIcon from "@/assets/icons/catDropIcon.svg";
// import { NavLink } from "./NavLink";
// import Link from "next/link";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

const categories = [
	{ name: "Bags", icon: bagImage },
	{ name: "Sneakers", icon: bagImage },
	{ name: "Sunglasses", icon: bagImage },
	{ name: "Accessories", icon: bagImage },
	{ name: "Groceries", icon: bagImage },
];

export function CategoryDropdown({
	child,
}: {
	child: { name: string; level: number; category: { name: string; slug: string; id: string }; id: string }[];
}) {
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState("Categories");
	const ref = useRef<HTMLDivElement>(null);
	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative flex items-center justify-center" ref={ref}>
			<button
				onClick={() => setOpen(!open)}
				className={`flex items-center justify-center gap-2.5 rounded-full px-3 py-2 font-medium text-[#344054] transition hover:bg-[#F0F2F5] hover:shadow-sm focus:bg-[#F0F2F5] focus:shadow-sm active:bg-[#F0F2F5] ${
					open && "bg-[#F0F2F5] shadow-sm"
				}`}
			>
				{category}
				<Image src={dropIcon} alt="dropIcon" className="h-4 w-4" />
			</button>
			{open && (
				<div className="fixed left-36 top-[70px] z-10 h-[260px] w-[434px] rounded-lg bg-white px-6 py-5 shadow-lg">
					<ul className="scrollbar-hide flex h-full flex-col flex-wrap gap-5 overflow-x-auto">
						<li className="break-inside-avoid" onClick={() => setCategory("Categories")}>
							<LinkWithChannel
								href="/products"
								className="flex cursor-pointer items-center gap-2 rounded-lg transition hover:bg-gray-100"
							>
								<Image src={bagImage} alt="All" className="h-7 w-7 rounded-full object-cover" />
								<span className="text-gray-800">All</span>
							</LinkWithChannel>
						</li>
						{categories.map((cat, index) => (
							<li
								key={index}
								className="flex cursor-pointer break-inside-avoid items-center gap-2 rounded-lg transition hover:bg-gray-100"
								onClick={() => setCategory(cat.name)}
							>
								<Image src={cat.icon} alt={cat.name} className="h-7 w-7 rounded-full object-cover" />
								<span className="text-gray-800">{cat.name}</span>
							</li>
						))}
						{child?.map((cat) => (
							<li key={cat.id} className="break-inside-avoid" onClick={() => setCategory(cat.category.name)}>
								{/* <NavLink href={`/categories/${cat.category.slug}`}>{cat.category.name}</NavLink> */}
								<LinkWithChannel
									href={`/categories/${cat.category.slug}`}
									className="flex cursor-pointer items-center gap-2 rounded-lg transition hover:bg-gray-100"
								>
									<Image
										src={bagImage}
										alt={cat.category.name}
										className="h-7 w-7 rounded-full object-cover"
									/>
									<span className="text-gray-800">{cat.category.name}</span>
								</LinkWithChannel>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
