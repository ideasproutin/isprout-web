import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export const fetchCareers = async () => {
	const response = await apiClient.get(public_endpoints.careers);
	return response.data;
};

export const submitCareerApplication = async (data: Record<string, unknown>) => {
  const response = await apiClient.post(public_endpoints.formSubmit, data);
  return response.data;
};
