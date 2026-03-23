import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "../services/faqApi";

interface UseFaqsOptions {
	enabled?: boolean;
}

export const useFaqs = (options: UseFaqsOptions = {}) => {
	return useQuery({
		queryKey: ["faqs"],
		queryFn: fetchFaqs,
		enabled: options.enabled ?? true,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
