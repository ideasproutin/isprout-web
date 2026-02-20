import { useQuery } from "@tanstack/react-query";
import { fetchRefundPolicy } from "../services/refundPolicyApi";

export const useRefundPolicy = () => {
	return useQuery({
		queryKey: ["refundPolicy"],
		queryFn: fetchRefundPolicy,
		retry: 3,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
