import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	cancelBooking,
	type CancelBookingRequest,
	type CancelBookingResponse,
} from "../services/bookingApi";
import toast from "react-hot-toast";

interface UseCancelBookingOptions {
	onSuccess?: (data: CancelBookingResponse) => void;
	onError?: (error: any) => void;
	showToast?: boolean;
}

export const useCancelBooking = (options: UseCancelBookingOptions = {}) => {
	const { onSuccess, onError, showToast = true } = options;

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CancelBookingRequest) => cancelBooking(payload),
		onSuccess: (data) => {
			// Check if the API returned an error status even with HTTP 200
			if (data.status?.type === "error") {
				if (showToast) {
					toast.error(
						data.status.message || "Failed to cancel booking",
					);
				}
				onError?.(new Error(data.status.message));
				return;
			}

			queryClient.invalidateQueries({ queryKey: ["bookingData"] });

			if (showToast) {
				toast.success(
					data.status?.message || "Booking cancelled successfully",
				);
			}

			onSuccess?.(data);
		},
		onError: (error: any) => {
			console.error("[useCancelBooking] onError called");
			console.error("[useCancelBooking] Error object:", error);

			if (showToast) {
				const errorMessage =
					error?.response?.data?.status?.message ||
					error?.message ||
					"Failed to cancel booking. Please try again.";
				toast.error(errorMessage);
			}

			onError?.(error);
		},
	});
};
