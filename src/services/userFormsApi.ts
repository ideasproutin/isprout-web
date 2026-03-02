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
	formReferenceId: string;
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
	slots?: string;
	hours?: string;
	price?: string;
	status?: string;
	createdAt: number;
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
	const response = await apiClient.post(
		dashboardendpoints.getUserForms,
		payload,
	);
	const data: GetUserFormsResponse = response.data;
	// status.type === "error" on a 200 response means "no records found" — treat as empty list.
	// Real server/network errors are thrown by the axios interceptor before reaching here.
	if (data?.status?.type === "error") {
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
	return data;
};
