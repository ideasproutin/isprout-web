import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	updateVirtualOfficeForm,
	type UpdateVirtualOfficeFormPayload,
	type UpdateVirtualOfficeFormResponse,
} from "../services/updateVirtualOfficeFormApi";

interface UseUpdateVirtualOfficeFormOptions {
	onSuccess?: (data: UpdateVirtualOfficeFormResponse) => void;
	onError?: (error: unknown) => void;
}

export const useUpdateVirtualOfficeForm = (
	options: UseUpdateVirtualOfficeFormOptions = {},
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UpdateVirtualOfficeFormPayload) =>
			updateVirtualOfficeForm(payload),
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
