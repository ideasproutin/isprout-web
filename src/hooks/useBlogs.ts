import { useQuery } from "@tanstack/react-query";
import { fetchBlogsIndex, fetchBlogById } from "../services/blogsApi";

export const useBlogs = () => {
	return useQuery({
		queryKey: ["blogs"],
		queryFn: fetchBlogsIndex,
	});
};

export const useBlog = (blogId: string | undefined) => {
	return useQuery({
		queryKey: ["blog", blogId],
		queryFn: () => fetchBlogById(blogId!),
		enabled: !!blogId,
	});
};
