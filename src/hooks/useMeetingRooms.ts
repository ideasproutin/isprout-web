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

				console.log("📍 Fetching meeting rooms with:", request);

				const response: MeetingRoomResponse =
					await fetchMeetingRoomsByDateAndCenter(request);

				if (
					response &&
					response.data &&
					response.data.items &&
					Array.isArray(response.data.items)
				) {
					setData(response.data.items);
					console.log(
						"✅ Meeting rooms fetched successfully:",
						response.data.items,
					);
				} else {
					setData([]);
					console.warn("⚠️ Unexpected response format:", response);
				}
			} catch (err) {
				setIsError(true);
				const errorMessage =
					err instanceof Error ? err.message : "Failed to fetch meeting rooms";
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
