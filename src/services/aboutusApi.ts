import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const aboutUs = async () => {
  const response = await apiClient.get(API_ENDPOINTS.aboutUs);
  return response.data;
};
