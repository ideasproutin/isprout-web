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
	slots?:
		| string
		| Array<{
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
	startDate?: string;
	endDate?: string;
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

// ─── API Calls ────────────────────────────────────────────────────────────────

/**
 * Meeting Room Booking Data
 * POST /bookings/site/meeting-rooms/get-booking-data?pageIndex=0&pageSize=20
 * Body: { sortColumn, sortDirection }
 */
export const getMeetingRoomBookingData = async (
	payload: GetBookingDataRequest,
): Promise<GetBookingDataResponse> => {
	const {
		pageIndex = 0,
		pageSize = 20,
		sortColumn = "createdAt",
		sortDirection = "desc",
	} = payload;

	console.log("[getMeetingRoomBookingData] POST with query params:", {
		pageIndex,
		pageSize,
	});

	try {
		const accessToken = localStorage.getItem("accessToken");

		const response = await apiClient.post<GetBookingDataResponse>(
			dashboardendpoints.getMeetingRoomBookingData,
			{ sortColumn, sortDirection },
			{
				params: { pageIndex, pageSize },
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			},
		);

		console.log(
			"[getMeetingRoomBookingData] Response status:",
			response.data.status.type,
		);
		console.log(
			"[getMeetingRoomBookingData] Items count:",
			response.data.data.items?.length ||
				response.data.data.item?.length ||
				0,
		);

		if (response.data.status.type === "error") {
			console.log(
				"[getMeetingRoomBookingData] Status type is 'error', returning empty list",
			);
			return {
				...response.data,
				data: { items: [], item: [], count: 0, total: 0 },
				pagination: {
					sortColumn,
					sortDirection,
					total: 0,
					pageSize,
					pageIndex,
				},
			};
		}

		return response.data;
	} catch (error: any) {
		console.error(
			"[getMeetingRoomBookingData] Error:",
			error?.response?.data || error?.message,
		);

		return {
			data: { items: [], item: [], count: 0, total: 0 },
			pagination: {
				sortColumn,
				sortDirection,
				total: 0,
				pageSize,
				pageIndex,
			},
			status: {
				type: "error",
				message:
					error?.response?.data?.status?.message ||
					error?.message ||
					"Failed to fetch meeting room data",
			},
		};
	}
};

/**
 * Virtual Office Data
 * GET /core/site/forms/get-virtual-office-data (no body)
 */
export const getVirtualOfficeData =
	async (): Promise<GetBookingDataResponse> => {
		console.log(
			"[getVirtualOfficeData] GET /core/site/forms/get-virtual-office-data",
		);

		try {
			const accessToken = localStorage.getItem("accessToken");

			const response = await apiClient.get<GetBookingDataResponse>(
				dashboardendpoints.getVirtualOfficeData,
				{
					headers: {
						"X-Auth-Token": accessToken || "",
					},
				},
			);

			console.log(
				"[getVirtualOfficeData] Response status:",
				response.data.status.type,
			);
			console.log(
				"[getVirtualOfficeData] Items count:",
				response.data.data.items?.length ||
					response.data.data.item?.length ||
					0,
			);

			if (response.data.status.type === "error") {
				console.log(
					"[getVirtualOfficeData] Status type is 'error', returning empty list",
				);
				return {
					...response.data,
					data: { items: [], item: [], count: 0, total: 0 },
					pagination: {
						sortColumn: "createdAt",
						sortDirection: "desc",
						total: 0,
						pageSize: 20,
						pageIndex: 0,
					},
				};
			}

			return response.data;
		} catch (error: any) {
			console.error(
				"[getVirtualOfficeData] Error:",
				error?.response?.data || error?.message,
			);

			return {
				data: { items: [], item: [], count: 0, total: 0 },
				pagination: {
					sortColumn: "createdAt",
					sortDirection: "desc",
					total: 0,
					pageSize: 20,
					pageIndex: 0,
				},
				status: {
					type: "error",
					message:
						error?.response?.data?.status?.message ||
						error?.message ||
						"Failed to fetch virtual office data",
				},
			};
		}
	};
