// import Link from "next/link";
// import { NavLink } from "./NavLink";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
import { executeGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import CategoryDropdown from "./CategoryDropdown";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import Image from "next/image";
import bagImage from "@/assets/images/bagPicture.png";

export const NavLinks = async ({ channel }: { channel: string }) => {
	const navLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel },
		revalidate: 60 * 60 * 24,
	});
	// console.log(navLinks.menu?.items);
	const categoryItems = (navLinks.menu?.items ?? [])
		.filter((item) => item.category && item.category.id && item.category.slug && item.category.name)
		.map((item) => ({
			name: item.name,
			level: item.level,
			category: {
				id: item.category!.id,
				slug: item.category!.slug,
				name: item.category!.name,
			},
			id: item.id,
		}));

	return (
		<>
			{/* <NavLink href="/products">All</NavLink> */}
			<div className="hidden items-center gap-3 md:flex">{<CategoryDropdown child={categoryItems} />}</div>
			<ul className="mt-2 flex flex-col divide-y divide-[#F0F2F5] whitespace-nowrap pt-3 md:hidden">
				{categoryItems.map((item) => (
					<li key={item.id} className="py-3">
						{/* <NavLink href={`/categories/${item.category.slug}`}>{item.name}</NavLink> */}
						<LinkWithChannel
							href={`/categories/${item.category.slug}`}
							className="flex cursor-pointer items-center gap-2 rounded-lg transition hover:bg-gray-100"
						>
							<Image src={bagImage} alt={item.category.name} className="h-7 w-7 rounded-full object-cover" />
							<span className="text-gray-800">{item.category.name}</span>
						</LinkWithChannel>
					</li>
				))}
			</ul>
		</>
		// <>
		// 	<NavLink href="/products">All</NavLink>
		// 	{navLinks.menu?.items?.map((item) => {
		// 		if (item.category) {
		// 			return (
		// 				// <NavLink key={item.id} href={`/categories/${item.category.slug}`}>
		// 				// 	{item.category.name}
		// 				// </NavLink>
		// 				<CategoryDropdown child={}/>
		// 			);
		// 		}
		// 		// if (item.collection) {
		// 		// 	return (
		// 		// 		<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
		// 		// 			{item.collection.name}
		// 		// 		</NavLink>
		// 		// 	);
		// 		// }
		// 		// if (item.page) {
		// 		// 	return (
		// 		// 		<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
		// 		// 			{item.page.title}
		// 		// 		</NavLink>
		// 		// 	);
		// 		// }
		// 		// if (item.url) {
		// 		// 	return (
		// 		// 		<Link key={item.id} href={item.url}>
		// 		// 			{item.name}
		// 		// 		</Link>
		// 		// 	);
		// 		// }
		// 		return null;
		// 	})}
		// </>
	);
};
