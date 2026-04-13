import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export interface CancellationPolicySection {
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

export interface CancellationPolicyIntroduction {
	heading: string;
	paragraphs: string[];
	policyScope?: string[];
	applicability?: string;
	consent?: string;
}

export interface CancellationPolicyData {
	title: string;
	introduction: CancellationPolicyIntroduction;
	sections: CancellationPolicySection[];
}

interface CancellationPolicyResponse {
	cancellationPolicy: CancellationPolicyData;
}

export const fetchCancellationPolicy = async (): Promise<CancellationPolicyData> => {
	const response = await apiClient.get<CancellationPolicyResponse>(
		public_endpoints.cancellationPolicy,
	);
	return response.data.cancellationPolicy;
};
