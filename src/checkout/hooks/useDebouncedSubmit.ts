/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
import { debounce } from "lodash-es";
import { useCallback, useEffect } from "react";

export const useDebouncedSubmit = <TArgs extends Array<any>>(
	onSubmit: (...args: TArgs) => Promise<any> | void,
) => {
	const debouncedSubmit = useCallback(
		debounce((...args: TArgs) => {
			void onSubmit(...args);
		}, 2000),
		[onSubmit],
	);

	useEffect(() => {
		return () => {
			debouncedSubmit.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return debouncedSubmit;
};
