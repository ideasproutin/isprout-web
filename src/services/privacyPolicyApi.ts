import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export interface PrivacyPolicySection {
	sectionNumber: string;
	title: string;
	content?: string | string[];
	definitions?: { term: string; definition: string }[];
	introduction?: string;
	informationTypes?: string[];
	collectionMethods?: string[];
	categories?: {
		categoryLabel: string;
		categoryTitle: string;
		description: string;
		dataPoints?: { type: string; details: string }[];
		usage?: string;
		cookieControl?: string[];
	}[];
	commitment?: string;
	purposes?: string[];
	additionalUse?: string;
	retentionPolicy?: string;
	disclosureTypes?: {
		category: string;
		description?: string;
		recipients?: string[];
	}[];
}

export interface PrivacyPolicyIntroduction {
	heading: string;
	paragraphs: string[];
	policyScope: string[];
	applicability: string;
	consent: string;
}

export interface PrivacyPolicyData {
	title: string;
	introduction: PrivacyPolicyIntroduction;
	sections: PrivacyPolicySection[];
}

interface PrivacyPolicyResponse {
	privacyPolicy: PrivacyPolicyData;
}

export const fetchPrivacyPolicy = async (): Promise<PrivacyPolicyData> => {
	const response = await apiClient.get<PrivacyPolicyResponse>(
		API_ENDPOINTS.privacyPolicy,
	);
	return response.data.privacyPolicy;
};
