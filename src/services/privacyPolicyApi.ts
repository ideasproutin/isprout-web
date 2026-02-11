import privacyPolicyData from "../content/privacyPolicy.json";

export interface PrivacyPolicyData {
	title: string;
	lastUpdated: string;
	sections: {
		heading: string;
		content: string;
	}[];
}

export const fetchPrivacyPolicy = async (): Promise<PrivacyPolicyData> => {
	// Return local JSON data
	return Promise.resolve(privacyPolicyData as PrivacyPolicyData);
};
