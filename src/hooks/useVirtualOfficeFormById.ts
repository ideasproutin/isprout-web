import { useQuery } from "@tanstack/react-query";
import { hasValidSession } from "../utils/authSession";
import { getVirtualOfficeFormById } from "../services/getVirtualOfficeFormByIdApi";

export const useVirtualOfficeFormById = (id?: string) => {
	const isLoggedIn = hasValidSession();

	return useQuery({
		queryKey: ["bookingData", "VIRTUAL_OFFICE_FORM", id],
		queryFn: () => getVirtualOfficeFormById(id as string),
		enabled: isLoggedIn && Boolean(id),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	});
};
