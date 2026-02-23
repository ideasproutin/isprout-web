import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthenticateUserRequest {
	email: string;
	mode: string;
    captchaToken: string;
}

export interface AuthenticateUserResponse {
	status: { type: string; message: string };
	data?: { message?: string };
}

export interface VerifyUserRequest {
	email: string;
	otp: string;
}

export interface VerifyUserResponse {
	status: { type: string; message: string };
	data: {
		token: string;
		isNewUser?: boolean;
		user?: UserProfile;
	};
}

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

// ─── API Calls ────────────────────────────────────────────────────────────────

/** Step 1 – Send OTP to the provided email */
export const authenticateUser = async (
	payload: AuthenticateUserRequest,
): Promise<AuthenticateUserResponse> => {
	const response = await apiClient.post(
		API_ENDPOINTS.authenticateUser,
		payload,
	);
	const data: AuthenticateUserResponse = response.data;
	// Some backends return HTTP 200 with status.type = "error" in the body
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Failed to send OTP.");
	}
	return data;
};

/** Step 2 – Verify OTP and receive auth token */
export const verifyUser = async (
	payload: VerifyUserRequest,
): Promise<VerifyUserResponse> => {
	const response = await apiClient.post(API_ENDPOINTS.verifyUser, payload);
	const data: VerifyUserResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "OTP verification failed.");
	}
	return data;
};

/** Fetch the current user's profile */
export const getUser = async (): Promise<{
	status: { type: string; message: string };
	data: { item: UserProfile };
}> => {
	const response = await apiClient.get(API_ENDPOINTS.getUser);
	return response.data;
};

/** Update the current user's profile */
export const updateUser = async (
	payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
	const response = await apiClient.put(API_ENDPOINTS.updateUser, payload);
	return response.data;
};
