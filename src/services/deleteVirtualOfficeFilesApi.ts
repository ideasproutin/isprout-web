import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

export interface DeleteVirtualOfficeFilesRequest {
	[key: string]: unknown;
}

export interface DeleteVirtualOfficeFilesResponse<T = unknown> {
	status: {
		type: string;
		message: string;
		description?: string;
	};
	data?: T;
}

/**
 * DELETE /core/site/forms/delete-virtual-office-files
 */
export const deleteVirtualOfficeFiles = async (
	payload: DeleteVirtualOfficeFilesRequest,
): Promise<DeleteVirtualOfficeFilesResponse> => {
	const accessToken = localStorage.getItem("accessToken");

	const response = await apiClient.delete<DeleteVirtualOfficeFilesResponse>(
		dashboardendpoints.deleteVirtualOfficeFiles,
		{
			data: payload,
			headers: {
				"X-Auth-Token": accessToken || "",
			},
		},
	);

	return response.data;
};
