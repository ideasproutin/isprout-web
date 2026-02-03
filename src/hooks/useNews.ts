import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../services/newsApi";

export const useNews = () => {
	return useQuery({
		queryKey: ["news"],
		queryFn: fetchNews,
	});
};
