import { useQuery } from "@tanstack/react-query";
import { fetchTermsAndConditions } from "../services/termsAndConditionsApi";

export const useTermsAndConditions = () => {
	return useQuery({
		queryKey: ["termsAndConditions"],
		queryFn: fetchTermsAndConditions,
		retry: 3,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
