import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserTransaction {
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
	// Transaction metadata
	referenceId?: string;
	paymentMode?: string;
	remarks?: string;
	// Booking transaction specific fields
	transactionMode?: string; // "debit" | "credit"
	transactionMedium?: string; // "iwebsite"
	bookingDate?: string;
	refId?: string; // Booking reference ID (e.g., "ISP2593")
	bookingRefId?: string;
	isActive?: boolean;
}

export interface GetUserTransactionsRequest {
	sortColumn?: string;
	sortDirection?: "asc" | "desc";
	pageIndex?: number;
	pageSize?: number;
	filters?: {
		transactionType?: string;
		status?: string;
		startDate?: string;
		endDate?: string;
	};
}

export interface GetUserTransactionsResponse {
	data: {
		items?: UserTransaction[];
		item?: UserTransaction[];
		count: number;
		total?: number;
	};
	pagination: {
		sortColumn: string;
		sortDirection: "asc" | "desc";
		total: number;
		pageSize: number;
		pageIndex: number;
	};
	status: {
		type: string;
		message: string;
	};
}

// ─── API Functions ────────────────────────────────────────────────────────────

export const getUserTransactions = async (
	payload: any
): Promise<GetUserTransactionsResponse> => {
	console.log("[getUserTransactions] POST /core/site/users/get-user-transaction - Request payload:", JSON.stringify(payload, null, 2));

	try {
		// Get access token manually (similar to cancelBooking API)
		const accessToken = localStorage.getItem("accessToken");
		
		const response = await apiClient.post<GetUserTransactionsResponse>(
			dashboardendpoints.getUserTransactions,
			payload,
			{
				headers: {
					"X-Auth-Token": accessToken || "",
				},
			}
		);

		console.log("[getUserTransactions] Response status:", response.data.status.type);
		console.log("[getUserTransactions] Full response:", JSON.stringify(response.data, null, 2));
		console.log("[getUserTransactions] Items count:", response.data.data.items?.length || response.data.data.item?.length || 0);
		
		if (response.data.data.items?.length || response.data.data.item?.length) {
			console.log("[getUserTransactions] First transaction:", response.data.data.items?.[0] || response.data.data.item?.[0]);
		}

		// Handle error status
		if (response.data.status.type === "error") {
			console.error("[getUserTransactions] API returned error:", response.data.status.message);
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
		console.error("[getUserTransactions] ===== ERROR DETAILS =====");
		console.error("[getUserTransactions] Status:", error?.response?.status);
		console.error("[getUserTransactions] Status Text:", error?.response?.statusText);
		console.error("[getUserTransactions] Error response:", JSON.stringify(error?.response?.data, null, 2));
		console.error("[getUserTransactions] Request URL:", error?.config?.url);
		console.error("[getUserTransactions] Request payload:", JSON.stringify(payload, null, 2));
		console.error("[getUserTransactions] Has accessToken:", !!localStorage.getItem("accessToken"));
		console.error("[getUserTransactions] ========================");
		
		// Return empty result instead of throwing
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
				message: error?.response?.data?.status?.message || error?.response?.data?.message || error.message || "Failed to fetch transactions",
			},
		};
	}
};
