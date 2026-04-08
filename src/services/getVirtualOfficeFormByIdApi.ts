import apiClient from "./api";
import { dashboardendpoints } from "../utils/config";

export interface GetVirtualOfficeFormByIdResponse<T = unknown> {
	status: {
		type: string;
		message: string;
		description?: string;
	};
	data?: T;
}

/**
 * GET /core/site/forms/get-virtual-office-form/{id}
 */
export const getVirtualOfficeFormById = async (
	id: string,
): Promise<GetVirtualOfficeFormByIdResponse> => {
	const accessToken = localStorage.getItem("accessToken");
	const endpoint = dashboardendpoints.getVirtualOfficeFormById.replace(
		"{id}",
		encodeURIComponent(id),
	);

	const response = await apiClient.get<GetVirtualOfficeFormByIdResponse>(
		endpoint,
		{
			headers: {
				"X-Auth-Token": accessToken || "",
			},
		},
	);

	return response.data;
};
