import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchCareers = async () => {
	const response = await apiClient.get(API_ENDPOINTS.careers);
	return response.data;
};

export const submitCareerApplication = async (data: Record<string, unknown>) => {
  const response = await apiClient.post(API_ENDPOINTS.formSubmit, data);
  return response.data;
};
