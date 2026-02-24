import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

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
	const token = localStorage.getItem("authToken");
	console.log("[ProfileAPI] getUser - Token exists:", !!token);
	if (token) {
		console.log("[ProfileAPI] Token preview:", token.substring(0, 20) + "...");
	}
	
	const response = await apiClient.get(API_ENDPOINTS.getUser);
	console.log("[ProfileAPI] getUser response status:", response.status);
	console.log("[ProfileAPI] getUser response data:", response.data);
	return response.data;
};

/** Update the current user's profile */
export const updateUser = async (
	payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
	const token = localStorage.getItem("authToken");
	console.log("[ProfileAPI] updateUser - Token exists:", !!token);
	console.log("[ProfileAPI] updateUser payload:", payload);
	
	const response = await apiClient.put(API_ENDPOINTS.updateUser, payload);
	console.log("[ProfileAPI] updateUser response status:", response.status);
	console.log("[ProfileAPI] updateUser response data:", response.data);
	
	const data: UpdateProfileResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Failed to update profile.");
	}
	return data;
};
