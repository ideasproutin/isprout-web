import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "../services/faqApi";

export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });
};
