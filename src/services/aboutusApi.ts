import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export const aboutUs = async () => {
  const response = await apiClient.get(public_endpoints.aboutUs);
  return response.data;
};
