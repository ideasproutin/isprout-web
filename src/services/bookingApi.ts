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
	payload: CancelBookingRequest,
): Promise<CancelBookingResponse> => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		const endpoint = `${dashboardendpoints.cancelBooking}/${payload.refId}`;

		const response = await apiClient.put<CancelBookingResponse>(
			endpoint,
			{ cancellationReason: payload.cancellationReason },
			{
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			},
		);

		return response.data;
	} catch (error: any) {
		throw error;
	}
};
