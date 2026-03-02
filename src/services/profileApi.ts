import axios from "axios";
import apiClient from "./api";
import { API_BASE_URL } from "./api";
import { dashboardendpoints } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
	_id: string;
	fullName: string;
	email: string;
	mobile: string;
	profilePicture?: string;
	isActive?: boolean;
	role?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface UpdateProfileRequest {
	fullName?: string;
	mobile?: string;
	profilePicture?: string;
}

export interface UpdateProfileResponse {
	status: { type: string; message: string };
	data: UserProfile;
}

export interface GetUserResponse {
	status: { type: string; message: string };
	data: { item: UserProfile };
}

export interface UploadProfilePictureResponse {
	status: { type: string; message: string };
	data: { item: { attachmentUrls: string[] } };
}

// ─── API Calls ────────────────────────────────────────────────────────────────


/** Fetch the current user's profile */
export const getUser = async (): Promise<GetUserResponse> => {
	const response = await apiClient.get(dashboardendpoints.getUser);
	const data: GetUserResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Failed to fetch profile.");
	}
	return data;
};

/** Upload a profile picture */
export const uploadProfilePicture = async (file: File): Promise<UploadProfilePictureResponse> => {
	const formData = new FormData();
	formData.append("attachments", file);

	const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
	const headers: Record<string, string> = {};
	if (token) {
		headers["X-Auth-Token"] = token;
	}
	// Do NOT set Content-Type — let browser auto-set multipart/form-data with correct boundary

	const response = await axios.post(
		`${API_BASE_URL}/api/v2${dashboardendpoints.uploadProfilePicture}`,
		formData,
		{ headers },
	);
	const data: UploadProfilePictureResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Failed to upload profile picture.");
	}
	return data;
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
