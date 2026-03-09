import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FormType =
	| "VIRTUAL_OFFICE"
	| "CITY_FORM"
	| "CENTER_FORM"
	| "MANAGED_OFFICE"
	| "MEETING_ROOM"
	| "CONTACT_US"
	| "CAREERS";

export interface UserFormItem {
	_id: string;
	formReferenceId?: string;
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
	createdAt: number | string;
	// Booking-specific fields (from meeting room bookings)
	bookingReferenceId?: string;
	bookingStatus?: string;
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
	// Additional fields from API
	userName?: string;
	userEmail?: string;
	cityName?: string;
	centerName?: string;
	seating?: number;
}

export interface GetUserFormsRequest {
	sortColumn?: string;
	sortDirection?: "asc" | "desc";
	pageIndex?: number;
	pageSize?: number;
	filters?: {
		formType?: FormType;
	};
}

export interface GetUserFormsResponse {
	data: {
		items?: UserFormItem[];
		item?: UserFormItem[];
		count: number;
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

export const getUserForms = async (
	payload: GetUserFormsRequest,
): Promise<GetUserFormsResponse> => {
	console.log("[getUserForms] POST /core/site/users/get-user-form - Request payload:", payload);
	
	const response = await apiClient.post(
		dashboardendpoints.getUserForms,
		payload,
	);
	const data: GetUserFormsResponse = response.data;
	
	console.log("[getUserForms] API Response:", {
		statusType: data?.status?.type,
		itemsCount: data?.data?.items?.length || 0,
		hasItems: !!(data?.data?.items),
		firstItem: data?.data?.items?.[0],
	});
	
	// status.type === "error" on a 200 response means "no records found" — treat as empty list.
	// Real server/network errors are thrown by the axios interceptor before reaching here.
	if (data?.status?.type === "error") {
		console.log("[getUserForms] Status type is 'error', returning empty list");
		return {
			...data,
			data: { items: [], item: [], count: 0 },
			pagination: data.pagination ?? {
				sortColumn: "createdAt",
				sortDirection: "desc",
				total: 0,
				pageSize: 20,
				pageIndex: 0,
			},
		};
	}
	
	console.log("[getUserForms] Success - Returning", data.data.items?.length || 0, "items");
	return data;
};
