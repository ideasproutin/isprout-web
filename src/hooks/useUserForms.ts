import { useQuery } from "@tanstack/react-query";
import {
	getUserForms,
	type FormType,
	type GetUserFormsRequest,
} from "../services/userFormsApi";
import { hasValidSession } from "../utils/authSession";

export const useUserForms = (formType: FormType, options?: Partial<GetUserFormsRequest>) => {
	const isLoggedIn = hasValidSession();

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
		staleTime: 30_000,
		retry: 3,
		retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
};
