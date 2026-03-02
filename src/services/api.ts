import axios from "axios";
import {
	clearAuthSession,
	emitUnauthorized,
	getAccessToken,
	getAuthHeaders,
	hasValidSession,
} from "../utils/authSession";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://cloud.isprout.in";

export { API_BASE_URL };

const apiClient = axios.create({
	baseURL: API_BASE_URL + "/api/v2",
	headers: {
		"Content-Type": "application/json",
	},
});

const isProtectedUserEndpoint = (url: string) =>
	url.startsWith("/core/site/users/") ||
	url.startsWith("/core/site/forms/upload-documents");

const isFormSubmitEndpoint = (url: string) =>
	url.startsWith("/core/site/forms/submit-form");

// ── Request interceptor: attach token only for protected /core/ routes ────────
// Token expiry is NOT checked here — the server will return 401 if the token
// is invalid or expired, and the response interceptor below handles that.
apiClient.interceptors.request.use(
	(config) => {
		const url = config.url ?? "";

		if (isFormSubmitEndpoint(url)) {
			if (hasValidSession()) {
				const token = getAccessToken();
				const authHeaders = getAuthHeaders(token);
				Object.entries(authHeaders).forEach(([key, value]) => {
					config.headers.set(key, value);
				});
			}
			return config;
		}

		if (isProtectedUserEndpoint(url)) {
			if (!hasValidSession()) {
				clearAuthSession();
				emitUnauthorized("Session expired. Please login again.");
				return Promise.reject(new Error("Session expired. Please login again."));
			}

			const token = getAccessToken();
			const authHeaders = getAuthHeaders(token);
			Object.entries(authHeaders).forEach(([key, value]) => {
				config.headers.set(key, value);
			});
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// ── Response interceptor: surface the real server error message ──────────────
// NOTE: We do NOT auto-logout on 401 — only an explicit logout action should
// clear the session. Auto-redirecting on 401 causes users to be unexpectedly
// logged out on transient server errors, especially on mobile.
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const requestUrl = error?.config?.url ?? "";
		const statusCode = error?.response?.status;
		const serverMessage =
			error?.response?.data?.status?.message ||
			error?.response?.data?.message ||
			error?.response?.data?.error ||
			null;

		const unauthorizedMessage =
			typeof serverMessage === "string" &&
			(serverMessage.toLowerCase().includes("unauthorized") ||
				serverMessage.toLowerCase().includes("unauthorised"));

		if (
			isProtectedUserEndpoint(requestUrl) &&
			(statusCode === 401 || unauthorizedMessage)
		) {
			clearAuthSession();
			emitUnauthorized(serverMessage || "Unauthorized");
		}

		if (serverMessage) {
			error.message = serverMessage;
		}
		return Promise.reject(error);
	},
);

// Upload document API
export const uploadDocument = async (file: File, code: string) => {
	const formData = new FormData();
	formData.append("attachments", file);
	formData.append("code", code);

	if (!hasValidSession()) {
		clearAuthSession();
		emitUnauthorized("Session expired. Please login again.");
		throw new Error("Session expired. Please login again.");
	}

	const token = getAccessToken();
	const headers: Record<string, string> = {
		"Content-Type": "multipart/form-data",
		...getAuthHeaders(token),
	};

	const response = await axios.put(
		API_BASE_URL + "/api/v2/core/site/forms/upload-documents",
		formData,
		{ headers },
	);

	return response.data;
};

export default apiClient;