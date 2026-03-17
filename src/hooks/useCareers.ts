import { useQuery } from "@tanstack/react-query";
import { fetchCareers } from "../services/careersApi";

export const useCareers = () => {
	return useQuery({
		queryKey: ["careers"],
		queryFn: fetchCareers,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};
