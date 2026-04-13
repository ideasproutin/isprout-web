import { useQuery } from "@tanstack/react-query";
import {
	getMeetingRoomBookingData,
	getVirtualOfficeData,
	type GetBookingDataRequest,
} from "../services/bookingDataApi";
import { hasValidSession } from "../utils/authSession";

/**
 * Hook for fetching meeting room booking data
 * POST /bookings/site/meeting-rooms/get-booking-data?pageIndex&pageSize
 */
export const useMeetingRoomBookingData = (
	options?: Partial<GetBookingDataRequest>,
) => {
	const isLoggedIn = hasValidSession();

	const payload: GetBookingDataRequest = {
		sortColumn: options?.sortColumn ?? "createdAt",
		sortDirection: options?.sortDirection ?? "desc",
		pageIndex: options?.pageIndex ?? 0,
		pageSize: options?.pageSize ?? 20,
	};

	return useQuery({
		queryKey: ["bookingData", "MEETING_ROOM", payload],
		queryFn: () => getMeetingRoomBookingData(payload),
		enabled: isLoggedIn,
		staleTime: 0,
		retry: 3,
		retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
};

/**
 * Hook for fetching virtual office data
 * GET /core/site/forms/get-virtual-office-data (no body)
 */
export const useVirtualOfficeData = () => {
	const isLoggedIn = hasValidSession();

	return useQuery({
		queryKey: ["bookingData", "VIRTUAL_OFFICE"],
		queryFn: () => getVirtualOfficeData(),
		enabled: isLoggedIn,
		staleTime: 0,
		retry: 3,
		retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
};
