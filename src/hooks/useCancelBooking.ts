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
	const {
		onSuccess,
		onError,
		showToast = true,
	} = options;

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CancelBookingRequest) => cancelBooking(payload),
		onSuccess: (data) => {
			console.log("[useCancelBooking] onSuccess called");
			console.log("[useCancelBooking] Response data:", data);
			console.log("[useCancelBooking] Status type:", data.status?.type);
			
			// Check if the API returned an error status even with HTTP 200
			if (data.status?.type === "error") {
				console.error("[useCancelBooking] BACKEND ERROR in success handler:", data.status.message);
				
				if (showToast) {
					toast.error(data.status.message || "Failed to cancel booking");
				}
				
				// Call onError instead of onSuccess
				onError?.(new Error(data.status.message));
				return;
			}
			
			// Invalidate and refetch user forms to update the booking list
			queryClient.invalidateQueries({ queryKey: ["userForms"] });
			queryClient.invalidateQueries({ queryKey: ["userTransactions"] });

			if (showToast) {
				toast.success(data.status?.message || "Booking cancelled successfully");
			}

			onSuccess?.(data);
		},
		onError: (error: any) => {
			console.error("[useCancelBooking] onError called");
			console.error("[useCancelBooking] Error object:", error);

			if (showToast) {
				const errorMessage = error?.response?.data?.status?.message 
					|| error?.message 
					|| "Failed to cancel booking. Please try again.";
				toast.error(errorMessage);
			}

			onError?.(error);
		},
	});
};
