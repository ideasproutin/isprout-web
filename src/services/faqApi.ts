import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export const fetchFaqs = async () => {
  const response = await apiClient.get(public_endpoints.faqs);
  return response.data;
};
