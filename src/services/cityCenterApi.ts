import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchCityCenters = async () => {
  const response = await apiClient.get(API_ENDPOINTS.cityCenters);
  return response.data;
};
