import apiClient from "./api";

export const fetchFaqs = async () => {
  const response = await apiClient.get(
   "/core/static/website/faqs/index.json"
  );
  return response.data;
};
