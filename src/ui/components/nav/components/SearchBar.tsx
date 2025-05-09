import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";

export const SearchBar = ({ channel }: { channel: string }) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
		}
	}

	return (
		<form
			action={onSubmit}
			className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-80"
		>
			<label className="w-full">
				<span className="sr-only">search products</span>
				<input
					type="text"
					name="search"
					placeholder="Search products..."
					autoComplete="on"
					required
					className="h-10 w-full rounded-md border border-neutral-300 bg-transparent bg-white px-4 py-2 pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
				/>
			</label>
			<div className="absolute inset-y-1 right-1 flex items-center justify-center">
				<button
					type="submit"
					className="inline-flex aspect-square h-8 w-8 items-center justify-center rounded-[7px] bg-[#344054] text-white hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80"
				>
					<span className="sr-only">search</span>
					<SearchIcon aria-hidden className="h-3.5 w-3.5" />
				</button>
			</div>
		</form>
	);
};
