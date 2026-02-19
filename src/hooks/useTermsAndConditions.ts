import { useQuery } from "@tanstack/react-query";
import { fetchTermsAndConditions } from "../services/termsAndConditionsApi";

export const useTermsAndConditions = () => {
	return useQuery({
		queryKey: ["termsAndConditions"],
		queryFn: fetchTermsAndConditions,
		retry: 3,
		refetchOnWindowFocus: false,
	});
};
