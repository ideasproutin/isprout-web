import { useQuery } from "@tanstack/react-query";
import { fetchCareers } from "../services/careersApi";

export const useCareers = () => {
	return useQuery({
		queryKey: ["careers"],
		queryFn: fetchCareers,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
