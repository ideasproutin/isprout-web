import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
	_id: string;
	fullName: string;
	email: string;
	mobile: string;
	isActive?: boolean;
	role?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface UpdateProfileRequest {
	fullName?: string;
	mobile?: string;
}

export interface UpdateProfileResponse {
	status: { type: string; message: string };
	data: UserProfile;
}

export interface GetUserResponse {
	status: { type: string; message: string };
	data: { item: UserProfile };
}

// ─── API Calls ────────────────────────────────────────────────────────────────


/** Fetch the current user's profile */
export const getUser = async (): Promise<GetUserResponse> => {
	const response = await apiClient.get(dashboardendpoints.getUser);
	return response.data;
};

/** Update the current user's profile */
export const updateUser = async (
	payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
	const response = await apiClient.put(dashboardendpoints.updateUser, payload);
	const data: UpdateProfileResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Failed to update profile.");
	}
	return data;
};
