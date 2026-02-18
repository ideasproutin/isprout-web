import { useQuery } from "@tanstack/react-query";
import { fetchCancellationPolicy } from "../services/cancellationPolicyApi";

export const useCancellationPolicy = () => {
	return useQuery({
		queryKey: ["cancellationPolicy"],
		queryFn: fetchCancellationPolicy,
		retry: 3,
		refetchOnWindowFocus: false,
	});
};
