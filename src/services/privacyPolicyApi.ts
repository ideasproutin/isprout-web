import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export interface PrivacyPolicyData {
	title: string;
	lastUpdated: string;
	sections: {
		heading: string;
		content: string;
	}[];
}

export const fetchPrivacyPolicy = async (): Promise<PrivacyPolicyData> => {
	const response = await apiClient.get<PrivacyPolicyData>(
		API_ENDPOINTS.privacyPolicy,
	);
	return response.data;
};
