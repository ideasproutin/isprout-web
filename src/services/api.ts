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
apiClient.interceptors.request.use((config) => {
	const token =
		typeof window !== "undefined"
			? localStorage.getItem("authToken")
			: null;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

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

	const response = await axios.put(
		API_BASE_URL + "/api/v2/core/site/forms/upload-documents",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	);

	return response.data;
};

export default apiClient;
