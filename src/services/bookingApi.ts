import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CancelBookingRequest {
	refId: string;
	cancellationReason: string;
}

export interface CancelBookingResponse {
	status: {
		type: string;
		message: string;
	};
	data?: any;
}

// ─── API Functions ────────────────────────────────────────────────────────────

export const cancelBooking = async (
	payload: CancelBookingRequest
): Promise<CancelBookingResponse> => {
	console.log("[cancelBooking] Request payload:", payload);

	try {
		// Get access token from localStorage
		const accessToken = localStorage.getItem("accessToken");

		console.log("[cancelBooking] Authorization token:", accessToken ? "Present" : "Missing");
		console.log("[cancelBooking] Endpoint:", dashboardendpoints.cancelBooking);

		const response = await apiClient.post<CancelBookingResponse>(
			dashboardendpoints.cancelBooking,
			payload,
			{
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			},
		);

		console.log("[cancelBooking] Response status:", response.status);
		console.log("[cancelBooking] Response data:", response.data);

		return response.data;
	} catch (error: any) {
		console.error("[cancelBooking] Error canceling booking:", error);
		console.error("[cancelBooking] Error response:", error?.response?.data);
		console.error("[cancelBooking] Error status:", error?.response?.status);
		console.error("[cancelBooking] Full error:", JSON.stringify(error?.response, null, 2));
		throw error;
	}
};
