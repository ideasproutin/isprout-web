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
	email: string;
	otp: string;
}

export interface VerifyUserResponse {
	status: { type: string; message: string };
	data: {
		item: {
			userId: string;
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

/** Step 2 – Verify OTP and receive auth token */
export const verifyUser = async (
	payload: VerifyUserRequest,
): Promise<VerifyUserResponse> => {
	const response = await apiClient.post(dashboardendpoints.verifyUser, payload);
	const data: VerifyUserResponse = response.data;
	if (data?.status?.type === "error") {
		throw new Error(data.status.message || "OTP verification failed.");
	}
	return data;
};

// ─── Auth header helper ───────────────────────────────────────────────────────
const getAuthHeader = () => {
	const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
	return token && token !== "undefined" ? { Authorization: `Bearer ${token}` } : {};
};

/** Fetch the current user's profile */
export const getUser = async (): Promise<{
	status: { type: string; message: string };
	data: { item: UserProfile };
}> => {
	const response = await apiClient.get(dashboardendpoints.getUser, { headers: getAuthHeader() });
	return response.data;
};

/** Update the current user's profile */
export const updateUser = async (
	payload: UpdateProfileRequest,
	explicitToken?: string,
): Promise<UpdateProfileResponse> => {
	// Priority: explicit token passed in → localStorage → nothing
	const raw = explicitToken || localStorage.getItem("accessToken") || "";
	const token = raw && raw !== "undefined" ? raw : "";
	const headers = token ? { Authorization: `Bearer ${token}` } : {};
	const response = await apiClient.put(dashboardendpoints.updateUser, payload, { headers });
	return response.data;
};
