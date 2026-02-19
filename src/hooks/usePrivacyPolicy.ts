import { useQuery } from "@tanstack/react-query";
import { fetchPrivacyPolicy } from "../services/privacyPolicyApi";

export const usePrivacyPolicy = () => {
	return useQuery({
		queryKey: ["privacyPolicy"],
		queryFn: fetchPrivacyPolicy,
		retry: 3,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
