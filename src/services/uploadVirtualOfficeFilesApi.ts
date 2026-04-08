import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

export interface UploadVirtualOfficeFilesRequest {
	formData: FormData;
}

export interface UploadVirtualOfficeFilesResponse<T = unknown> {
	status: {
		type: string;
		message: string;
		description?: string;
	};
	data?: T;
}

/**
 * POST /core/site/forms/upload-virtual-office-files
 */
export const uploadVirtualOfficeFiles = async (
	payload: UploadVirtualOfficeFilesRequest,
): Promise<UploadVirtualOfficeFilesResponse> => {
	const accessToken = localStorage.getItem("accessToken");

	const response = await apiClient.post<UploadVirtualOfficeFilesResponse>(
		dashboardendpoints.uploadVirtualOfficeFiles,
		payload.formData,
		{
			headers: {
				"X-Auth-Token": accessToken || "",
				"Content-Type": "multipart/form-data",
			},
		},
	);

	return response.data;
};
