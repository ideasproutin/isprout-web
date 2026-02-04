import apiClient from "./api";

export const fetchFaqs = async () => {
    const path = "/core/static/website/faqs/index.json";
  const response = await apiClient.get(path);
  return response.data;
};
