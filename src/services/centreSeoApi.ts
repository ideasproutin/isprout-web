import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export const fetchCentreSeo = async (centerId: string) => {
	const response = await apiClient.get(
		`${public_endpoints.getCentreSEO}/${centerId}/index.json`,
	);
	return response.data;
};
