import { useMemo } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
	fetchBlogById,
	fetchBlogsPage,
	type BlogListItem,
} from "../services/blogsApi";

interface UseBlogsOptions {
	pageSize?: number;
	searchText?: string;
	enabled?: boolean;
}

export const useBlogs = (options: UseBlogsOptions = {}) => {
	const pageSize = options.pageSize ?? 10;
	const searchText = options.searchText ?? "";

	const query = useInfiniteQuery({
		queryKey: ["blogs", { pageSize, searchText }],
		queryFn: ({ pageParam }) =>
			fetchBlogsPage({
				pageIndex: Number(pageParam),
				pageSize,
				searchText,
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage.pagination.pageIndex;
			const total = lastPage.pagination.total;
			const currentPageSize = lastPage.pagination.pageSize;

			return currentPage * currentPageSize < total
				? currentPage + 1
				: undefined;
		},
		enabled: options.enabled ?? true,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	const data = useMemo<BlogListItem[]>(() => {
		if (!query.data?.pages) return [];
		return query.data.pages.flatMap((page) => page.items);
	}, [query.data]);

	const totalCount = query.data?.pages?.[0]?.pagination?.total ?? 0;

	return {
		...query,
		data,
		totalCount,
	};
};

export const useBlog = (blogId: string | undefined) => {
	return useQuery({
		queryKey: ["blog", blogId],
		queryFn: () => fetchBlogById(blogId!),
		enabled: !!blogId,
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 30, // 30 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};
