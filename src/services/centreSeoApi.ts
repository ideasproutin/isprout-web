import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchCentreSeo = async (centerId: string) => {
	const response = await apiClient.get(
		`${API_ENDPOINTS.getCentreSEO}/${centerId}/index.json`,
	);
	return response.data;
};
