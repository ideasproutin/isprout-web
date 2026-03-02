import axios from "axios";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://cloud.isprout.in";

export { API_BASE_URL };

const apiClient = axios.create({
	baseURL: API_BASE_URL + "/api/v2",
	headers: {
		"Content-Type": "application/json",
	},
});

// ── Helper: clear all auth keys from localStorage ────────────────────────────
const clearAuthSession = () => {
	if (typeof window === "undefined") return;
	localStorage.removeItem("accessToken");
	localStorage.removeItem("accessTokenExpiryTime");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("refreshTokenExpiryTime");
	localStorage.removeItem("isLoggedIn");
	localStorage.removeItem("userData");
};

// ── Request interceptor: attach token only for protected /core/ routes ────────
// Token expiry is NOT checked here — the server will return 401 if the token
// is invalid or expired, and the response interceptor below handles that.
apiClient.interceptors.request.use(
	(config) => {
		const url = config.url ?? "";
		if (url.startsWith("/core/")) {
			const token =
				typeof window !== "undefined"
					? localStorage.getItem("accessToken")
					: null;
			if (token) {
				config.headers.set("X-Auth-Token", `${token}`);
			} else {
				console.warn("⚠️ No token available for protected route!");
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// ── Response interceptor: surface the real server error message ──────────────
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// 401 Unauthorised – token rejected by server → clear stale session
		if (error?.response?.status === 401) {
			console.warn("⚠️ 401 Unauthorised — clearing session and redirecting.");
			clearAuthSession();
			if (typeof window !== "undefined") {
				window.location.href = "/";
			}
		}

		const serverMessage =
			error?.response?.data?.status?.message ||
			error?.response?.data?.message ||
			error?.response?.data?.error ||
			null;
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

	const token = localStorage.getItem("accessToken");
	const headers: Record<string, string> = {
		"Content-Type": "multipart/form-data",
	};
	
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	const response = await axios.put(
		API_BASE_URL + "/api/v2/core/site/forms/upload-documents",
		formData,
		{ headers },
	);

	return response.data;
};

export default apiClient;