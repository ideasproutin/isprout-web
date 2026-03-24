import { useQuery } from "@tanstack/react-query";
import { fetchCityCenters } from "../services/cityCenterApi";

interface UseCityCentersOptions {
	enabled?: boolean;
}

export const useCityCenters = (options: UseCityCentersOptions = {}) => {
	return useQuery({
		queryKey: ["cityCenters"],
		queryFn: fetchCityCenters,
		enabled: options.enabled ?? true,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
