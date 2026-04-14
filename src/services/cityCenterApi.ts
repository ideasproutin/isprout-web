import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export const fetchCityCenters = async () => {
  const response = await apiClient.get(public_endpoints.cityCenters);
  return response.data;
};
