import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export interface BlogListItem {
	_id?: string;
	id: string;
	date: string;
	heading: string;
	image_url: string;
	meta_description?: string;
	meta_title?: string;
	tags?: string[];
	createdAt?: string;
	updatedAt?: string;
	[key: string]: unknown;
}

export interface BlogDetailItem {
	heading: string;
	date: string;
	tags?: string[];
	image_url: string;
	image?: string | string[];
	meta_title?: string;
	meta_description?: string;
	meta_descritpion?: string[];
	points_description?: Array<Record<string, unknown>>;
	points?: string[];
	conclusion?: Array<Record<string, unknown> | string>;
	content?: string[] | string;
	links?: Record<string, string>;
	sources?: Array<{
		name: string;
		url: string;
	}>;
	client_name_1?: string;
	disignation_1?: string;
	company_1?: string;
	client_name_2?: string;
	disignation_2?: string;
	company_2?: string;
	[key: string]: unknown;
}

interface BlogsPagination {
	total: number;
	pageSize: number;
	pageIndex: number;
	sortColumn?: string | null;
	sortDirection?: string | null;
}

interface BlogsListResponse {
	data?: {
		items?: BlogListItem[];
		count?: number;
	};
	pagination?: BlogsPagination;
	status?: {
		type?: string;
		message?: string;
	};
}

interface BlogDetailResponse {
	data?: {
		item?: BlogDetailItem;
	};
	status?: {
		type?: string;
		message?: string;
	};
}

export interface FetchBlogsPageParams {
	pageIndex?: number;
	pageSize?: number;
	searchText?: string;
}

export interface BlogsPageResult {
	items: BlogListItem[];
	pagination: BlogsPagination;
	count: number;
}

export const fetchBlogsPage = async ({
	pageIndex = 1,
	pageSize = 10,
	searchText = "",
}: FetchBlogsPageParams = {}): Promise<BlogsPageResult> => {
	const response = await apiClient.post<BlogsListResponse>(
		`${public_endpoints.blogs}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		{
			filters: {
				searchText,
			},
		},
	);

	return {
		items: response.data?.data?.items ?? [],
		pagination: response.data?.pagination ?? {
			total: 0,
			pageSize,
			pageIndex,
			sortColumn: null,
			sortDirection: null,
		},
		count: response.data?.data?.count ?? 0,
	};
};

export const fetchBlogById = async (blogId: string) => {
	const response = await apiClient.get<BlogDetailResponse>(
		`${public_endpoints.blogById}/${encodeURIComponent(blogId)}`,
	);
	return response.data?.data?.item;
};

export const fetchBlogs = async () => {
	const page = await fetchBlogsPage({ pageIndex: 1, pageSize: 10 });
	return page.items;
};
