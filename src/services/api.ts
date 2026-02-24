import axios from "axios";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://cloud.isprout.in";

const apiClient = axios.create({
	baseURL: API_BASE_URL + "/api/v2",
	headers: {
		"Content-Type": "application/json",
	},
});

// ── Request interceptor: attach Bearer token from localStorage ─────────────
apiClient.interceptors.request.use(
	(config) => {
		const token =
			typeof window !== "undefined"
				? localStorage.getItem("authToken")
				: null;
		
		console.log("[API Request Interceptor]", {
			url: config.url,
			method: config.method,
			hasToken: !!token,
			tokenPreview: token ? `${token.substring(0, 20)}...` : null,
		});
		
		if (token) {
			// Ensure headers object exists
			if (!config.headers) {
				config.headers = {} as any;
			}
			config.headers["Authorization"] = `Bearer ${token}`;
			console.log("[API] Authorization header set:", config.headers["Authorization"].substring(0, 30) + "...");
			console.log("[API] All headers:", Object.keys(config.headers));
		} else {
			console.warn("[API] No token found in localStorage");
		}
		return config;
	},
	(error) => {
		console.error("[API Request Interceptor Error]", error);
		return Promise.reject(error);
	}
);

// ── Response interceptor: surface the real server error message ──────────────
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Try to extract the server's own message from the response body
		const serverMessage =
			error?.response?.data?.status?.message ||
			error?.response?.data?.message ||
			error?.response?.data?.error ||
			null;

		if (serverMessage) {
			// Replace the generic axios message with the one from the API
			error.message = serverMessage;
		}

		// Log for debugging
		console.error(
			"[API Error]",
			error?.config?.url,
			error?.response?.status,
			serverMessage ?? error.message,
		);

		return Promise.reject(error);
	},
);

// Upload document API
export const uploadDocument = async (file: File, code: string) => {
	const formData = new FormData();
	formData.append("attachments", file);
	formData.append("code", code);

	const token = localStorage.getItem("authToken");
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
