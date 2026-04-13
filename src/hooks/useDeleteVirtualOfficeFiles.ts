import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	deleteVirtualOfficeFiles,
	type DeleteVirtualOfficeFilesRequest,
	type DeleteVirtualOfficeFilesResponse,
} from "../services/deleteVirtualOfficeFilesApi";

interface UseDeleteVirtualOfficeFilesOptions {
	onSuccess?: (data: DeleteVirtualOfficeFilesResponse) => void;
	onError?: (error: unknown) => void;
}

export const useDeleteVirtualOfficeFiles = (
	options: UseDeleteVirtualOfficeFilesOptions = {},
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: DeleteVirtualOfficeFilesRequest) =>
			deleteVirtualOfficeFiles(payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["bookingData", "VIRTUAL_OFFICE"],
			});
			options.onSuccess?.(data);
		},
		onError: (error) => {
			options.onError?.(error);
		},
	});
};
