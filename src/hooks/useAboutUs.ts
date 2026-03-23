import { useQuery } from "@tanstack/react-query";
import { aboutUs } from "../services/aboutusApi";

interface UseAboutUsOptions {
	enabled?: boolean;
}

export const useAboutUs = (options: UseAboutUsOptions = {}) => {
	return useQuery({
		queryKey: ["aboutus"],
		queryFn: aboutUs,
		enabled: options.enabled ?? true,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
