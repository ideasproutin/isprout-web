import { useQuery } from "@tanstack/react-query";
import {
	getBookingData,
	type DataType,
	type GetBookingDataRequest,
} from "../services/bookingDataApi";
import { hasValidSession } from "../utils/authSession";

/**
 * Unified hook for fetching booking data, forms, and transactions
 * 
 * @param dataType - Type of data to fetch (MEETING_ROOM, VIRTUAL_OFFICE, TRANSACTION, etc.)
 * @param options - Additional query options (sorting, pagination, filters)
 * @param refId - Optional booking reference ID for transaction queries
 */
export const useBookingData = (
	dataType: DataType,
	options?: Partial<GetBookingDataRequest>,
	refId?: string
) => {
	const isLoggedIn = hasValidSession();

	// Build payload based on data type
	const payload: GetBookingDataRequest = {
		sortColumn: options?.sortColumn ?? "createdAt",
		sortDirection: options?.sortDirection ?? "desc",
		pageIndex: options?.pageIndex ?? 0,
		pageSize: options?.pageSize ?? 20,
		filters: {
			...(dataType !== "TRANSACTION" && { formType: dataType }),
			...options?.filters,
		},
		...(refId && { refId }), // Include refId for transaction queries
	};

	// Build query key based on parameters
	const queryKey = refId 
		? ["bookingData", dataType, refId] 
		: ["bookingData", dataType, payload];

	return useQuery({
		queryKey,
		queryFn: () => getBookingData(payload),
		enabled: dataType === "TRANSACTION" ? (isLoggedIn && !!refId) : isLoggedIn,
		staleTime: 30_000,
		retry: 3,
		retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
};
