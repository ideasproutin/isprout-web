import apiClient from "./api";
import { public_endpoints } from "../utils/config";

interface SitePopupApiStatus {
	type?: string;
	message?: string;
}

interface SitePopupApiPayload {
	popup?: boolean;
	data?: unknown;
}

interface SitePopupApiResponse {
	data?: SitePopupApiPayload;
	status?: SitePopupApiStatus;
}

export interface SitePopupData {
	imageUrl: string;
	heading: string;
	subheading: string;
	content: string;
	ctaButtonText: string;
	ctaLink: string;
	popupTime: number;
}

export interface SitePopupResult {
	popup: boolean;
	data: SitePopupData | null;
}

const asObject = (value: unknown): Record<string, unknown> | null => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}
	return null;
};

const readString = (obj: Record<string, unknown>, keys: string[]) => {
	for (const key of keys) {
		const value = obj[key];
		if (typeof value === "string") {
			return value.trim();
		}
	}
	return "";
};

const readNumber = (
	obj: Record<string, unknown>,
	keys: string[],
	fallback = 0,
) => {
	for (const key of keys) {
		const value = obj[key];
		if (typeof value === "number" && Number.isFinite(value)) {
			return value;
		}
		if (typeof value === "string") {
			const parsed = Number(value);
			if (Number.isFinite(parsed)) {
				return parsed;
			}
		}
	}
	return fallback;
};

const normalizePopupData = (value: unknown): SitePopupData | null => {
	const popupObj = asObject(value);
	if (!popupObj) return null;

	return {
		imageUrl: readString(popupObj, ["imageUrl", "image_url", "image"]),
		heading: readString(popupObj, ["heading", "title"]),
		subheading: readString(popupObj, ["subheading", "label"]),
		content: readString(popupObj, ["content", "description"]),
		ctaButtonText: readString(popupObj, ["ctaButtonText", "buttonText"]),
		ctaLink: readString(popupObj, ["ctaLink", "buttonLink", "link"]),
		popupTime: Math.max(
			0,
			readNumber(popupObj, ["popupTime", "popup_time"], 0),
		),
	};
};

export const createSitePopupQueryKey = () => ["sitePopup"] as const;

export const fetchSitePopup = async (): Promise<SitePopupResult> => {
	try {
		const response = await apiClient.get<SitePopupApiResponse>(
			public_endpoints.sitePopup,
		);

		const payload = response.data?.data;
		const popupEnabled = payload?.popup === true;
		const normalizedData = normalizePopupData(payload?.data);

		return {
			popup: popupEnabled,
			data: popupEnabled ? normalizedData : null,
		};
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Unknown error while fetching popup data";
		throw new Error(`Failed to fetch site popup: ${message}`);
	}
};
