import apiClient from "./api";

export const fetchBlogsIndex = async () => {
	const response = await apiClient.get("/core/static/website/blogs/index.json");
	return response.data;
};

export const fetchBlogById = async (blogId: string) => {
	const response = await apiClient.get(`/core/static/website/blogs/${blogId}/index.json`);
	return response.data;
};
