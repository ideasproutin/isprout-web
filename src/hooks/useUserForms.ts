import { useQuery } from "@tanstack/react-query";
import {
	getUserForms,
	type FormType,
	type GetUserFormsRequest,
} from "../services/userFormsApi";

export const useUserForms = (formType: FormType, options?: Partial<GetUserFormsRequest>) => {
	const isLoggedIn =
		typeof window !== "undefined" &&
		localStorage.getItem("isLoggedIn") === "true";

	const payload: GetUserFormsRequest = {
		sortColumn: options?.sortColumn ?? "createdAt",
		sortDirection: options?.sortDirection ?? "desc",
		pageIndex: options?.pageIndex ?? 0,
		pageSize: options?.pageSize ?? 20,
		filters: {
			formType,
			...options?.filters,
		},
	};

	return useQuery({
		queryKey: ["userForms", formType, payload],
		queryFn: () => getUserForms(payload),
		enabled: isLoggedIn,
		staleTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});
};
