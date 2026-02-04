import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export const fetchBlogs = async () => {
  const response = await apiClient.get(API_ENDPOINTS.blogs);
  return response.data;
};
