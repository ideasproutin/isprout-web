import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthenticateUserRequest {
	email: string;
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
	name: string;
	email: string;
	phone: string;
	memberSince?: string;
	createdAt?: string;
}

export interface UpdateProfileRequest {
	name?: string;
	phone?: string;
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
	return response.data;
};

/** Step 2 – Verify OTP and receive auth token */
export const verifyUser = async (
	payload: VerifyUserRequest,
): Promise<VerifyUserResponse> => {
	const response = await apiClient.post(API_ENDPOINTS.verifyUser, payload);
	return response.data;
};
