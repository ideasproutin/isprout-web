import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export interface RefundPolicySection {
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

export interface RefundPolicyIntroduction {
	heading: string;
	paragraphs: string[];
	policyScope: string[];
	applicability: string;
	consent: string;
}

export interface RefundPolicyData {
	title: string;
	introduction: RefundPolicyIntroduction;
	sections: RefundPolicySection[];
}

interface RefundPolicyResponse {
	refundPolicy: RefundPolicyData;
}

export const fetchRefundPolicy = async (): Promise<RefundPolicyData> => {
	const response = await apiClient.get<RefundPolicyResponse>(
		public_endpoints.refundPolicy,
	);

	return response.data.refundPolicy;
};
