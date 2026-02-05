import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

interface MeetingRoomRequest {
	bookingDate: string;
	cityId?: string;
	centerId?: string;
}

interface TimeSlot {
	startTime: string;
	endTime: string;
	rate: string;
	slotType: string;
	_id: string;
	availability: {
		booked: boolean;
		bookingId: string | null;
	};
}

interface RateCard {
	_id: string;
	meetingRoomId: string;
	dayOfWeek: string;
	timeSlots: TimeSlot[];
	timeSlotsAggregators: any[];
	__v: number;
	createdAt: string;
	updatedAt: string;
}

export interface MeetingRoom {
	_id: string;
	name: string;
	code: string;
	seating: number;
	capacity: number;
	pricePerHour: number;
	images: string[];
	openingTime: string;
	closingTime: string;
	rateCards: RateCard[];
	cityId?: {
		_id: string;
		city: string;
		code: string;
		state: string;
	};
	centerId?: {
		_id: string;
		center_name: string;
		code: string;
		city: string;
	};
	floorId?: {
		_id: string;
		floor: string;
	};
}

export interface MeetingRoomResponse {
	data: {
		items: MeetingRoom[];
		count: number;
	};
	status: {
		type: string;
		message: string;
	};
}

export const fetchMeetingRoomsByDateAndCenter = async (
	request: MeetingRoomRequest,
): Promise<MeetingRoomResponse> => {
	const response = await apiClient.post(
		API_ENDPOINTS.getMeetingRoomsByDateAndCenter,
		request,
	);
	return response.data;
};
