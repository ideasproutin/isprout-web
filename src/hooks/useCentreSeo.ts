import { useQuery } from "@tanstack/react-query";
import { fetchCentreSeo } from "../services/centreSeoApi";

export const useCentreSeo = (centerId: string) => {
	return useQuery({
		queryKey: ["centreSeo", centerId],
		queryFn: () => fetchCentreSeo(centerId),
		enabled: !!centerId,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
