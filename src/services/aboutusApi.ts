import apiClient from "./api";

export const aboutUs = async () => {
  const response = await apiClient.get(
   "core/static/website/about-us/index.json"
  );
  return response.data;
};
