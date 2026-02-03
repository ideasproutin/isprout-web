import { useQuery } from "@tanstack/react-query";
import { fetchCareers } from "../services/careersApi";

export const useCareers = () => {
	return useQuery({
		queryKey: ["careers"],
		queryFn: fetchCareers,
	});
};
