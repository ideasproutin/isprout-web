import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CancelBookingRequest {
	refId: string; // MongoDB _id of the booking (not bookingReferenceId)
	cancellationReason: string;
}

export interface CancelBookingResponse {
	status: {
		type: string;
		message: string;
		description?: string;
	};
	data?: any;
}

// ─── API Functions ────────────────────────────────────────────────────────────

export const cancelBooking = async (
	payload: CancelBookingRequest
): Promise<CancelBookingResponse> => {
	console.log("[cancelBooking] ========== CANCEL BOOKING REQUEST ==========");
	console.log("[cancelBooking] Request payload:", payload);

	try {
		// Get access token from localStorage
		const accessToken = localStorage.getItem("accessToken");
		// Build endpoint with MongoDB _id in the URL path (not bookingReferenceId)
		const endpoint = `${dashboardendpoints.cancelBooking}/${payload.refId}`;

		console.log("[cancelBooking] Authorization token:", accessToken ? "Present (length: " + accessToken?.length + ")" : "Missing");
		console.log("[cancelBooking] Booking _id:", payload.refId);
		console.log("[cancelBooking] Base endpoint:", dashboardendpoints.cancelBooking);
		console.log("[cancelBooking] Full endpoint:", endpoint);
		console.log("[cancelBooking] Request body:", JSON.stringify({ cancellationReason: payload.cancellationReason }, null, 2));
		console.log("[cancelBooking] HTTP Method: PUT");

		const response = await apiClient.put<CancelBookingResponse>(
			endpoint,
			{ cancellationReason: payload.cancellationReason },
			{
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			},
		);

		console.log("[cancelBooking] ========== RESPONSE RECEIVED ==========");
		console.log("[cancelBooking] HTTP Status:", response.status);
		console.log("[cancelBooking] Status Text:", response.statusText);
		console.log("[cancelBooking] Response data:", JSON.stringify(response.data, null, 2));
		console.log("[cancelBooking] Response status type:", response.data?.status?.type);
		console.log("[cancelBooking] Response status message:", response.data?.status?.message);

		// Check if the response indicates an error
		if (response.data?.status?.type === "error") {
			console.error("[cancelBooking] ========== API RETURNED ERROR STATUS ==========");
			console.error("[cancelBooking] Error message:", response.data.status.message);
			if (response.data.status.description) {
				console.error("[cancelBooking] Error description:", response.data.status.description);
			}
			console.error("[cancelBooking] This is a BACKEND ERROR - API returned success HTTP status but error status type");
		}

		return response.data;
	} catch (error: any) {
		console.error("[cancelBooking] ========== ERROR OCCURRED ==========");
		console.error("[cancelBooking] Error type:", error?.name);
		console.error("[cancelBooking] Error message:", error?.message);
		console.error("[cancelBooking] HTTP Status Code:", error?.response?.status);
		console.error("[cancelBooking] Status Text:", error?.response?.statusText);
		console.error("[cancelBooking] Error response data:", JSON.stringify(error?.response?.data, null, 2));
		console.error("[cancelBooking] Request URL:", error?.config?.url);
		console.error("[cancelBooking] Request Method:", error?.config?.method?.toUpperCase());
		console.error("[cancelBooking] Request Headers:", error?.config?.headers);
		
		if (error?.response?.status === 404) {
			console.error("[cancelBooking] 404 ERROR - Endpoint not found. This is a BACKEND/ROUTING issue.");
		} else if (error?.response?.status === 400) {
			console.error("[cancelBooking] 400 ERROR - Bad Request. Check if booking ID is valid.");
		} else if (error?.response?.status === 401) {
			console.error("[cancelBooking] 401 ERROR - Unauthorized. Token may be invalid.");
		} else if (!error?.response) {
			console.error("[cancelBooking] NETWORK ERROR - No response from server. This is a FRONTEND/NETWORK issue.");
		}
		
		throw error;
	}
};
