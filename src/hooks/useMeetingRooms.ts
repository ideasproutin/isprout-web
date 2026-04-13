import { useState, useCallback } from "react";
import {
	fetchMeetingRoomsByDateAndCenter,
	type MeetingRoom,
	type MeetingRoomResponse,
} from "../services/meetingRoomApi";

interface MeetingRoomRequest {
	bookingDate: string;
	cityId?: string;
	centerId?: string;
}

interface UseMeetingRoomsReturn {
	data: MeetingRoom[] | null;
	isLoading: boolean;
	isError: boolean;
	error: string | null;
	fetchRooms: (
		bookingDate: string,
		cityId?: string,
		centerId?: string,
	) => Promise<void>;
}

export const useMeetingRooms = (): UseMeetingRoomsReturn => {
	const [data, setData] = useState<MeetingRoom[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchRooms = useCallback(
		async (bookingDate: string, cityId?: string, centerId?: string) => {
			// Do not call the API if bookingDate is empty
			if (!bookingDate) return;

			setIsLoading(true);
			setIsError(false);
			setError(null);

			try {
				const request: MeetingRoomRequest = {
					bookingDate,
				};

				if (cityId) {
					request.cityId = cityId;
				}
				if (centerId) {
					request.centerId = centerId;
				}

				const response: MeetingRoomResponse | any =
					await fetchMeetingRoomsByDateAndCenter(request);

				const items =
					response?.data?.items ??
					response?.data?.data?.items ??
					response?.items ??
					[];

				if (Array.isArray(items)) {
					setData(items);
				} else {
					setData([]);
					console.warn("⚠️ Unexpected response format:", response);
				}
			} catch (err) {
				setIsError(true);
				const errorMessage =
					err instanceof Error
						? err.message
						: "Failed to fetch meeting rooms";
				setError(errorMessage);
				console.error("❌ Error fetching meeting rooms:", err);
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	return { data, isLoading, isError, error, fetchRooms };
};
