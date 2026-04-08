import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	uploadVirtualOfficeFiles,
	type UploadVirtualOfficeFilesRequest,
	type UploadVirtualOfficeFilesResponse,
} from "../services/uploadVirtualOfficeFilesApi";

interface UseUploadVirtualOfficeFilesOptions {
	onSuccess?: (data: UploadVirtualOfficeFilesResponse) => void;
	onError?: (error: unknown) => void;
}

export const useUploadVirtualOfficeFiles = (
	options: UseUploadVirtualOfficeFilesOptions = {},
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UploadVirtualOfficeFilesRequest) =>
			uploadVirtualOfficeFiles(payload),
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
