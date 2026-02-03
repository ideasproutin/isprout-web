import { useQuery } from "@tanstack/react-query";
import { fetchCityCenters } from "../services/cityCenterApi";

export const useCityCenters = () => {
  return useQuery({
    queryKey: ["cityCenters"],
    queryFn: fetchCityCenters,
  });
};
