import { useQuery } from "@tanstack/react-query";
import { fetchPrivacyPolicy } from "../services/privacyPolicyApi";

export const usePrivacyPolicy = () => {
	return useQuery({
		queryKey: ["privacyPolicy"],
		queryFn: fetchPrivacyPolicy,
		retry: 3,
		refetchOnWindowFocus: false,
	});
};
