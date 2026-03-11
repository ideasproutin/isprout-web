import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataType =
	| "VIRTUAL_OFFICE"
	| "CITY_FORM"
	| "CENTER_FORM"
	| "MANAGED_OFFICE"
	| "MEETING_ROOM"
	| "CONTACT_US"
	| "CAREERS"
	| "TRANSACTION";

export interface BookingItem {
	_id: string;
	formReferenceId?: string;
	bookingReferenceId?: string;
	userId: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	companyName?: string;
	city?: string;
	center?: string;
	requirements?: string;
	managerCabin?: boolean;
	conferenceRoom?: boolean;
	source?: string;
	preferredCity?: string;
	requiredSeats?: number;
	meetingRoomCode?: string;
	bookingDate?: string;
	slots?: string | Array<{
		startTime: string;
		endTime: string;
		durationInMinutes?: number;
		rate?: number;
		slotType?: string;
		_id?: string;
	}>;
	hours?: string;
	price?: string;
	status?: string;
	bookingStatus?: string;
	createdAt: number | string;
	totalAmount?: number;
	baseAmount?: number;
	gst?: number;
	cityId?: string;
	centerId?: string;
	floorId?: string;
	bookingType?: string;
	totalDurationInMinutes?: number;
	meetingRoomId?: string;
	meetingRoomName?: string;
	userName?: string;
	userEmail?: string;
	cityName?: string;
	centerName?: string;
	seating?: number;
	// Embedded transactions
	transactions?: Transaction[];
}

export interface Transaction {
	_id: string;
	userId?: string;
	transactionId?: string;
	transactionType: string;
	amount: string | number;
	balance?: number;
	description?: string;
	status?: string;
	createdAt: number | string;
	updatedAt?: number | string;
	referenceId?: string;
	paymentMode?: string;
	remarks?: string;
	transactionMode?: string; // "debit" | "credit"
	transactionMedium?: string;
	bookingDate?: string;
	refId?: string;
	bookingRefId?: string;
	isActive?: boolean;
}

export interface GetBookingDataRequest {
	sortColumn?: string;
	sortDirection?: "asc" | "desc";
	pageIndex?: number;
	pageSize?: number;
	filters?: {
		formType?: DataType;
		transactionType?: string;
		status?: string;
		startDate?: string;
		endDate?: string;
	};
	refId?: string; // For fetching transactions for a specific booking
}

export interface GetBookingDataResponse {
	data: {
		items?: (BookingItem | Transaction)[];
		item?: (BookingItem | Transaction)[];
		count: number;
		total?: number;
	};
	pagination: {
		sortColumn: string;
		sortDirection: string;
		total: number;
		pageSize: number;
		pageIndex: number;
	};
	status: {
		type: string;
		message: string;
	};
}

// ─── API Call ─────────────────────────────────────────────────────────────────

export const getBookingData = async (
	payload: GetBookingDataRequest,
): Promise<GetBookingDataResponse> => {
	console.log("[getBookingData] POST /core/site/users/get-booking-data - Request payload:", JSON.stringify(payload, null, 2));
	
	try {
		// Get access token manually for protected endpoints
		const accessToken = localStorage.getItem("accessToken");
		
		const response = await apiClient.post<GetBookingDataResponse>(
			dashboardendpoints.getBookingData,
			payload,
			{
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			}
		);

		console.log("[getBookingData] Response status:", response.data.status.type);
		console.log("[getBookingData] Items count:", response.data.data.items?.length || response.data.data.item?.length || 0);
		
		if (response.data.data.items?.length || response.data.data.item?.length) {
			console.log("[getBookingData] First item with transactions:", response.data.data.items?.[0] || response.data.data.item?.[0]);
		}

		// Handle error status (e.g., "no records found")
		if (response.data.status.type === "error") {
			console.log("[getBookingData] Status type is 'error', returning empty list");
			return {
				...response.data,
				data: { items: [], item: [], count: 0, total: 0 },
				pagination: {
					sortColumn: payload.sortColumn || "createdAt",
					sortDirection: payload.sortDirection || "desc",
					total: 0,
					pageSize: payload.pageSize || 20,
					pageIndex: payload.pageIndex || 0,
				},
			};
		}

		return response.data;
	} catch (error: any) {
		console.error("[getBookingData] Error:", error);
		console.error("[getBookingData] Error details:", {
			message: error?.message,
			status: error?.response?.status,
			data: error?.response?.data,
		});

		// Return empty data on error
		return {
			data: { items: [], item: [], count: 0, total: 0 },
			pagination: {
				sortColumn: payload.sortColumn || "createdAt",
				sortDirection: payload.sortDirection || "desc",
				total: 0,
				pageSize: payload.pageSize || 20,
				pageIndex: payload.pageIndex || 0,
			},
			status: {
				type: "error",
				message: error?.response?.data?.status?.message || error?.message || "Failed to fetch booking data",
			},
		};
	}
};
