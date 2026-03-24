import { useQuery } from "@tanstack/react-query";
import {
	createNewsQueryKey,
	fetchNews,
	type NewsQueryParams,
} from "../services/newsApi";

interface UseNewsOptions {
	enabled?: boolean;
}

export const useNews = (params?: NewsQueryParams, options: UseNewsOptions = {}) => {
	return useQuery({
		queryKey: createNewsQueryKey(params),
		queryFn: () => fetchNews(params),
		enabled: options.enabled ?? true,
		staleTime: 1000 * 60, // 1 minute
		gcTime: 1000 * 60 * 3, // 3 minutes
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
		placeholderData: (previousData) => previousData,
	});
};
