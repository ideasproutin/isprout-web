import { useQuery } from "@tanstack/react-query";
import { fetchCancellationPolicy } from "../services/cancellationPolicyApi";

export const useCancellationPolicy = () => {
	return useQuery({
		queryKey: ["cancellationPolicy"],
		queryFn: fetchCancellationPolicy,
		retry: 3,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
