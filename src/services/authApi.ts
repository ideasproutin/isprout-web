import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

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
	mode: string;
	email?: string;
	otp?: string;
	googleToken?: string;
}

export interface VerifyUserResponse {
	status: { type: string; message: string };
	data: {
		item: {
			userId: string;
			email?: string;
			auth: {
				accessToken: string;
				accessTokenExpiryTime: number;
				refreshToken: string;
				refreshTokenExpiryTime: number;
			};
			role: string;
			isProfileCreated: boolean;
		};
	};
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/** Step 1 – Send OTP to the provided email */
export const authenticateUser = async (
	payload: AuthenticateUserRequest,
): Promise<AuthenticateUserResponse> => {
	const response = await apiClient.post(
		dashboardendpoints.authenticateUser,
		payload,
	);
	const data: AuthenticateUserResponse = response.data;
	// Some backends return HTTP 200 with status.type = "error" in the body
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Failed to send OTP.");
	}
	return data;
};

/** Step 2 – Verify OTP and receive auth token (also handles Google login) */
export const verifyUser = async (
	payload: VerifyUserRequest,
): Promise<VerifyUserResponse> => {
	const response = await apiClient.post(dashboardendpoints.verifyUser, payload);
	const data: VerifyUserResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "Verification failed.");
	}
	return data;
};
