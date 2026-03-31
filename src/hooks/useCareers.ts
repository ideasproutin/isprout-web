import { useQuery } from "@tanstack/react-query";
import { fetchCareers } from "../services/careersApi";

interface UseCareersOptions {
	enabled?: boolean;
}

export const useCareers = (options: UseCareersOptions = {}) => {
	return useQuery({
		queryKey: ["careers"],
		queryFn: fetchCareers,
		enabled: options.enabled ?? true,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};
