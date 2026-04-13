import apiClient from "./api";
import { public_endpoints } from "../utils/config";

export interface CareerJobItem {
	id?: string;
	title: string;
	gender?: string;
	location: string;
	experience: string;
	type: string;
	postedDate: string;
	industry: string;
	qualification: string;
	description: string;
	keyResponsibilities: string[];
	jobImageUrl?: string;
}

export interface CareersFormField {
	name: string;
	label: string;
	type: string;
	required: boolean;
	placeholder?: string;
	helperText?: string;
}

export interface CareersFormConfig {
	formTitle?: string;
	fields?: CareersFormField[];
	submitButtonText?: string;
	successMessage?: string;
}

export interface CareersPageData {
	applicationFormData?: CareersFormConfig;
	noOpenRolesFormData?: CareersFormConfig;
	careersIntroData?: {
		heroVideo?: string;
		bottomLeftTitle?: string;
		mainHeading?: {
			line1?: string;
			line2?: string;
			line3?: string;
		};
		description?: string;
		stats?: Array<{
			number: string;
			label: string;
		}>;
	};
	careersData?: {
		filterOptions?: {
			departments?: string[];
			locations?: string[];
			jobTypes?: string[];
		};
		jobListingsByStep?: Array<{
			step?: number;
			category: string;
			jobs: CareerJobItem[];
		}>;
	};
	lifeAtISproutData?: {
		title?: string;
		accentColor?: string;
		imageSets?: string[][];
		autoRotateInterval?: number;
	};
}

interface CareersApiResponse {
	data?: {
		item?: CareersPageData;
	};
	status?: {
		type?: string;
		message?: string;
	};
}

export const fetchCareers = async () => {
	try {
		const response = await apiClient.post<CareersApiResponse>(
			public_endpoints.careers,
			{
				sortColumn: "createdAt",
				sortDirection: "asc",
				filters: {},
			},
		);

		if (
			response.data?.status?.type === "error" ||
			!response.data?.data?.item
		) {
			return undefined;
		}

		return response.data?.data?.item;
	} catch {
		return undefined;
	}
};

export const submitCareerApplication = async (
	data: Record<string, unknown>,
) => {
	const response = await apiClient.post(public_endpoints.formSubmit, data);
	return response.data;
};
