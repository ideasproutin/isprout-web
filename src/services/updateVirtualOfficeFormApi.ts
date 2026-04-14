import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

export interface UpdateVirtualOfficeFormPayload {
	formId: string;
	userFiles?: unknown[];
	status?: string;
	comments?: string;
	preferredCity?: string;
}

export interface UpdateVirtualOfficeFormResponse<T = unknown> {
	status: {
		type: string;
		message: string;
		description?: string;
	};
	data?: T;
}

/**
 * PUT /core/site/forms/update-virtual-office-form
 */
export const updateVirtualOfficeForm = async (
	payload: UpdateVirtualOfficeFormPayload,
): Promise<UpdateVirtualOfficeFormResponse> => {
	const accessToken = localStorage.getItem("accessToken");

	const response = await apiClient.put<UpdateVirtualOfficeFormResponse>(
		dashboardendpoints.updateVirtualOfficeForm,
		payload,
		{
			headers: {
				"X-Auth-Token": accessToken || "",
			},
		},
	);

	return response.data;
};
