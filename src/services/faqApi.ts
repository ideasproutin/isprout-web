import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchFaqs = async () => {
  const response = await apiClient.get(API_ENDPOINTS.faqs);
  return response.data;
};
