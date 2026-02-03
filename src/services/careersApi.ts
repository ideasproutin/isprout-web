import apiClient from "./api";

export const fetchCareers = async () => {
	const path = "/core/static/website/careers/index.json";
	const response = await apiClient.get(path);
	return response.data;
};
