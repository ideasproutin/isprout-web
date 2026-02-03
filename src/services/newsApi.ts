import apiClient from "./api";

export const fetchNews = async () => {
	const path = "/core/static/website/news/index.json";
	const response = await apiClient.get(path);
	return response.data;
};
