import apiClient from "./api";

export const fetchCityCenters = async () => {
  const response = await apiClient.get(
   "/core/static/website/cities-centers/index.json"
  );
  return response.data;
};
