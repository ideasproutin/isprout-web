import axios from "axios";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://cloud.isprout.in";

const apiClient = axios.create({
	baseURL: API_BASE_URL + "/api/v2",
	headers: {
		"Content-Type": "application/json",
	},
});

// ── Request interceptor: attach Bearer token only for protected /core/ routes ─
apiClient.interceptors.request.use(
	(config) => {
		const url = config.url ?? "";
		// Only attach token for dashboard/protected routes, not for /auth/ routes
		if (url.startsWith("/core/")) {
			const raw =
				typeof window !== "undefined"
					? localStorage.getItem("accessToken")
					: null;
			const token = raw && raw !== "undefined" ? raw : null;
			if (token) {
				config.headers.set("Authorization", `Bearer ${token}`);
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

/** Call this immediately after login. The interceptor reads from localStorage for /core/ routes. */
export const setAuthToken = (token: string | null) => {
	if (token && token !== "undefined") {
		localStorage.setItem("accessToken", token);
	} else {
		localStorage.removeItem("accessToken");
	}
};
