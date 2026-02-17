import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export interface TermsAndConditionsSection {
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

export interface TermsAndConditionsIntroduction {
	heading: string;
	paragraphs: string[];
	policyScope: string[];
	applicability: string;
	consent: string;
}

export interface TermsAndConditionsData {
	title: string;
	introduction: TermsAndConditionsIntroduction;
	sections: TermsAndConditionsSection[];
}

interface TermsAndConditionsResponse {
	termsAndConditions: TermsAndConditionsData;
}

export const fetchTermsAndConditions =
	async (): Promise<TermsAndConditionsData> => {
		const response = await apiClient.get<TermsAndConditionsResponse>(
			API_ENDPOINTS.termsAndConditions,
		);

		return response.data.termsAndConditions;
	};
