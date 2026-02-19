import { useQuery } from "@tanstack/react-query";
import { fetchRefundPolicy } from "../services/refundPolicyApi";

export const useRefundPolicy = () => {
	return useQuery({
		queryKey: ["refundPolicy"],
		queryFn: fetchRefundPolicy,
		retry: 3,
		refetchOnWindowFocus: false,
	});
};
