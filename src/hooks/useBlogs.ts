import { useQuery } from "@tanstack/react-query";
import { fetchBlogsIndex, fetchBlogById } from "../services/blogsApi";

export const useBlogs = () => {
	return useQuery({
		queryKey: ["blogs"],
		queryFn: fetchBlogsIndex,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};

export const useBlog = (blogId: string | undefined) => {
	return useQuery({
		queryKey: ["blog", blogId],
		queryFn: () => fetchBlogById(blogId!),
		enabled: !!blogId,
		staleTime: 1000 * 60, // 1 minute
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
};
