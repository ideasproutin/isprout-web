import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchNews = async () => {
  const response = await apiClient.get(API_ENDPOINTS.news);
  return response.data;
};
