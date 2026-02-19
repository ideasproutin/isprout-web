import { useQuery } from "@tanstack/react-query";
import { aboutUs } from "../services/aboutusApi";

export const useAboutUs = () => {
	return useQuery({
		queryKey: ["aboutus"],
		queryFn: aboutUs,
		staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
