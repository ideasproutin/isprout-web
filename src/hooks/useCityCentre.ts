import { useQuery } from "@tanstack/react-query";
import { fetchCityCenters } from "../services/cityCenterApi";

export const useCityCenters = () => {
	return useQuery({
		queryKey: ["cityCenters"],
		queryFn: fetchCityCenters,
		staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
