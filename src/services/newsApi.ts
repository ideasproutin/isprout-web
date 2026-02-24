import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export const fetchNews = async () => {
  const response = await apiClient.get(public_endpoints.news);
  return response.data;
};
