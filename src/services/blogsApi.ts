import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchBlogsIndex = async () => {
	const response = await apiClient.get(API_ENDPOINTS.blogs);
	return response.data;
};

export const fetchBlogById = async (blogId: string) => {
	const response = await apiClient.get(`/core/static/website/blogs/${blogId}/index.json`);
	return response.data;
};

export const fetchBlogs = async () => {
	const response = await apiClient.get(API_ENDPOINTS.blogs);
	return response.data;
};
